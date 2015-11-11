<?php

namespace Home\Service;
use Think\Model;
use Think\Log;
use Home\Service\RedisSetService;
/****************************************************************
类名：OrderService
类描述：订单相关操作服务接口
备注:
*****************************************************************/
class OrderService extends Model {

    Protected $autoCheckFields = false;
    private $toolkitSer;
    private $RedisSer;

    public function __construct()
    {
        parent::__construct();
        $this->logerSer = D('Log', 'Service');
        $this->toolkitSer = D('ToolKit', 'Service');
        $this->redisSer = new RedisSetService();

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
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }


        $iret =$Model->add($order);
        if(false == $iret)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }
        return true;
    }

    public function getOrdersDiffTime($userid, $timestart, $timeend)
    {
        $Model = D("Order");
        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }
        $result =$Model->fetchSql(false)->where("operstarttime >= '%s' and operstarttime <= '%s' and userid='%s'", $timestart, $timeend, $userid)->select();
        return $result;
    }

    public function getHistOrderCountByUser($userid, $fromTime, $toTime)
    {
        $Model = D('HistoryOrder');

        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }
        $result = $Model->where("userid='%s' and operstarttime > '%s' and operstarttime < '%s' and istrade='%s'", $userid, $fromTime, $toTime, "0")->count();
        return $result;
    }

    public function getHistOrders($userid, $fromTime, $toTime, $rangStart, $rangEnd)
    {
        $Model = D('HistoryOrder');

        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }
        $result = $Model->where("userid='%s' and operstarttime > '%s' and operstarttime < '%s' and istrade='%s'", $userid, $fromTime, $toTime, "0")->limit($rangStart,$rangEnd)->select();
        return $result;
    }

    public function getTradeOrderByOrderId($orderId)
    {
        $Model = D("Order");
        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }

        $result =$Model->fetchSql(false)->where("tradeid=%s", $orderId)->find();
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
        $iret = $this->addOrder($order);
        if(false == $iret)
        {
            $this->logerSer->logError("Add order to tbl_trade failed.");
            return NULL;
        }

        $histOrder = array();

        $histOrder['tradeid'] = $order['tradeid'] ;
        $histOrder['userid'] = $userId;
        $histOrder['goodname'] = $order_para->symbol;
        $histOrder['tradetype'] = $order_para->cmd;  //0 买入 1 卖出
        $histOrder['tradenum'] = $order_para->volume;
        $histOrder['operstarttime'] = $order['operstarttime'];
        $histOrder['operstartprice'] = $order_para->price;
        $histOrder['stoplossprice'] = $order_para->sl;
        $histOrder['stopgainprice'] = $order_para->tp;
        $histOrder['comment'] = $order_para->comment;
        $histOrder['istrade'] = "1";
        $iret = $this->addHistOrder($histOrder);
        if(false == $iret)
        {
            $this->logerSer->logError("Add order to tbl_histtrade failed.");
            return NULL;
        }
        return $order;
    }


    public function addHistOrder($order)
    {
        $Model = D('HistoryOrder');

        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }

        $iret =$Model->add($order);
        if(false == $iret)
        {
            $this->logerSer->logError("Add order to hist trade failed.");
            return false;
        }
        return true;
    }

    public function getHistOrderByOrderId($orderId)
    {
        $Model = D("HistoryOrder");
        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }

        $result =$Model->fetchSql(false)->where("tradeid=%s", $orderId)->find();
        return $result;
    }

    public function delOrderByOrderId($orderId)
    {
        $Model = D("Order");
        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
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
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }
        $Model->create($order);

        $iret =$Model->fetchSql(false)->save();
        if(false == $iret)
        {
            return false;
        }
        return true;
    }

    public function updateTradeOrderByOrderId($orderId, $order)
    {
        $Model = D('Order');

        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }
        $Model->create($order);

        $iret =$Model->where('tradeid='.$orderId)->save();
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
        $order['ask']; // 买入价格
        $order['bid'];  //卖出价格
        $order['openPrice']; //开始的价钱
        $order['cmd']; //买卖模式
        return ($order['price'] - $order['openPrice']) * $order['volume'];
    }

    public function closeOrderToOrder($user, $order)
    {
        $order['order']; //订单号
        $gainMoney = $this->calc_money($order);
        $this->logerSer->logInfo("totalMoney=" .$gainMoney ." gainMoney= ".$gainMoney/$user['levenum']. " levenum=". $user['levenum']);
        $gainMoney = $gainMoney/$user['levenum'];

        $histOrder  = $this->getHistOrderByOrderId($order['order']);
        $histOrder['operendtime'] = $this->toolkitSer->getSysTime();
        $histOrder['operendprice'] = $order['price'];
        $histOrder['gainedmoney'] = $gainMoney;
        $histOrder['istrade'] = "0";
        $iret = $this->updateHistOrderByOrderId($order['order'], $histOrder);
        if(false == $iret)
        {
            $this->logerSer->logError("Update history trade failed.");
            return false;
        }
        $this->delOrderByOrderId($order['order']);
        return true;
    }

    public function getTradeOrderByOrderIdAndType($orderId, $orderType)
    {
        $Model = D("Order");
        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }

        $result =$Model->fetchSql(false)->where("tradeid=%s and tradetype=%d", $orderId, $orderType)->select();
        return $result;
    }

    public function deleteHistOrderByOrderId($orderId)
    {
        $Model = D("HistoryOrder");
        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return false;
        }

        $result =$Model->fetchSql(false)->where("tradeid=%s", $orderId)->delete();
        return $result;
    }

    /**
     * 删除持仓记录
     * {order: "6636161", symbol: "USDJPY", cmd: 3, volume: "1", price: "120.517"}
     * @param  [type] $userid [description]
     * @param  [type] $order  [description]
     * @return [type]         [description]
     */
    public function deleteOrderToOrder($userid, $order)
    {
        $tradeOrder = $this->getTradeOrderByOrderIdAndType($order['order'], $order['cmd']);
        if(NULL == $tradeOrder)
        {
            $this->logerSer->logError("Execute get trade info by id and type failed.");
            return true;
        }
        $this->delOrderByOrderId($order['order']);
        $this->deleteHistOrderByOrderId($order['order']);
        return true;
    }

    public function getOrderTypePrefix($orderType)
    {
        if(is_null($orderType))
        {
            $this->logerSer->logError("order type is null");
            return "error";
        }

        switch($orderType)
        {
            case 0:
                return "Buy";
            case 1:
                return "Sell";
            case 2:
                return "BuyLimit";
            case 3:
                return "SellLimit";
            case 4:
                return "BuyStop";
            case 5:
                return "SellStop";
            default:
                return "error";
        }
    }

    public function isRestingOrder($orderType)
    {
        if($orderType == 2 || $orderType == 3 ||
            $orderType == 4 || $orderType == 5)
        {
            return true;
        }
        return false;
    }

    public function isOrdinaryOrder($orderType)
    {
        if($orderType == 0 || $orderType == 1)
        {
            return true;
        }
        return false;
    }

    public function getGoodInfoBySymbol($symbol)
    {
        if(NULL == $symbol)
        {
            return NULL;
        }
        $Model = D("Good");
        if(NULL == $Model)
        {
            $this->logerSer->logError("Execute sql failed.");
            return NULL;
        }

        $result =$Model->fetchSql(false)->where("goodname='%s'", $symbol)->find();
        return $result;
    }

    public function  calc_money($order)
    {
        $order['price']; //当前价格
        $order['volume'];  //容量
        $order['symbol']; //货比类型
        $order['ask']; // 买入价格
        $order['bid'];  //卖出价格
        $order['openPrice']; //开始的价钱
        $order['cmd']; //买卖模式

        //根据$order[symbol]从db中获取good的对象
        $good = $this->getGoodInfoBySymbol($order['symbol']);
        if(NULL == $good)
        {
            return array(
                    "result"=> "failed",
                    "money" => 0.0,
                    "desc" => "failed to get $good",
                );
        }
        $this->logerSer->logInfo("calc money for". $order['symbol']. " ". $good['swaptype']);
        $money = 0;
        switch ($good['swaptype'])
        {
            case 0:
                //直盘情况
                $this->logerSer->logInfo("direct trader.");
                $money = $this->calc_money_by_direct($order, $good);
                break;
            case 1:
                //非直盘情况
                $this->logerSer->logInfo("not_direct trader.");
                $money = $this->calc_money_by_notdirect($order, $good);
                break;
            case 2:
                //交叉盘的情况
                $this->logerSer->logInfo("cross trader-2.");
                $money = $this->calc_money_by_cross($order, $good);
                break;
            case 3:
                //交叉盘的情况
                $this->logerSer->logInfo("cross trader-3.");
                $money = $this->calc_money_by_cross($order, $good);
                break;
            case 4:
                //交叉盘的情况
                $this->logerSer->logInfo("cross trader-4.");
                $money = $this->calc_money_by_cross($order, $good);
                break;
            default:
                $this->logerSer->logInfo("love trader.");
                break;
        }


        return $money;
    }

    public function calc_money_by_direct($order, $good)
    {
        $gain = 0.0;
        if(0 == $order['cmd'])
        {
            $gain = $order['price'] - $order['openPrice'];
        }else if(1 == $order['cmd'])
        {
            $gain = $order['openPrice'] - $order['price'];
        }else{
            $gain = 0;
            $this->logerSer->logError("the trader cmd is not right.");
        }

        $this->logerSer->logInfo("info:". $order['volume']. " ". $good['point']);
        $pointValue = $order['volume']*$good['contractsize']*$good['point'];
        $point = $gain/$good['point'];
        $money = $point * $pointValue;
        $this->logerSer->logInfo($order['volume']." ".$order['contractsize']. " ".$good['point']);
        $this->logerSer->logInfo("direct calc:point=" .$point . "  pointValue=" .$pointValue. " money=".$money);
        return $money;
    }

    public function calc_money_by_notdirect($order, $good)
    {
        $gain = 0.0;
        $pointValue=0.0;

        $symbolJ_base = $this->getRealTimeSymbol($order['symbol']);
        $this->logerSer->logInfo("symbol:". $order['symbol']. " ask=".$symbolJ_base['ask']. " bid=". $symbolJ_base['bid']);

        if(0 == $order['cmd'])
        {
            //买入
            $gain = $order['price'] - $order['openPrice'];
            $pointValue = $order['volume']*$good['contractsize']*$good['point']/$symbolJ_base['bid'];
        }else if(1 == $order['cmd'])
        {
            //卖出
            $gain = $order['openPrice'] - $order['price'];
            $pointValue = $order['volume']*$good['contractsize']*$good['point']/$symbolJ_base['bid'];
        }else{
            $gain = 0;
            $this->logerSer->logError("the trader cmd is not used.");
        }
        $this->logerSer->logInfo("info:". $order['volume']. " ". $good['point']);

        $point = $gain/$good['point'];
        $money = $pointValue*$point;
        $this->logerSer->logInfo("direct calc:point=" .$point . "  pointValue=" .$pointValue. " money=".$money);
        return $money;
    }


    public function calc_money_by_cross($order, $good)
    {
        $gain = 0.0;
        $pointValue=0.0;

        $symbolJ_base = $this->getRealTimeSymbol($order['symbol']);
        $this->logerSer->logInfo("symbol:". $order['symbol']. " ask=".$symbolJ_base['ask']. " bid=". $symbolJ_base['bid']);

        if(0 == $order['cmd'])
        {
            //买入
            $gain = $order['price'] - $order['openPrice'];
        }else if(1 == $order['cmd'])
        {
            //卖出
            $gain = $order['openPrice'] - $order['price'];
        }else{
            $gain = 0;
            $this->logerSer->logError("the trader cmd is not used.");
        }
        $this->logerSer->logInfo("info:". $order['volume']. " ". $good['point']);

        $symbol_sub_start=substr($order['symbol'], 0, 3);

        $pointValue = 0;
        do{
            $symbolJ_usd = $this->getRealTimeSymbol($symbol_sub_start."USD");
            if($symbolJ_usd != NULL)
            {
                $pointValue = $order['volume']*$good['contractsize']*$good['point']/$symbolJ_base['bid']*$symbolJ_usd['bid'];
                break;
            }
            $symbolJ_usd = $this->getRealTimeSymbol("USD" .$symbol_sub_start);
            if($symbolJ_usd != NULL)
            {
                $pointValue = $order['volume']*$good['contractsize']*$good['point']/$symbolJ_base['bid']/$symbolJ_usd['bid'];
                break;
            }
            $this->logerSer->logError("the cala is not right.");
        }while(0);

        $this->logerSer->logInfo("the pointvalue=".$pointValue);
        $point = $gain/$good['point'];
        $money = $pointValue*$point;
        $this->logerSer->logInfo("direct calc:point=" .$point . "  pointValue=" .$pointValue. " money=".$money);
        return $money;

    }
