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

    public function getNextOrderId()
    {
        $Model = D('Order');
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
        $result = $Model->where("userid=%s and operstarttime > '%s' and operstarttime < '%s'", $userid, $fromTime, $toTime)->count();
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
        $result = $Model->where("userid=%s and operstarttime > '%s' and operstarttime < '%s'", $userid, $fromTime, $toTime)->limit($rangStart,$rangEnd)->select();
        return $result;
    }

}
