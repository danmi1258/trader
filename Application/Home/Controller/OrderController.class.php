<?php
namespace Home\Controller;
use Think\Controller;
use Think\Log;
use Home\Model;

class OrderController extends Controller {

    private $logerSer;
    private $userSer;
    private $operlogSer;
    private $uiAdapterSer;
    private $toolkitSer;
    private $orderSer;

    public function __construct()
    {
        parent::__construct();
        $this->logerSer = D('Log', 'Service');
        $this->userSer = D('User', 'Service');
        $this->operlogSer = D('OperLog', 'Service');
        $this->uiAdapterSer = D('UIAdapter', 'Service');
        $this->toolkitSer = D('ToolKit', 'Service');
        $this->orderSer = D('Order', 'Service');
    }



    protected function LoggerPrint($message, $level = 'ERROR')
    {
        Log::write($message, $level);
        Log::save();
    }

    //这个函数以后放入Util函数中
    public function getUserFromCookie($cookie_user)
    {
        if(NULL == $cookie_user)
        {
            return NULL;
        }
        $user =  (array)json_decode($cookie_user);
        return $user;
    }

    //该函数以后放入UserModel的内里面
    public  function getUserFromDBByUserId($userid)
    {
        if(NULL == $userid)
        {
            $this->LOggerPrint("getUserFromDBByUserId: userid is null");
            return NULL;
        }

        $Model = M('User');
        if(NULL == $Model){
            $this->LoggerPrint("Create User Model fail.");
            return NULL;
        }
        $data = $Model->fetchSql(false)->where('userid="'.$userid.'"')->find();
        return $data;
    }


    /****************************************************************
    函数名：open
    功能描述：对外接口，实现添加订单的操作
    备注: 对外接口  order/open
    *****************************************************************/
    public function open()
    {

        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToOrderOpen($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

    	$request_payload = file_get_contents('php://input');
    	$request_para = (array)json_decode($request_payload);

        $order_para = $this->parseRequestParaToOpenOrder($request_para);

        $request_user = $this->userSer->getUserFromCookie(cookie('userInfo'));
        $currentUser = $this->userSer->getUserFromDBByUserId($request_user['userId']);
        if(NULL == $currentUser)
        {
            $result['message'] = "用户鉴权失败"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToOrderOpen($result, NULL);
            $this->ajaxReturn($output , 'JSON');
        }
        /* 判断是否能够开启外汇交易成功：当前用户ID、用户账户余额是否满足要求 */


        /* 当前的交易时间是否满足外贸交易的时间 */

        /* 平仓操作的时候，需要记录盈利情况到DB中 */


        /* 将符合条件订单信息写入到DB*/
        $order['tradeid'] = $this->orderSer->getNextOrderId();
        $order['userid'] = $currentUser['userid'];
        $order['goodname'] = $order_para['symbol'];
        $order['tradetype'] = $order_para['cmd'];  //0 买入 1 卖出 这个地方确定买卖的类型是不是这个字段
        $order['tradenum'] = $orderpara['volume'];
        $order['operstarttime'] = $this->toolkitSer->getSysTime();
        $order['operstartprice'] = $orderpara['price'];
        $order['buyprice'] = $orderpara['ask'];
        $order['sellprice'] = $orderpara['bid'];
        $order['stoplossprice'] = $orderpara['sl'];
        $order['stopgainprice'] = $orderpara['tp'];
        $order['comment'] = $orderpara['comment'];
        $this->orderSer->addOrder($order);

        $this->logerSer->logInfo("Open order success.");

        $result['message'] = "RETURN_OK"; $result['result'] = 1;
        $output = $this->uiAdapterSer->parsePostMsgToOrderOpen($result, $order);
        $this->ajaxReturn($output , 'JSON');
        return;
    }

    public function parseRequestPara2CloseOrder()
    {
        $this->LoggerPrint("starting.");
        $orderpara = new \stdClass;
        $orderpara->order = $request_para['order'];
        $orderpara->symbol = $request_para['symbol'];
        $orderpara->ask = $request_para['ask'];
        $orderpara->bid = $request_para['bid'];
        $orderpara->volume = $request_para['volume'];
        $orderpara->price = $request_para['price'];
        $orderpara->openprice = $request_para['openprice'];
        $orderpara->cmd = $request_para['cmd'];
        return $orderpara;
    }

    public function close()
    {
        if(false == IS_POST)
        {
            //暂时返回页面跳转，最终的时候全部封装成json格式的结构
            $this->LoggerPrint("Fail Message Type.");
            $result['message'] = "系统内部错误";
            $result['result'] = 0;
            $this->AckPostMsgToOrderClose($result, NULL);
            return;
        }

        //Parse data in web_view to controller.
        $request_payload = file_get_contents('php://input');
        $request_para = (array)json_decode($request_payload);

        $orderpara = $this->parseRequestPara2CloseOrder($request_para);
        $orderuser = $this->getUserFromCookie(cookie('userInfo'));

        /*计算盈利情况写入数据库中*/
    }

    public function getOrdersDiffTime($userid, $timestart, $timeend)
    {
        $Model = D("Order");
        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $this->LoggerPrint("userid:". $userid. "timestart:". $timestart. "timeend". $timeend);
        $result =$Model->fetchSql(false)->where("operstarttime >= '%s' and operstarttime <= '%s' and userid=%s", $timestart, $timeend, $userid)->select();
        return $result;
    }


    /********************************************************************
    函数头：search_trade
    功能： 查询当前用户所挂单的情况
    入参： Post消息请求
    ********************************************************************/
    public function  search_trade()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToOrderSearch($result, $ackOrdersList);
            $this->ajaxReturn($output , 'JSON');
            return;
        }
        $request_payload = file_get_contents('php://input');
        $request_para = (array)json_decode($request_payload);

