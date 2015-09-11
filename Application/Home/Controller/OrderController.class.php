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

        $order_para = $this->uiAdapterSer->parseRequestParaToOpenOrder($request_para);

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
        $this->orderSer->addOrder($order);

        $this->logerSer->logInfo("Open order success.");

        $result['message'] = "RET_OK"; $result['result'] = 1;
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


    /********************************************************************
    函数头：search_trade
    功能： 查询当前用户所挂单的情况(这个里面包括持仓单以及挂单两类)
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

        $reqUser = $this->userSer->getUserFromCookie(cookie('userInfo'));

        $orderlist = $this->orderSer->getOrdersDiffTime($reqUser['userId'], $timestart, $timeend);

        $ackOrdersList = new \stdClass;
        $ackOrdersList = $this->uiAdapterSer->parseResultToAckInOrdersSearch($orderlist);
        $result['message'] = "调用feederWork操作成功";  $result['result'] = "1";
        $output = $this->uiAdapterSer->parsePostMsgToOrderSearch($result, $ackOrdersList);
        $this->ajaxReturn($output);
        return;
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
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToHisOrderSearch($result, NULL);
            $this->ajaxReturn($output , 'JSON');
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

        $this->logerSer->logInfo("fromTime=".$fromTime. "toTime=".$toTime. "pageNo=".$pageNo. "pageSize=".$pageSize. "Opercmd=".$Opercmd. "key=".$key);

        $reqUser = $this->userSer->getUserFromCookie(cookie('userInfo'));

        $totalNum = $this->orderSer->getHistOrderCountByUser($reqUser['userId'], $fromTime, $toTime);

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

        $histOrders = $this->orderSer->getHistOrders($reqUser['userId'], $fromTime, $toTime, $rangFrom, $rangEnd);

        $result['current_page'] = $pageNo;
        $result['error_code'] = 0;
        $result['error_message'] = 'RET_OK';
        $result['record_total'] = $totalNum;
        $result['total_page'] = $pageNum;
        $result['message'] = "feedtrade success.";
        $result['result'] = 1;
        $output = $this->uiAdapterSer->parsePostMsgToHisOrderSearch($result, $histOrders);
        $this->ajaxReturn($output , 'JSON');
        return;
    }


}