/*
    //stand for type=2
    public function calc_money_by_cross_sub1($order, $good)
    {
        $symbol_sub_start=substr($order['symbol'], 0, 3);
        $symbol_sub_end=substr($order['symbol'], 3, 3);
        $symbolJ_one = $this->getRealTimeSymbol("USD".$symbol_sub_start);
        $symbolJ_two =  $this->getRealTimeSymbol("USD".$symbol_sub_end);
        $result_buy = $symbolJ_two['bid']/$symbolJ_one['ask'];
        $result_buy = $symbolJ_two['ask']/$symbolJ_one['bid'];
    }
    //stand for type=3
    public function calc_money_by_cross_sub2($order, $good)
    {
        $symbol_sub_start=substr($order['symbol'], 0, 3);
        $symbol_sub_end=substr($order['symbol'], 3, 3);
        $symbolJ_one = $this->getRealTimeSymbol($symbol_sub_start."USD");
        $symbolJ_two =  $this->getRealTimeSymbol("USD".$symbol_sub_end);
        $result_sell = $symbolJ_two['bid']/$symbolJ_one['bid'];
        $result_buy = $symbolJ_two['ask']/$symbolJ_one['ask'];
    }
    //stand for type=4
    public function calc_money_by_cross_sub3($order, $good)
    {
        $symbol_sub_start=substr($order['symbol'], 0, 3);
        $symbol_sub_end=substr($order['symbol'], 3, 3);
        $symbolJ_one = $this->getRealTimeSymbol($symbol_sub_start."USD");
        $symbolJ_two =  $this->getRealTimeSymbol($symbol_sub_end."USD");
        $result_sell = $symbolJ_one['bid']/$symbolJ_two['ask'];
        $result_buy = $symbolJ_one['ask']/$symbolJ_two['bid'];
    }
*/
    public function getRealTimeSymbol($symbol)
    {
        /*从*/
        $str = $this->redisSer->HSetGet("SymbolHSet", $symbol);
        $this->logerSer->logInfo("the RealTime symbol is=". $str);
        $obj = (array)json_decode($str);
        return $obj;
    }

}
