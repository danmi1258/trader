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
        $Model = M('Order');
        if(NULL == $Model){
            return NULL;
        }
        $max_tradeId = $Model->fetchSql(false)->max('tradeid');
        return ($max_tradeId + 1);
    }

    public function addOrder($order)
    {
        $Model = M('Order');

        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $Model->create($order);

        $iret =$Model->save();
        if(false == $iret)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        return true;
    }

    public function parseResultToAckInOrdersSearch($orderslist)
    {
        $orders = array();
        foreach($orderslist as $order)
        {
            $data = new \stdClass;
            $data->activation = 0;
            $data->close_price = 0;  //平仓之后的价格
            $data->close_time = 1;
            $data->cmd = (int)$order['tradetype'];
            $data->comment = $order['comments'];
            $data->commission = 0;
            $data->commission_agent = 0;
            $data->conv_rates1 = 0;
            $data->conv_rates2 = 0;
            $data->digits = 3;
            $data->expiration = 0;
            $data->internal_id = NULL;
            $data->login = 2089045865;
            $data->magic = 0;
            $data->open_price = $order['operstartprice'];
            $data->open_time = strtotime($order['operstarttime']);
            $data->order = $order['tradeid'];
            $data->profit = 0;
            $data->reserved1 = 0;
            $data->reserved2 = 0;
            $data->reserved3 = 0;
            $data->reserved4 = 0;
            $data->sl = $order['stopgainprice'];
            $data->spread = NULL;
            $data->state = 0;  //?
            $data->storage = 0;   //?
            $data->symbol = $order['goodname'];
            $data->taxes = 0; //?
            $data->timestamp = NULL;  //?
            $data->tp = $order['stoplossprice'];
            $data->value_date = NULL; //
            $data->volume = $order['tradenum']; //
            $orders[] = $data;
        }

        $data = new \stdClass;
        $data->error_code = 0;
        $data->error_message = "";
        $data->orders = $orders;
        return $data;
    }

    public function AckPostMsgToOrderSearch($result, $ackOrdersList)
    {
        $output = new  \stdClass;
        $output->data = $ackOrdersList;
        $output->message = "feederwork work success"; 
        $output->result = 1;
        $this->ajaxReturn($output);
    }


}
