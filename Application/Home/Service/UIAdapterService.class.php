<?php

namespace Home\Service;
use Think\Model;
use Think\Log;

/*类名：UIAdapterService
  类描述：处理与UI与内部数据结构不一致性
*/
class UIAdapterService extends Model {

    Protected $autoCheckFields = false;

    /******************usr/auth******************************/
    public function parseRequestPara2Auth($request_para)
    {
        $authUser = new \stdClass;
        $authUser->account = $request_para['account'];
        $authUser->password = $request_para['password'];
        $authUser->expiredAt = $request_para['expiredAt'];
        return $authUser;
    }

    public function parseInnerUserToPostUser($inner_user, $auth_user)
    {
        $authuser = new \stdClass;
        $authuser->account = $auth_user->account;
        $authuser->password = $auth_user->password;
        //$authuser->expiredAt = $auth_user->expiredAt;
        $authuser->apiKey = "4c500d631b41709632e527f8ba93aed5a4e33007";
        $authuser->articleVisible = 1;
        $authuser->authString = "0,15829231577,1441741514";
        $authuser->expiredAt = 1443862842;
        $authuser->bindOauth = 0;
        $authuser->brokerDomain = 0;
        $authuser->bwTenant = NULL;
        $authuser->device =  NULL;
        $authuser->email = $inner_user['email'];
        $authuser->guest = false;
        $authuser->ip = NULL;
        $authuser->locale = "zh";
        $authuser->login = NULL;

        $authuser->mt4Group = "demoTWVIR";
        $authuser->nickname = $inner_user['petname'];
        $authuser->introducerIdType = NULL;
        $authuser->phone = $inner_user['phonenum'];
        $authuser->randomKey = NULL;
        $authuser->serviceId = 2;
        $authuser->symbols = NULL;
        $authuser->tenantId = "0";
        $authuser->tenantName = NULL;

        $authuser->token = NULL;
        $authuser->twTimeout = 600;
        $authuser->userAvatar = "https://p-picture.b0.upaiyun.com/0/84cb62a9-8140-41e3-82a7-30a01e2235524591238998654350959.jpg";
        $authuser->userId = $inner_user['userid'];
        $authuser->verification = NULL;

        return $authuser;
    }

    public function parsePostMsgToAuth($result, $authuser)
    {
        $output = new \stdClass;
        if(NULL != $authuser)
        {
            $output->data  = $authuser;
        }
        $output->message = $result['message'];
        $output->result = $result['result'];
        return $output;
    }

    /******************usr/passcode******************************/
    public function parsePostMsgToPasscode($result, $user, $authtype)
    {
        $data = new \StdClass;
        if($authtype != NULL)
        {
            if($authtype == "email")
            {
              $data->account = $user['email'];
            }else if($authtype == "phone")
            {
              $data->account = $user['phone'];
            }
        }

        $data->createTime = NULL;
        $data->modifyTime = NULL;
        $data->objectId = "";
        $data->randomKey = NULL;
        $data->twTenant = "0";

        $output = new \stdClass;
        $output->data = $data;
        $output->message = $result['message'];
        $output->result = $result['result'];
        return $output;

    }

    /*****************user/register*******************/
    public function parseRequestParaToReg($request_para)
    {
        $registeruser = new \stdClass;
        $registeruser->account = $request_para['account'];
        $registeruser->address = NULL;
        $registeruser->articleVisible = NULL;
        $registeruser->bindMail = 0;
        $registeruser->bindOauth = 0;
        $registeruser->bindPhone = 0;
        $registeruser->birthday = NULL;
        $registeruser->captcha =  $request_para['captcha'];
        $registeruser->city = NULL;
        $registeruser->country = NULL;
        $registeruser->createTime = NULL;
        $registeruser->email = NULL;
        $registeruser->enable = NULL;
        $registeruser->expiredAt = $request_para['expiredAt'];
        $registeruser->gender = NULL;
        $registeruser->introducerId = NULL;
        $registeruser->introducerIdType = NULL;
        $registeruser->latestLoginTime = NULL;
        $registeruser->locale = "zh";
        $registeruser->modifyTime = NULL;
        $registeruser->nickname = $request_para['nickname'];
        $registeruser->oauthId = NULL;
        $registeruser->oldPassword = NULL;
        $registeruser->password = $request_para['password'];
        $registeruser->phone = NULL;
        $registeruser->province = "cn";
        $registeruser->randomKey = NULL;
        $registeruser->rePassword = $request_para['pwdConfirm'];
        $registeruser->tenantId = 0;
        $registeruser->userAvatar = NULL;
        $registeruser->userId = NULL;
        $registeruser->verification = NULL;
        $registeruser->zipcode = NULL;
        return $registeruser;
    }


    public function parsePostMsgToReg($result, $registeruser)
    {
        $output = new \stdClass;
        if(NULL != $registeruser)
        {
            $output->data = $registeruser;
        }
        $output->message = $result['message'];
        $output->result = $result['result'];
        return $output;
    }


