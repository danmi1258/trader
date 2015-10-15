__author__ = 'chenlei'
import websocket
import json
import redis
import urllib2
import logging
import requests
import pkg_resources
import urllib



urllib2.socket.setdefaulttimeout(10)
#r = redis.Redis(host='182.92.223.200')
r = redis.Redis(host='127.0.0.1')

logging.basicConfig(level=logging.DEBUG,
                format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                datefmt='%a, %d %b %Y %H:%M:%S',
                filename='./autoTrader.log',
                filemode='w')





def close(orderid,currentPrice):
    print r.hget("OrdersHset", orderid)
    payload=json.loads(r.hget("OrdersHset", orderid))
    #print "close " + str(len(r.get(orderid)))
    try:
        baseUrl="http://localhost:8087/trader/index.php/Home/order/close"
        headers = {"Accept":"application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding":"gzip, deflate",
        "Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6",
        "Connection":"keep-alive",
        "Content-Length":"55",
        "Content-Type":"application/json",
        "X-Requested-With":"XMLHttpRequest"}


        payload['price']=currentPrice
        ret=requests.post(baseUrl,data=json.dumps(payload),headers=headers)
        result=json.loads(ret.txt)
        if result['result'] == "1":
            print str(orderid)+": close operation success "
            logging.info(str(orderid)+": close operation success")
        else:
            print str(orderid)+": close operation failed "
            logging.error(str(orderid)+": close operation failed due to API")
    except:
        print str(orderid)+": close operation failed due to NetWork"
        logging.error(str(orderid)+": close operation failed due to Network")






def restingToOrdinary(orderid,currentPrice):
    baseUrl="http://localhost:8087/trader/index.php/Home/order/restingToOrdinary"
    #baseUrl="http://www.voidspace.org.uk"
    print str(orderid)+": restingToOrdinary operation start"

    value = {'orderId':orderid ,'currentPrice': currentPrice };
    data = urllib.urlencode(value)

    try:

        req=urllib2.Request(baseUrl,data)
        ret=urllib2.urlopen(req).read()
        if ret == "1":
            print str(orderid)+": restingToOrdinary operation success "
            logging.info(str(orderid)+": restingToOrdinary operation success")
        else:
            print str(orderid)+": restingToOrdinary operation failed due to API"
            logging.error(str(orderid)+": restingToOrdinary operation failed due to API")
    except:
        print str(orderid)+": restingToOrdinary operation failed due to Network"
        logging.error(str(orderid)+": restingToOrdinary operation failed due to Network")









def on_message(ws, message):
    jdata=json.loads(message)

    for oneSym in jdata['data']:
        oneJ=jdata['data'][oneSym]
        ask=oneJ['ask']
        bid=oneJ['bid']
        t=oneJ['quote_datetime']
        value="{'ask':"+ask+", 'bid':"+bid+", 'timestamp':"+t+"}"
        r.hset('SymbolHSet', oneSym, value)

    for oneSym in jdata['data']:
        oneJ=jdata['data'][oneSym]
        ask=oneJ['ask']
        bid=oneJ['bid']
        t=oneJ['quote_datetime']
        #resting orders
        bl_str=oneSym+'RestingBuyLimitZset'



        bl_ids=r.zrangebyscore(bl_str,ask,'+inf')

        print bl_str+" "+str(ask)+" +inf " + str(len(bl_ids))

        bs_str=oneSym+'RestingBuyStopZset'
        bs_ids=r.zrangebyscore(bs_str,'-inf',ask)

        print bs_str + " -inf " + str(ask) + " " + str(len(bs_ids))

        for oid in bl_ids+bs_ids:
            restingToOrdinary(oid,ask)



        sl_str=oneSym+'RestingSellLimitZset'
        sl_ids=r.zrangebyscore(sl_str,'-inf',bid)
        print sl_str + " -inf " + str(bid) + " " + str(len(sl_ids))

        ss_str=oneSym+'RestingSellStopZset'
        ss_ids=r.zrangebyscore(ss_str,bid,'+inf')
        print ss_str+" "+str(bid)+" +inf " + str(len(ss_ids))

        for oid in sl_ids + ss_ids:
            restingToOrdinary(oid,bid)


        #sl tp only for ordinaryOrder
        bsl_str=oneSym+"BuySLZset"
        bsl_ids=r.zrangebyscore(bsl_str,ask,'+inf')
        btp_str=oneSym+'BuyTPZset'
        btp_ids=r.zrangebyscore(btp_str,'-inf',ask)

        print bsl_str+" "+str(ask)+" +inf " + str(len(bsl_ids))
        print btp_str+" -inf " + str(ask) + " " + str(len(btp_ids))

        for oid in bsl_ids+btp_ids:
            close(oid,ask)
        ssl_str=oneSym+'SellSLZset'
        ssl_ids=r.zrangebyscore(ssl_str,'-inf',bid)
        stp_str=oneSym+'SellTPZset'
        stp_ids=r.zrangebyscore(stp_str,bid,'+inf')

        print ssl_str+" -inf " + str(bid) + " " + str(len(ssl_ids))
        print stp_str+" "+str(bid)+" +inf " + str(len(stp_ids))

        #satisfy stoploss takeprofit condition,evening up orders in hand
        for oid in ssl_ids+stp_ids:
            close(oid,bid)
        print oneSym+"\tbid:"+str(bid)+"\task:"+str(ask)+"\ttimestamp:"+str(t)


def on_error(ws, error):
    print error


def on_close(ws):
    print "### closed ###"
    logging.info("auto trader  close")

def on_open(ws):
    print "### open  ###"
    logging.info("auto trader   start")


if __name__ == "__main__":
    message='{"data": {"USDJPY":{"ask":120,"bid":0.741010,"high":0.742960,"low":0.733610,"quote_datetime":1444416863,"replay":false,"scale":5,"symbol":"USDJPY"},"USDCAD":{"ask":1.294870,"bid":1.294730,"high":1.300010,"low":1.290070,"quote_datetime":1444416863,"replay":false,"scale":5,"symbol":"USDCAD"}}}';
    on_message(None, message);
