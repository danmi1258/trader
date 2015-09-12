<?php

namespace Home\Service;
use Think\Model;
use Think\Log;

/****************************************************************
类名：OrderService
类描述：订单相关操作服务接口
备注:
*****************************************************************/
class OrderService extends Model {

    Protected $autoCheckFields = false;

    private $toolkitSer;

    public function __construct()
    {
        parent::__construct();
        $this->logerSer = D('Log', 'Service');
        $this->toolkitSer = D('ToolKit', 'Service');

    }

    public function getNextOrderId()
    {
        $Model = D('HistoryOrder');
        if(NULL == $Model){
            return NULL;
        }
        $max_tradeId = $Model->fetchSql(false)->max('tradeid');
        return ($max_tradeId + 1);
    }

    public function addOrder($order)
    {
        $Model = D('Order');

        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }


        $iret =$Model->add($order);
        if(false == $iret)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        return true;
    }

    public function getOrdersDiffTime($userid, $timestart, $timeend)
    {
        $Model = D("Order");
        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        //$this->LoggerPrint("userid:". $userid. "timestart:". $timestart. "timeend". $timeend);
        $result =$Model->fetchSql(false)->where("operstarttime >= '%s' and operstarttime <= '%s' and userid=%s", $timestart, $timeend, $userid)->select();
        return $result;
    }

    public function getHistOrderCountByUser($userid, $fromTime, $toTime)
    {
        $Model = D('HistoryOrder');

        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $result = $Model->where("userid=%s and operstarttime > '%s' and operstarttime < '%s' and istrade='%s'", $userid, $fromTime, $toTime, "1")->count();
        return $result;
    }

    public function getHistOrders($userid, $fromTime, $toTime, $rangStart, $rangEnd)
    {
        $Model = D('HistoryOrder');

        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $result = $Model->where("userid=%s and operstarttime > '%s' and operstarttime < '%s' and istrade='%s'", $userid, $fromTime, $toTime, "1")->limit($rangStart,$rangEnd)->select();
        return $result;
    }

    public function getTradeOrderByOrderId($orderId)
    {
        $Model = D("Order");
        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }

        $result =$Model->fetchSql(false)->where("tradeid=%s", $orderId)->select();
        return $result;
    }

    public function addOrderToTrade($userId, $order_para)
    {
        //内部需考虑单个步骤失败进行回退
        $order['tradeid'] = $this->getNextOrderId();
        $order['userid'] = $userId;
        $order['goodname'] = $order_para->symbol;
        $order['tradetype'] = $order_para->cmd;  //0 买入 1 卖出 这个地方确定买卖的类型是不是这个字段
        $order['tradenum'] = $order_para->volume;
        $order['operstarttime'] = $this->toolkitSer->getSysTime();
        $order['operstartprice'] = $order_para->price;
        $order['buyprice'] = $order_para->ask;
        $order['sellprice'] = $order_para->bid;
        $order['stoplossprice'] = $order_para->sl;
        $order['stopgainprice'] = $order_para->tp;
        $order['comment'] = $order_para->comment;
        $this->addOrder($order);

        $histOrder['tradeid'] = $order['tradeid'] ;
        $histOrders['userid'] = $userId;
        $histOrder['goodname'] = $order_para->symbol;
        $histOrder['tradetype'] = $order_para->cmd;  //0 买入 1 卖出
        $histOrder['tradenum'] = $order_para->volume;
        $histOrder['operstarttime'] = $order['operstarttime'];
        $histOrder['operstartprice'] = $order_para->price;
        $histOrder['stoplossprice'] = $order_para->sl;
        $histOrder['stopgainprice'] = $order_para->tp;
        $histOrder['comment'] = $order_para->comment;
        $histOrder['istrade'] = "0";
        $this->addHistOrder($histOrder);

        return true;
    }


    public function addHistOrder($order)
    {
        $Model = D('HistoryOrder');

        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }

        $iret =$Model->add($order);
        if(false == $iret)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        return true;
    }

    public function getHistOrderByOrderId($orderId)
    {
        $Model = D("HistoryOrder");
        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }

        $result =$Model->fetchSql(false)->where("tradeid=%s", $orderId)->select();
        return $result;
    }

    public function delOrderByOrderId($orderId)
    {
        $Model = D("Order");
        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }

        $result =$Model->fetchSql(false)->where("tradeid=%s", $orderId)->delete();
        return $result;
    }

    public function updateHistOrderByOrderId($orderId, $order)
    {
        $Model = D('HistoryOrder');

        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $Model->create($order);

        $iret =$Model->where('orderid='.$orderId)->save();
        if(false == $iret)
        {
            return false;
        }
        return true;
    }

    public function computeGain($order)
    {
        //TODO 是否从mtd4服务器进行计算
        $order['price']; //当前价格
        $order['volume'];  //容量
        $order['symbol']; //货比类型
        $order['ask']; // 止盈
        $order['bid'];  //止损
        $order['openPrice']; //开始的价钱
        $order['cmd']; //买卖模式
        return ($order['price'] - $order['openPrice']) * $order['volume'];
    }

    public function closeOrderToOrder($userid, $order)
    {
        $order['order']; //订单号
        $gainMoney = $this->computeGain($order);

        $histOrder  = $this->getHistOrderByOrderId($order['order']);
        $histOrder['operendtime'] = $this->toolkitSer->getSysTime();
        $histOrder['operendprice'] = $order['price'];
        $histOrder['gainedmoney'] = $gainMoney;
        $histOrder['istrade'] = "0";
        $iret = $this->updateHistOrderByOrderId($order['order'], $histOrder);
        if(false == $iret)
        {
            return false;
        }
        $this->delOrderByOrderId($order['order']);
        return true;
    }

}
