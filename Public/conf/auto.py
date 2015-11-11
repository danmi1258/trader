__author__ = 'chenlei'
import websocket
import json
import redis
import urllib2
import logging
import requests
import pkg_resources
import urllib

pkg_resources.require("websocket==0.2.1")

urllib2.socket.setdefaulttimeout(6)
r = redis.Redis(host='182.92.223.200')
#r = redis.Redis(host='127.0.0.1')

logging.basicConfig(level=logging.DEBUG,
                format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                datefmt='%a, %d %b %Y %H:%M:%S',
                filename='./autoTrader.log',
                filemode='w')





def close(orderid,currentPrice):
    try:
        baseUrl="http://localhost/trader/index.php/Home/order/close"
        headers = {"Accept":"application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding":"gzip, deflate",
        "Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6",
        "Connection":"keep-alive",
        "Content-Length":"55",
        "Content-Type":"application/json",
        "X-Requested-With":"XMLHttpRequest"}

        payload=json.loads(r.hget("OrdersHset", orderid))
        payload['price']=currentPrice
        ret=requests.post(baseUrl,data=json.dumps(payload),headers=headers)
        result=json.loads(ret.txt)
        if result['result'] == "1":
            print str(orderid)+": close operation success "
            logging.info(str(orderid)+": close operation success")
        else:
            logging.error(str(orderid)+": close operation failed due to API")
    except:
        logging.error(str(orderid)+": close operation failed due to Network")






def restingToOrdinary(orderid,currentPrice):
    baseUrl="http://localhost/trader/index.php/Home/order/restingToOrdinary"

    try:
        value = {'orderId':orderid ,'currentPrice': currentPrice };
        data = urllib.urlencode(value)
        req=urllib2.Request(baseUrl,data)
        ret=urllib2.urlopen(req).read()
        if ret == "1":
            print str(orderid)+": restingToOrdinary operation success "
            logging.info(str(orderid)+": restingToOrdinary operation success")
        else:
            logging.error(str(orderid)+": restingToOrdinary operation failed due to API")
    except:
        logging.error(str(orderid)+": restingToOrdinary operation failed due to Network")









def on_message(ws, message):
    jdata=json.loads(message)
    for oneSym in jdata['data']:
        oneJ=jdata['data'][oneSym]
        ask=oneJ['ask']
        bid=oneJ['bid']
        t=oneJ['quote_datetime']
        value="{\"ask\":"+str(ask)+",\"bid\":"+str(bid)+", \"timestamp\":"+str(t)+"}"
        r.hset('SymbolHSet', oneSym, value)

    jdata=json.loads(message)
    for oneSym in jdata['data']:
        oneJ=jdata['data'][oneSym]
        ask=oneJ['ask']
        bid=oneJ['bid']
        t=oneJ['quote_datetime']
        #resting orders
        bl_str=oneSym+'RestingBuyLimitZset'
        bl_ids=r.zrangebyscore(bl_str,ask,'+inf')
        bs_str=oneSym+'RestingBuyStopZset'
        bs_ids=r.zrangebyscore(bs_str,'-inf',ask)
        for oid in bl_ids+bs_ids:
            restingToOrdinary(oid,ask)



        sl_str=oneSym+'RestingSellLimitZset'
        sl_ids=r.zrangebyscore(sl_str,'-inf',bid)
        ss_str=oneSym+'RestingSellStopZset'
        ss_ids=r.zrangebyscore(ss_str,bid,'+inf')

        for oid in sl_ids + ss_ids:
            restingToOrdinary(oid,bid)


        #sl tp only for ordinaryOrder
        bsl_str=oneSym+"BuySLZset"
        bsl_ids=r.zrangebyscore(bsl_str,ask,'+inf')
        btp_str=oneSym+'BuyTPZset'
        btp_ids=r.zrangebyscore(btp_str,'-inf',ask)
        for oid in bsl_ids+btp_ids:
            close(oid,ask)
        ssl_str=oneSym+'SellSLZset'
        ssl_ids=r.zrangebyscore(ssl_str,'-inf',bid)
        stp_str=oneSym+'SellTPZset'
        stp_ids=r.zrangebyscore(stp_str,bid,'+inf')
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
    #websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://182.92.223.200:443/",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()