        $timestart = $request_para['from'];
        $timeend = $request_para['to'];

        $orderuser = $this->getUserFromCookie(cookie('userInfo'));

        $orderlist = $this->getOrdersDiffTime($orderuser['userId'], $timestart, $timeend);

        $ackOrdersList = new \stdClass;
        $ackOrdersList = $this->parseResultToAckInOrdersSearch($orderlist);
        $result['message'] = "调用feederWork操作成功";
        $result['result'] = "1";
        $this->AckPostMsgToOrderSearch($result, $ackOrdersList);

    }


    public function AckPostMsgToSearchHistOrders($result, $histOrders)
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

        $this->ajaxReturn($output);

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

    public function getHistOrdersForPost($userid, $fromTime, $toTime, $rangStart, $rangEnd)
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

    /********************************************************************
    search_history
    功能： 查询当前用户历史操作记录
    入参： Post消息请求
    ********************************************************************/
    public function search_history()
    {
        if(false == IS_POST)
        {
            //暂时返回页面跳转，最终的时候全部封装成json格式的结构
            $this->LoggerPrint("Fail Message Type.");
            $result['message'] = "系统内部错误";
            $result['result'] = 0;
            $this->AckPostMsgToSearchHistTrader($result, NULL);
            return;
        }
        $request_payload = file_get_contents('php://input');
        $request_para = (array)json_decode($request_payload);

        $fromTime = $request_para['from'];
        $toTime = $request_para['to'];
        $pageNo = $request_para['pageNo'];
        $pageSize = $request_para['pageSize'];
        $Opercmd = $request_para['cmd'];
        $key  = $request_para['key'];
        $this->LoggerPrint("fromTime=".$fromTime. "toTime=".$toTime. "pageNo=".$pageNo. "pageSize=".$pageSize. "Opercmd=".$Opercmd. "key=".$key);

        $reqUser = $this->getUserFromCookie(cookie('userInfo'));

        $totalNum = $this->getHistOrderCountByUser($reqUser['userId'], $fromTime, $toTime);

        $pageNum = (int)($totalNum/$pageSize);
        if(($totalNum - $pageSize*$pageNum) > 0)
        {
            $pageNum = $pageNum + 1;
        }
        $rangFrom = 0;
        $rangEnd = 0;
        if($pageNo != $pageNum)
        {
            $rangFrom = ($pageNo - 1)*$pageSize;
            $rangEnd = $pageNo*$pageSize;
        }else{
            $rangFrom = ($pageNum - 1)*$pageSize;
            $rangEnd = $totalNum;
        }

        $histOrders = $this->getHistOrdersForPost($reqUser['userId'], $fromTime, $toTime, $rangFrom, $rangEnd);

        $result['current_page'] = $pageNo;
        $result['error_code'] = 0;
        $result['error_message'] = 'RET_OK';
        $result['record_total'] = $totalNum;
        $result['total_page'] = $pageNum;
        $result['message'] = "feedtrade success.";
        $result['result'] = 1;
        $this->AckPostMsgToSearchHistOrders($result, $histOrders);
    }

    public function quote_histories()
    {
        $str = '{
    "result": 1,
    "data": [
        {
            "s": "AUDCAD",
            "t": 1441065600,
            "p": 5,
            "o": 0.9345,
            "c": 0.92139,
            "h": 0.93984,
            "l": 0.91972
        },
        {
            "s": "AUDCAD",
            "t": 1438387200,
            "p": 5,
            "o": 0.95655,
            "c": 0.93453,
            "h": 0.97488,
            "l": 0.93293
        },
        {
            "s": "AUDCAD",
            "t": 1435708800,
            "p": 5,
            "o": 0.95924,
            "c": 0.95422,
            "h": 0.9663,
            "l": 0.93893
        },
        {
            "s": "AUDCAD",
            "t": 1433116800,
            "p": 5,
            "o": 0.95199,
            "c": 0.95917,
            "h": 0.97171,
            "l": 0.93983
        },
        {
            "s": "AUDCAD",
            "t": 1430438400,
            "p": 5,
            "o": 0.95381,
            "c": 0.95199,
            "h": 0.97463,
            "l": 0.94301
        },
        {
            "s": "AUDCAD",
            "t": 1427846400,
            "p": 5,
            "o": 0.96614,
            "c": 0.95388,
            "h": 0.9713,
            "l": 0.94094
        },
        {
            "s": "AUDCAD",
            "t": 1425168000,
            "p": 5,
            "o": 0.97579,
            "c": 0.96612,
            "h": 0.98812,
            "l": 0.96266
        },
        {
            "s": "AUDCAD",
            "t": 1422748800,
            "p": 5,
            "o": 0.98417,
            "c": 0.9759,
            "h": 0.99649,
            "l": 0.95893
        },
        {
            "s": "AUDCAD",
            "t": 1420070400,
            "p": 5,
            "o": 0.9493,
            "c": 0.98682,
            "h": 1.00832,
            "l": 0.94565
        },
        {
            "s": "AUDCAD",
            "t": 1417392000,
            "p": 5,
            "o": 0.96665,
            "c": 0.94752,
            "h": 0.96939,
            "l": 0.93965
        },
        {
            "s": "AUDCAD",
            "t": 1414800000,
            "p": 5,
            "o": 0.9878,
            "c": 0.96667,
            "h": 0.99874,
            "l": 0.95663
        },
        {
            "s": "AUDCAD",
            "t": 1412121600,
            "p": 5,
            "o": 0.97927,
            "c": 0.99092,
            "h": 0.996,
            "l": 0.9685
        },
        {
            "s": "AUDCAD",
            "t": 1409529600,
            "p": 5,
            "o": 1.01475,
            "c": 0.97929,
            "h": 1.02326,
            "l": 0.97055
        },
        {
            "s": "AUDCAD",
            "t": 1406851200,
            "p": 5,
            "o": 1.01437,
            "c": 1.01475,
            "h": 1.02352,
            "l": 1.01045
        },
        {
            "s": "AUDCAD",
            "t": 1404172800,
            "p": 5,
            "o": 1.00628,
            "c": 1.01436,
            "h": 1.01922,
            "l": 0.99368
        },
        {
            "s": "AUDCAD",
            "t": 1401580800,
            "p": 5,
            "o": 1.00874,
            "c": 1.00626,
            "h": 1.02421,
            "l": 1.00277
        },
        {
            "s": "AUDCAD",
            "t": 1398902400,
            "p": 5,
            "o": 1.01792,
            "c": 1.00972,
            "h": 1.02635,
            "l": 1.00094
        },
        {
            "s": "AUDCAD",
            "t": 1396310400,
            "p": 5,
            "o": 1.02439,
            "c": 1.0179,
            "h": 1.03498,
            "l": 1.01303
        },
        {
            "s": "AUDCAD",
            "t": 1393632000,
            "p": 5,
            "o": 0.985,
            "c": 1.02437,
            "h": 1.03158,
            "l": 0.98249
        },
        {
            "s": "AUDCAD",
            "t": 1391212800,
            "p": 5,
            "o": 0.97329,
            "c": 0.98765,
            "h": 1.00587,
            "l": 0.96953
        },
        {
            "s": "AUDCAD",
            "t": 1388534400,
            "p": 5,
            "o": 0.94585,
            "c": 0.97396,
            "h": 0.98997,
            "l": 0.94106
        },
        {
            "s": "AUDCAD",
            "t": 1385856000,
            "p": 5,
            "o": 0.96922,
            "c": 0.94608,
            "h": 0.97467,
            "l": 0.94195
        },
        {
            "s": "AUDCAD",
            "t": 1383264000,
            "p": 5,
            "o": 0.98685,
            "c": 0.96586,
            "h": 0.99662,
            "l": 0.95847
        },
        {
            "s": "AUDCAD",
            "t": 1380585600,
            "p": 5,
            "o": 0.96222,
            "c": 0.98685,
            "h": 1.0047,
            "l": 0.95944
        },
        {
            "s": "AUDCAD",
            "t": 1377993600,
            "p": 5,
            "o": 0.94111,
            "c": 0.96222,
            "h": 0.97399,
            "l": 0.93973
        },
        {
            "s": "AUDCAD",
            "t": 1375315200,
            "p": 5,
            "o": 0.92056,
            "c": 0.93764,
            "h": 0.95349,
            "l": 0.91949
        },
        {
            "s": "AUDCAD",
            "t": 1372636800,
            "p": 5,
            "o": 0.96188,
            "c": 0.92053,
            "h": 0.97144,
            "l": 0.9168
        },
        {
            "s": "AUDCAD",
            "t": 1370044800,
            "p": 5,
            "o": 0.99542,
            "c": 0.96189,
            "h": 1.00647,
            "l": 0.94822
        },
        {
            "s": "AUDCAD",
            "t": 1367366400,
            "p": 5,
            "o": 1.04409,
            "c": 0.99212,
            "h": 1.04483,
            "l": 0.98853
        },
        {
            "s": "AUDCAD",
            "t": 1364774400,
            "p": 5,
            "o": 1.05906,
            "c": 1.04407,
            "h": 1.07148,
            "l": 1.04314
        },
        {
            "s": "AUDCAD",
            "t": 1362096000,
            "p": 5,
            "o": 1.05302,
            "c": 1.05907,
            "h": 1.07173,
            "l": 1.04248
        },
        {
            "s": "AUDCAD",
            "t": 1359676800,
            "p": 5,
            "o": 1.03988,
            "c": 1.05305,
            "h": 1.05791,
            "l": 1.02401
        },
        {
            "s": "AUDCAD",
            "t": 1356998400,
            "p": 5,
            "o": 1.03206,
            "c": 1.03987,
            "h": 1.0547,
            "l": 1.02858
        },
        {
            "s": "AUDCAD",
            "t": 1354320000,
            "p": 5,
            "o": 1.03648,
            "c": 1.03049,
            "h": 1.04283,
            "l": 1.02664
        },
        {
            "s": "AUDCAD",
            "t": 1351728000,
            "p": 5,
            "o": 1.03721,
            "c": 1.03656,
            "h": 1.04696,
            "l": 1.02839
        },
        {
            "s": "AUDCAD",
            "t": 1349049600,
            "p": 5,
            "o": 1.01897,
            "c": 1.03726,
            "h": 1.03901,
            "l": 0.99268
        },
        {
            "s": "AUDCAD",
            "t": 1346457600,
            "p": 5,
            "o": 1.01536,
            "c": 1.019,
            "h": 1.02728,
            "l": 1.00526
        },
        {
            "s": "AUDCAD",
            "t": 1343779200,
            "p": 5,
            "o": 1.0517,
            "c": 1.0176,
            "h": 1.05979,
            "l": 1.01711
        },
        {
            "s": "AUDCAD",
            "t": 1341100800,
            "p": 5,
            "o": 1.04315,
            "c": 1.05171,
            "h": 1.0553,
            "l": 1.03013
        },
        {
            "s": "AUDCAD",
            "t": 1338508800,
            "p": 5,
            "o": 1.00416,
            "c": 1.03993,
            "h": 1.04535,
            "l": 0.99823
        },
        {
            "s": "AUDCAD",
            "t": 1335830400,
            "p": 5,
            "o": 1.02957,
            "c": 1.00406,
            "h": 1.03019,
            "l": 0.9946
        },
        {
            "s": "AUDCAD",
            "t": 1333238400,
            "p": 5,
            "o": 1.04029,
            "c": 1.02951,
            "h": 1.04088,
            "l": 1.01557
        },
        {
            "s": "AUDCAD",
            "t": 1330560000,
            "p": 5,
            "o": 1.06193,
            "c": 1.0327,
            "h": 1.06573,
            "l": 1.03109
        },
        {
            "s": "AUDCAD",
            "t": 1328054400,
            "p": 5,
            "o": 1.06417,
            "c": 1.06194,
            "h": 1.07834,
            "l": 1.0598
        },
        {
            "s": "AUDCAD",
            "t": 1325376000,
            "p": 5,
            "o": 1.04253,
            "c": 1.06413,
            "h": 1.06884,
            "l": 1.03912
        },
        {
            "s": "AUDCAD",
            "t": 1322697600,
            "p": 5,
            "o": 1.04394,
            "c": 1.04155,
            "h": 1.04588,
            "l": 1.02556
        },
        {
            "s": "AUDCAD",
            "t": 1320105600,
            "p": 5,
            "o": 1.05329,
            "c": 1.04387,
            "h": 1.0599,
            "l": 1.01093
        },
        {
            "s": "AUDCAD",
            "t": 1317427200,
            "p": 5,
            "o": 1.01258,
            "c": 1.05329,
            "h": 1.06653,
            "l": 0.99388
        },
        {
            "s": "AUDCAD",
            "t": 1314835200,
            "p": 5,
            "o": 1.04529,
            "c": 1.01314,
            "h": 1.05168,
            "l": 0.99782
        },
        {
            "s": "AUDCAD",
            "t": 1312156800,
            "p": 5,
            "o": 1.04829,
            "c": 1.04531,
            "h": 1.05343,
            "l": 0.99162
        },
        {
            "s": "AUDCAD",
            "t": 1309478400,
            "p": 5,
            "o": 1.03098,
            "c": 1.04829,
            "h": 1.0538,
            "l": 1.01273
        },
        {
            "s": "AUDCAD",
            "t": 1306886400,
            "p": 5,
            "o": 1.03374,
            "c": 1.03098,
            "h": 1.05538,
            "l": 1.02334
        },
        {
            "s": "AUDCAD",
            "t": 1304208000,
            "p": 5,
            "o": 1.03727,
            "c": 1.03374,
            "h": 1.04863,
            "l": 1.01908
        },
        {
            "s": "AUDCAD",
            "t": 1301616000,
            "p": 5,
            "o": 1.00069,
            "c": 1.03647,
            "h": 1.04424,
            "l": 0.99406
        },
        {
            "s": "AUDCAD",
            "t": 1298937600,
            "p": 5,
            "o": 0.98935,
            "c": 1.00067,
            "h": 1.01185,
            "l": 0.96186
        },
        {
            "s": "AUDCAD",
            "t": 1296518400,
            "p": 5,
            "o": 0.99719,
            "c": 0.98935,
            "h": 1.01242,
            "l": 0.98325
        },
        {
            "s": "AUDCAD",
            "t": 1293840000,
            "p": 5,
            "o": 1.0146,
            "c": 0.99723,
            "h": 1.0164,
            "l": 0.9704
        },
        {
            "s": "AUDCAD",
            "t": 1291161600,
            "p": 5,
            "o": 0.98408,
            "c": 1.01788,
            "h": 1.02022,
            "l": 0.97355
        },
        {
            "s": "AUDCAD",
            "t": 1288569600,
            "p": 5,
            "o": 1.00429,
            "c": 0.98409,
            "h": 1.02044,
            "l": 0.97738
        },
        {
            "s": "AUDCAD",
            "t": 1285891200,
            "p": 5,
            "o": 0.99477,
            "c": 1.00431,
            "h": 1.01539,
            "l": 0.97882
        },
        {
            "s": "AUDCAD",
            "t": 1283299200,
            "p": 5,
            "o": 0.94937,
            "c": 0.99477,
            "h": 1.00212,
            "l": 0.94572
        },
        {
            "s": "AUDCAD",
            "t": 1280620800,
            "p": 5,
            "o": 0.93212,
            "c": 0.94937,
            "h": 0.95132,
            "l": 0.92115
        },
        {
            "s": "AUDCAD",
            "t": 1277942400,
            "p": 5,
            "o": 0.8945,
            "c": 0.92982,
            "h": 0.93552,
            "l": 0.8869
        },
        {
            "s": "AUDCAD",
            "t": 1275350400,
            "p": 5,
            "o": 0.8804,
            "c": 0.8944,
            "h": 0.9111,
            "l": 0.8579
        },
        {
            "s": "AUDCAD",
            "t": 1272672000,
            "p": 5,
            "o": 0.9378,
            "c": 0.8802,
            "h": 0.9456,
            "l": 0.8648
        },
        {
            "s": "AUDCAD",
            "t": 1270080000,
            "p": 5,
            "o": 0.9296,
            "c": 0.9396,
            "h": 0.9444,
            "l": 0.9176
        },
        {
            "s": "AUDCAD",
            "t": 1267401600,
            "p": 5,
            "o": 0.9446,
            "c": 0.9297,
            "h": 0.9468,
            "l": 0.9248
        },
        {
            "s": "AUDCAD",
            "t": 1264982400,
            "p": 5,
            "o": 0.9462,
            "c": 0.9444,
            "h": 0.9474,
            "l": 0.9226
        },
        {
            "s": "AUDCAD",
            "t": 1262304000,
            "p": 5,
            "o": 0.9414,
            "c": 0.9461,
            "h": 0.963,
            "l": 0.9363
        },
        {
            "s": "AUDCAD",
            "t": 1259625600,
            "p": 5,
            "o": 0.967,
            "c": 0.9402,
            "h": 0.9792,
            "l": 0.9186
        },
        {
            "s": "AUDCAD",
            "t": 1257033600,
            "p": 5,
            "o": 0.9709,
            "c": 0.9669,
            "h": 0.9914,
            "l": 0.9543
        },
        {
            "s": "AUDCAD",
            "t": 1254355200,
            "p": 5,
            "o": 0.9442,
            "c": 0.9736,
            "h": 0.9838,
            "l": 0.9334
        },
        {
            "s": "AUDCAD",
            "t": 1251763200,
            "p": 5,
            "o": 0.9214,
            "c": 0.9441,
            "h": 0.9523,
            "l": 0.908
        },
        {
            "s": "AUDCAD",
            "t": 1249084800,
            "p": 5,
            "o": 0.8991,
            "c": 0.9213,
            "h": 0.9274,
            "l": 0.8949
        },
        {
            "s": "AUDCAD",
            "t": 1246406400,
            "p": 5,
            "o": 0.9371,
            "c": 0.9007,
            "h": 0.9386,
            "l": 0.8794
        },
        {
            "s": "AUDCAD",
            "t": 1243814400,
            "p": 5,
            "o": 0.8734,
            "c": 0.9372,
            "h": 0.9391,
            "l": 0.8728
        },
        {
            "s": "AUDCAD",
            "t": 1241136000,
            "p": 5,
            "o": 0.8695,
            "c": 0.8736,
            "h": 0.8986,
            "l": 0.8635
        },
        {
            "s": "AUDCAD",
            "t": 1238544000,
            "p": 5,
            "o": 0.8722,
            "c": 0.8694,
            "h": 0.8931,
            "l": 0.8545
        },
        {
            "s": "AUDCAD",
            "t": 1235865600,
            "p": 5,
            "o": 0.8133,
            "c": 0.8723,
            "h": 0.879,
            "l": 0.8049
        },
        {
            "s": "AUDCAD",
            "t": 1233446400,
            "p": 5,
            "o": 0.7797,
            "c": 0.8124,
            "h": 0.8358,
            "l": 0.772
        },
        {
            "s": "AUDCAD",
            "t": 1230768000,
            "p": 5,
            "o": 0.8597,
            "c": 0.7786,
            "h": 0.8682,
            "l": 0.7772
        },
        {
            "s": "AUDCAD",
            "t": 1228089600,
            "p": 5,
            "o": 0.8083,
            "c": 0.8637,
            "h": 0.8649,
            "l": 0.7879
        },
        {
            "s": "AUDCAD",
            "t": 1225497600,
            "p": 5,
            "o": 0.8117,
            "c": 0.8085,
            "h": 0.8218,
            "l": 0.7815
        },
        {
            "s": "AUDCAD",
            "t": 1222819200,
            "p": 5,
            "o": 0.8438,
            "c": 0.8007,
            "h": 0.849,
            "l": 0.715
        },
        {
            "s": "AUDCAD",
            "t": 1220227200,
            "p": 5,
            "o": 0.9106,
            "c": 0.8439,
            "h": 0.9124,
            "l": 0.8288
        },
        {
            "s": "AUDCAD",
            "t": 1217548800,
            "p": 5,
            "o": 0.9616,
            "c": 0.9105,
            "h": 0.9647,
            "l": 0.8917
        },
        {
            "s": "AUDCAD",
            "t": 1214870400,
            "p": 5,
            "o": 0.9775,
            "c": 0.9615,
            "h": 0.984,
            "l": 0.9606
        },
        {
            "s": "AUDCAD",
            "t": 1212278400,
            "p": 5,
            "o": 0.9502,
            "c": 0.9777,
            "h": 0.9836,
            "l": 0.9453
        },
        {
            "s": "AUDCAD",
            "t": 1209600000,
            "p": 5,
            "o": 0.9493,
            "c": 0.9493,
            "h": 0.961,
            "l": 0.9293
        },
        {
            "s": "AUDCAD",
            "t": 1207008000,
            "p": 5,
            "o": 0.936,
            "c": 0.9492,
            "h": 0.9694,
            "l": 0.9153
        },
        {
            "s": "AUDCAD",
            "t": 1204329600,
            "p": 5,
            "o": 0.9167,
            "c": 0.9359,
            "h": 0.9437,
            "l": 0.9059
        },
        {
            "s": "AUDCAD",
            "t": 1201824000,
            "p": 5,
            "o": 0.8963,
            "c": 0.9165,
            "h": 0.9369,
            "l": 0.8888
        },
        {
            "s": "AUDCAD",
            "t": 1199145600,
            "p": 5,
            "o": 0.87,
            "c": 0.8965,
            "h": 0.9179,
            "l": 0.8671
        },
        {
            "s": "AUDCAD",
            "t": 1196467200,
            "p": 5,
            "o": 0.884,
            "c": 0.8706,
            "h": 0.8987,
            "l": 0.8536
        },
        {
            "s": "AUDCAD",
            "t": 1193875200,
            "p": 5,
            "o": 0.8818,
            "c": 0.8828,
            "h": 0.8879,
            "l": 0.8425
        },
        {
            "s": "AUDCAD",
            "t": 1191196800,
            "p": 5,
            "o": 0.8826,
            "c": 0.8817,
            "h": 0.8892,
            "l": 0.8556
        },
        {
            "s": "AUDCAD",
            "t": 1188604800,
            "p": 5,
            "o": 0.861,
            "c": 0.8823,
            "h": 0.8842,
            "l": 0.8508
        },
        {
            "s": "AUDCAD",
            "t": 1185926400,
            "p": 5,
            "o": 0.9099,
            "c": 0.864,
            "h": 0.911,
            "l": 0.827
        },
        {
            "s": "AUDCAD",
            "t": 1183248000,
            "p": 5,
            "o": 0.9058,
            "c": 0.91,
            "h": 0.9269,
            "l": 0.8969
        },
        {
            "s": "AUDCAD",
            "t": 1180656000,
            "p": 5,
            "o": 0.8865,
            "c": 0.9021,
            "h": 0.9115,
            "l": 0.8784
        },
        {
            "s": "AUDCAD",
            "t": 1177977600,
            "p": 5,
            "o": 0.9203,
            "c": 0.8863,
            "h": 0.9283,
            "l": 0.8745
        },
        {
            "s": "AUDCAD",
            "t": 1175385600,
            "p": 5,
            "o": 0.9327,
            "c": 0.9202,
            "h": 0.9512,
            "l": 0.9192
        },
        {
            "s": "AUDCAD",
            "t": 1172707200,
            "p": 5,
            "o": 0.9204,
            "c": 0.9335,
            "h": 0.9448,
            "l": 0.906
        },
        {
            "s": "AUDCAD",
            "t": 1170288000,
            "p": 5,
            "o": 0.9111,
            "c": 0.9205,
            "h": 0.9274,
            "l": 0.9049
        },
        {
            "s": "AUDCAD",
            "t": 1167609600,
            "p": 5,
            "o": 0.9189,
            "c": 0.9111,
            "h": 0.9391,
            "l": 0.907
        },
        {
            "s": "AUDCAD",
            "t": 1164931200,
            "p": 5,
            "o": 0.8999,
            "c": 0.9199,
            "h": 0.9208,
            "l": 0.8941
        },
        {
            "s": "AUDCAD",
            "t": 1162339200,
            "p": 5,
            "o": 0.8687,
            "c": 0.8999,
            "h": 0.9024,
            "l": 0.863
        },
        {
            "s": "AUDCAD",
            "t": 1159660800,
            "p": 5,
            "o": 0.8324,
            "c": 0.8688,
            "h": 0.8697,
            "l": 0.8315
        },
        {
            "s": "AUDCAD",
            "t": 1157068800,
            "p": 5,
            "o": 0.8434,
            "c": 0.8325,
            "h": 0.8578,
            "l": 0.829
        },
        {
            "s": "AUDCAD",
            "t": 1154390400,
            "p": 5,
            "o": 0.8652,
            "c": 0.843,
            "h": 0.8679,
            "l": 0.8369
        },
        {
            "s": "AUDCAD",
            "t": 1151712000,
            "p": 5,
            "o": 0.8283,
            "c": 0.8651,
            "h": 0.8683,
            "l": 0.8221
        },
        {
            "s": "AUDCAD",
            "t": 1149120000,
            "p": 5,
            "o": 0.8248,
            "c": 0.8292,
            "h": 0.8293,
            "l": 0.8118
        },
        {
            "s": "AUDCAD",
            "t": 1146441600,
            "p": 5,
            "o": 0.8473,
            "c": 0.8271,
            "h": 0.8605,
            "l": 0.8266
        },
        {
            "s": "AUDCAD",
            "t": 1143849600,
            "p": 5,
            "o": 0.8363,
            "c": 0.8474,
            "h": 0.8515,
            "l": 0.8323
        },
        {
            "s": "AUDCAD",
            "t": 1141171200,
            "p": 5,
            "o": 0.8444,
            "c": 0.8357,
            "h": 0.8552,
            "l": 0.8208
        },
        {
            "s": "AUDCAD",
            "t": 1138752000,
            "p": 5,
            "o": 0.8629,
            "c": 0.8445,
            "h": 0.8642,
            "l": 0.8395
        },
        {
            "s": "AUDCAD",
            "t": 1136073600,
            "p": 5,
            "o": 0.8529,
            "c": 0.8628,
            "h": 0.8826,
            "l": 0.8498
        },
        {
            "s": "AUDCAD",
            "t": 1133395200,
            "p": 5,
            "o": 0.8599,
            "c": 0.8519,
            "h": 0.8722,
            "l": 0.8466
        },
        {
            "s": "AUDCAD",
            "t": 1130803200,
            "p": 5,
            "o": 0.8836,
            "c": 0.8603,
            "h": 0.8837,
            "l": 0.8559
        },
        {
            "s": "AUDCAD",
            "t": 1128124800,
            "p": 5,
            "o": 0.8864,
            "c": 0.8837,
            "h": 0.8994,
            "l": 0.8772
        },
        {
            "s": "AUDCAD",
            "t": 1125532800,
            "p": 5,
            "o": 0.8965,
            "c": 0.8863,
            "h": 0.916,
            "l": 0.8822
        },
        {
            "s": "AUDCAD",
            "t": 1122854400,
            "p": 5,
            "o": 0.9347,
            "c": 0.8965,
            "h": 0.9357,
            "l": 0.8883
        },
        {
            "s": "AUDCAD",
            "t": 1120176000,
            "p": 5,
            "o": 0.9339,
            "c": 0.9282,
            "h": 0.9387,
            "l": 0.901
        },
        {
            "s": "AUDCAD",
            "t": 1117584000,
            "p": 5,
            "o": 0.9481,
            "c": 0.9488,
            "h": 0.9496,
            "l": 0.9462
        },
        {
            "s": "AUDCAD",
            "t": 1114905600,
            "p": 5,
            "o": 0.9553,
            "c": 0.9551,
            "h": 0.9562,
            "l": 0.9534
        }
    ]
}';
        $test_arr = (array)json_decode($str);
        $this->ajaxReturn($test_arr, 'JSON');
    }

    public function detail()
    {
        $str = '{
    "data": {
        "ask_tickvalue": 0,
        "bid_tickvalue": 0,
        "contract_size": 100000,
        "count": 0,
        "currency": "AUD",
        "description": "Australian Dollar   vs  Canadian Dollar",
        "digits": 5,
        "exemode": 2,
        "filter": 0,
        "filter_counter": 1,
        "filter_limit": 0,
        "filter_reserved": 0,
        "filter_smoothing": 0,
        "freez_level": null,
        "gtc_pendings": 1,
        "instant_max_volume": 0,
        "long_only": 0,
        "margin_currency": "AUD",
        "margin_divider": 1,
        "margin_hedged": 0,
        "margin_hedged_strong": 1,
        "margin_initial": 0,
        "margin_mode": 0,
        "maring_maintenance": null,
        "multiply": 100000,
        "point": 1E-05,
        "profit_mode": "0",
        "quotes_delay": 0,
        "realTime": null,
        "sessions": [
            {
                "day": 0,
                "quoteOpenCloseTime": [
                    "21:05-24:00",
                    "00:00-00:00",
                    "00:00-00:00"
                ],
                "quote_close1_hour": 24,
                "quote_close1_min": 0,
                "quote_close2_hour": 0,
                "quote_close2_min": 0,
                "quote_close3_hour": 0,
                "quote_close3_min": 0,
                "quote_open1_hour": 21,
                "quote_open1_min": 5,
                "quote_open2_hour": 0,
                "quote_open2_min": 0,
                "quote_open3_hour": 0,
                "quote_open3_min": 0,
                "tradeOpenCloseTime": [
                    "21:05-24:00",
                    "00:00-00:00",
                    "00:00-00:00"
                ],
                "trade_close1_hour": 24,
                "trade_close1_min": 0,
                "trade_close2_hour": 0,
                "trade_close2_min": 0,
                "trade_close3_hour": 0,
                "trade_close3_min": 0,
                "trade_open1_hour": 21,
                "trade_open1_min": 5,
                "trade_open2_hour": 0,
                "trade_open2_min": 0,
                "trade_open3_hour": 0,
                "trade_open3_min": 0
            },
            {
                "day": 1,
                "quoteOpenCloseTime": [
                    "00:00-21:00",
                    "21:05-24:00",
                    "00:00-00:00"
                ],
                "quote_close1_hour": 21,
                "quote_close1_min": 0,
                "quote_close2_hour": 24,
                "quote_close2_min": 0,
                "quote_close3_hour": 0,
                "quote_close3_min": 0,
                "quote_open1_hour": 0,
                "quote_open1_min": 0,
                "quote_open2_hour": 21,
                "quote_open2_min": 5,
                "quote_open3_hour": 0,
                "quote_open3_min": 0,
                "tradeOpenCloseTime": [
                    "00:00-21:00",
                    "21:05-24:00",
                    "00:00-00:00"
                ],
                "trade_close1_hour": 21,
                "trade_close1_min": 0,
                "trade_close2_hour": 24,
                "trade_close2_min": 0,
                "trade_close3_hour": 0,
                "trade_close3_min": 0,
                "trade_open1_hour": 0,
                "trade_open1_min": 0,
                "trade_open2_hour": 21,
                "trade_open2_min": 5,
                "trade_open3_hour": 0,
                "trade_open3_min": 0
            },
            {
                "day": 2,
                "quoteOpenCloseTime": [
                    "00:00-21:00",
                    "21:05-24:00",
                    "00:00-00:00"
                ],
                "quote_close1_hour": 21,
                "quote_close1_min": 0,
                "quote_close2_hour": 24,
                "quote_close2_min": 0,
                "quote_close3_hour": 0,
                "quote_close3_min": 0,
                "quote_open1_hour": 0,
                "quote_open1_min": 0,
                "quote_open2_hour": 21,
                "quote_open2_min": 5,
                "quote_open3_hour": 0,
                "quote_open3_min": 0,
                "tradeOpenCloseTime": [
                    "00:00-21:00",
                    "21:05-24:00",
                    "00:00-00:00"
                ],
                "trade_close1_hour": 21,
                "trade_close1_min": 0,
                "trade_close2_hour": 24,
                "trade_close2_min": 0,
                "trade_close3_hour": 0,
                "trade_close3_min": 0,
                "trade_open1_hour": 0,
                "trade_open1_min": 0,
                "trade_open2_hour": 21,
                "trade_open2_min": 5,
                "trade_open3_hour": 0,
                "trade_open3_min": 0
            },
            {
                "day": 3,
                "quoteOpenCloseTime": [
                    "00:00-21:00",
                    "21:05-24:00",
                    "00:00-00:00"
                ],
                "quote_close1_hour": 21,
                "quote_close1_min": 0,
                "quote_close2_hour": 24,
                "quote_close2_min": 0,
                "quote_close3_hour": 0,
                "quote_close3_min": 0,
                "quote_open1_hour": 0,
                "quote_open1_min": 0,
                "quote_open2_hour": 21,
                "quote_open2_min": 5,
                "quote_open3_hour": 0,
                "quote_open3_min": 0,
                "tradeOpenCloseTime": [
                    "00:00-21:00",
                    "21:05-24:00",
                    "00:00-00:00"
                ],
                "trade_close1_hour": 21,
                "trade_close1_min": 0,
                "trade_close2_hour": 24,
                "trade_close2_min": 0,
                "trade_close3_hour": 0,
                "trade_close3_min": 0,
                "trade_open1_hour": 0,
                "trade_open1_min": 0,
                "trade_open2_hour": 21,
                "trade_open2_min": 5,
                "trade_open3_hour": 0,
                "trade_open3_min": 0
            },
            {
                "day": 4,
                "quoteOpenCloseTime": [
                    "00:00-21:00",
                    "21:05-24:00",
                    "00:00-00:00"
                ],
                "quote_close1_hour": 21,
                "quote_close1_min": 0,
                "quote_close2_hour": 24,
                "quote_close2_min": 0,
                "quote_close3_hour": 0,
                "quote_close3_min": 0,
                "quote_open1_hour": 0,
                "quote_open1_min": 0,
                "quote_open2_hour": 21,
                "quote_open2_min": 5,
                "quote_open3_hour": 0,
                "quote_open3_min": 0,
                "tradeOpenCloseTime": [
                    "00:00-21:00",
                    "21:05-24:00",
                    "00:00-00:00"
                ],
                "trade_close1_hour": 21,
                "trade_close1_min": 0,
                "trade_close2_hour": 24,
                "trade_close2_min": 0,
                "trade_close3_hour": 0,
                "trade_close3_min": 0,
                "trade_open1_hour": 0,
                "trade_open1_min": 0,
                "trade_open2_hour": 21,
                "trade_open2_min": 5,
                "trade_open3_hour": 0,
                "trade_open3_min": 0
            },
            {
                "day": 5,
                "quoteOpenCloseTime": [
                    "00:00-21:00",
                    "00:00-00:00",
                    "00:00-00:00"
                ],
                "quote_close1_hour": 21,
                "quote_close1_min": 0,
                "quote_close2_hour": 0,
                "quote_close2_min": 0,
                "quote_close3_hour": 0,
                "quote_close3_min": 0,
                "quote_open1_hour": 0,
                "quote_open1_min": 0,
                "quote_open2_hour": 0,
                "quote_open2_min": 0,
                "quote_open3_hour": 0,
                "quote_open3_min": 0,
                "tradeOpenCloseTime": [
                    "00:00-21:00",
                    "00:00-00:00",
                    "00:00-00:00"
                ],
                "trade_close1_hour": 21,
                "trade_close1_min": 0,
                "trade_close2_hour": 0,
                "trade_close2_min": 0,
                "trade_close3_hour": 0,
                "trade_close3_min": 0,
                "trade_open1_hour": 0,
                "trade_open1_min": 0,
                "trade_open2_hour": 0,
                "trade_open2_min": 0,
                "trade_open3_hour": 0,
                "trade_open3_min": 0
            },
            {
                "day": 6,
                "quoteOpenCloseTime": [
                    "00:00-00:00",
                    "00:00-00:00",
                    "00:00-00:00"
                ],
                "quote_close1_hour": 0,
                "quote_close1_min": 0,
                "quote_close2_hour": 0,
                "quote_close2_min": 0,
                "quote_close3_hour": 0,
                "quote_close3_min": 0,
                "quote_open1_hour": 0,
                "quote_open1_min": 0,
                "quote_open2_hour": 0,
                "quote_open2_min": 0,
                "quote_open3_hour": 0,
                "quote_open3_min": 0,
                "tradeOpenCloseTime": [
                    "00:00-00:00",
                    "00:00-00:00",
                    "00:00-00:00"
                ],
                "trade_close1_hour": 0,
                "trade_close1_min": 0,
                "trade_close2_hour": 0,
                "trade_close2_min": 0,
                "trade_close3_hour": 0,
                "trade_close3_min": 0,
                "trade_open1_hour": 0,
                "trade_open1_min": 0,
                "trade_open2_hour": 0,
                "trade_open2_min": 0,
                "trade_open3_hour": 0,
                "trade_open3_min": 0
            }
        ],
        "source": "",
        "spread": 0,
        "spread_balance": 0,
        "stops_level": 50,
        "swap_enable": 1,
        "swap_long": -0.3672,
        "swap_openprice": 0,
        "swap_rollover3days": 3,
        "swap_short": -0.8112,
        "swap_type": 0,
        "symbol": "AUDCAD",
        "tick_size": 0,
        "tick_value": 0,
        "trade": 2,
        "tradeTime": {
            "endDay": 5,
            "endTime": "21:00",
            "startDay": 0,
            "startTime": "21:05"
        },
        "type": 6
    },
    "message": null,
    "result": 1
}';
        $test_arr = (array)json_decode($str);
        $this->ajaxReturn($test_arr, 'JSON');
    }



}