    /************************update**************************************/
    protected function parseUserToUpdate($currentUser)
    {
        $user = new \stdClass;
        $user->account = $currentUser['account'];
        $user->address = NULL;
        $user->articleVisible = 1;
        $user->bindMail = 0;
        $user->bindOauth = 0;
        $user->bindPhone = 0;
        $user->birthday = NULL;
        $user->captcha =  NULL;
        $user->city = NULL;
        $user->country = NULL;
        $user->createTime = NULL;
        $user->email = $currentUser['email'];
        $user->enable = NULL;
        $user->expiredAt = NULL;
        $user->gender = NULL;
        $user->introducerId = NULL;
        $user->introducerIdType = NULL;
        $user->latestLoginTime = NULL;
        $user->locale = NULL;
        $user->modifyTime = NULL;
        $user->nickname = $currentUser['petname'];
        $user->oauthId = NULL;
        $user->oldPassword = $currentUser['password'];
        $user->password = $currentUser['password'];
        $user->phone = $currentUser['phonenum'];
        $user->province = NULL;
        $user->randomKey = NULL;
        $user->rePassword = $currentUser['password'];
        $user->tenantId = 0;
        $user->userAvatar = $currentUser['userAvatar'];
        $user->userId = $currentUser['userid'];
        $user->verification = NULL;
        $user->zipcode = NULL;
        return $user;
    }
    public function parsePostMsgToUpdate($result, $currentUser)
    {

        $output = new \stdClass;
        if(NULL != $currentUser)
        {
            $output->data = $this->parseUserToUpdate($currentUser);
        }
        $output->message = $result['message'];
        $output->result = $result['result'];
        return $output;
    }

    public function parseMsgObjToUpdateVerify($result, $account)
    {
        $data = new \stdClass;
        $data->account = $account;
        $data->createTime = NULL;
        $data->modifyTime = NULL;
        $data->objectId = "";
        $data->randomKey = NULL;
        $data->twTenant = 0;
        $data->verification = NULL;

        $output = new \stdClass;
        $output->data = $data;
        $output->message = $result['message'];
        $output->result = $result['result'];
        return $output;
    }

    /*******************order*************************/
    public function parsePostMsgToOrderOpen($result, $order)
    {

        $data = new \stdClass;
        if($result['result'] == 1)
        {
            $data->error_code = 0;
            $data->error_message = "RET_OK";
            $data->order = $order['tradeid'];

        }else {
            $data->error_code = 1;
            $data->error_message = "System Inner Error";
        }

        $output = new \stdClass;
        $output->data = $data;
        $output->message = $result['message'];
        $output->result = $result['result'];
        return $output;
    }

    public function parseRequestParaToOpenOrder($request_para)
    {
        $orderpara = new \stdClass;
        $orderpara->symbol = $request_para['symbol'];
        $orderpara->ask = $request_para['ask'];
        $orderpara->bid = $request_para['bid'];
        $orderpara->volume = $request_para['volume'];
        $orderpara->sl = $request_para['sl'];
        $orderpara->tp = $request_para['tp'];
        $orderpara->comment = $request_para['comment'];
        $orderpara->price = $request_para['price'];
        $orderpara->cmd = $request_para['cmd'];
        $orderpara->expiration =  $request_para['expiration'];

        $orderpara->closeCount = NULL;
        $orderpara->login = NULL;
        $orderpara->oldSl = NULL;
        $orderpara->oldTp = NULL;
        $orderpara->openPrice = NULL;
        $orderpara->operation = NULL;
        $orderpara->order = NULL;
        return $orderpara;
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

    public function parsePostMsgToOrderSearch($result, $ackOrdersList)
    {
        $output = new  \stdClass;
        $output->data = $ackOrdersList;
        $output->message = "feederwork work success"; 
        $output->result = 1;
        return $output;
    }

    public function parsePostMsgToHisOrderSearch($result, $histOrders)
    {
        $orders = array();
        foreach($histOrders as $order)
        {
            $data = new \stdClass;
            $data->activation = 0;
            $data->close_price = $order['operendprice'];  //平仓之后的价格
            $data->close_time = strtotime($order['operendtime']);
            $data->cmd = 0;
            $data->comment = $order['comment'];
            $data->commission = 0;
            $data->commission_agent = 0;
            $data->conv_rates1 = 1;
            $data->conv_rates2 = 1;
            $data->digits = 3;
            $data->expiration = 0;
            $data->internal_id = NULL;
            $data->login = 2089045865;
            $data->magic = 0;
            $data->open_price = $order['operstartprice'];
            $data->open_time = strtotime($order['operstarttime']);
            $data->order = $order['tradeid'];
            $data->profit = $order['gainedmoney'];  //?
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
            $data->timestamp = '1440518737';  //这个地方如何更新
            $data->tp = $order['stoplossprice'];
            $data->value_date = NULL; //
            $data->volume = $order['tradenum']; //
            $orders[] = $data;
        }
        $data = new \stdClass;
        $data->error_code = $result['error_code'];
        $data->error_message = $result['error_message'];
        $data->record_total = $result['record_total'];
        $data->total_page = $result['total_page'];
        $data->current_page = $result['current_page'];
        $data->orders = $orders;

        $output = new  \stdClass;
        $output->data = $data;
        $output->message = "feederwork work success";
        $output->result = 1;

        return $output;
    }

    public function parseRequestParaToCloseOrder($str)
    {
        $order = array();

        $str_begin = strpos($str, '{', 0);
        $str_end = strpos($str, '}', 0);
        while($str_end != FALSE)
        {
            $order_str = substr($str, $str_begin, $str_end - $str_begin + 1);
            $order = (array)json_decode($order_str);
            $orders[] = $order;

            $str_begin = strpos($str, '{', $str_end + 1);
            $str_end = strpos($str, '}', $str_end + 1);
        }

        return $orders;
    }

    public function parsePostMsgToOrderClose($result, $data)
    {
        $output = new \StdClass;
        $output->message = $result['message'];
        $output->result = $result['result'];
        if(NULL != $data)
        {
            $output->data = $data;
        }
        return $output;
    }



}