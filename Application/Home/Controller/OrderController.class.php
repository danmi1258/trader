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
    private $operLogSer;

    public function __construct()
    {
        parent::__construct();
        $this->logerSer = D('Log', 'Service');
        $this->userSer = D('User', 'Service');
        $this->operlogSer = D('OperLog', 'Service');
        $this->uiAdapterSer = D('UIAdapter', 'Service');
        $this->toolkitSer = D('ToolKit', 'Service');
        $this->orderSer = D('Order', 'Service');
        $this->operLogSer = D('OperLog', 'Service');
    }



    protected function LoggerPrint($message, $level = 'ERROR')
    {
        Log::write($message, $level);
        Log::save();
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
        $request_ip = $this->toolkitSer->getClientIP();
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
        $order = $this->orderSer->addOrderToTrade($currentUser['userid'], $order_para);
        if(NULL == $order)
        {
            $result['message'] = "创建订单流程失败"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToOrderOpen($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $this->logerSer->logInfo("Open order success.");
        $operLog = sprintf("order #%d open(%d) %s in price %s.", $order['tradeid'], $order['tradetype'], $order['goodname'], $order['operstartprice']);
        $this->operLogSer->recordOperLog($request_user['userId'], $request_ip, $operLog);

        $result['message'] = "RET_OK"; $result['result'] = 1;
        $output = $this->uiAdapterSer->parsePostMsgToOrderOpen($result, $order);
        $this->ajaxReturn($output , 'JSON');
        return;
    }

    /****************************************************************
    函数名：close
    功能描述：对外接口，订单取消
    备注: 对外接口  order/close
    *****************************************************************/
    public function close()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToOrderClose($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_ip = $this->toolkitSer->getClientIP();
        $request_orders = $this->uiAdapterSer->parseRequestParaToCloseOrder($request_payload);
        $request_user = $this->userSer->getUserFromCookie(cookie('userInfo'));
        $isSuccess = true;
        $errorArray = array();
        foreach($request_orders as $order)
        {
            $errorObj = new \stdClass;
            $iret = $this->orderSer->closeOrderToOrder($request_user['userId'], $order);
            if(false == $iret)
            {
                $isSuccess = false;
                $errorObj->error_code = 1;
                $errorObj->error_message = "RET_ERROR";
                $errorObj->order = $order['order'];
            }
            else
            {
                $errorObj->error_code = 0;
                $errorObj->error_message = "RET_OK";
                $errorObj->order = $order['order'];
                $operLog = sprintf("order #%d close %s in price %s.", $order['order'], $order['symbol'], $order['price']);
                $this->operLogSer->recordOperLog($request_user['userId'], $request_ip, $operLog);
            }
            $errorArray[] = $errorObj;
        }

        $this->logerSer->logInfo("Close order end.");
        if(false == $isSuccess)
        {
            $this->logerSer->logError("Close order failed.");
            $result['message'] = "系统内部错误"; $result['result'] = 0;
        }
        else
        {
            $this->logerSer->logError("Close order succeed.");
            $result['message'] = "关闭单成功"; $result['result'] = 1;
        }

        $output = $this->uiAdapterSer->parsePostMsgToOrderClose($result, $errorArray);
        $this->ajaxReturn($output , 'JSON');
        return;
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


        $timestart = $this->toolkitSer->formatTime($request_para['from']);
        $timeend = $this->toolkitSer->formatTime($request_para['to']);

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

        $fromTime = $this->toolkitSer->formatTime($request_para['from']);
        $toTime = $this->toolkitSer->formatTime($request_para['to']);
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

    /****************************************************************
    函数名：delete
    功能描述：挂单的删除，订单取消
    备注: 对外接口  order/delete
    *****************************************************************/
    public function delete()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToOrderClose($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_ip = $this->toolkitSer->getClientIP();
        $request_orders = $this->uiAdapterSer->parseRequestParaToCloseOrder($request_payload);
        $request_user = $this->userSer->getUserFromCookie(cookie('userInfo'));
        $isSuccess = true;
        $errorArray = array();
        foreach($request_orders as $order)
        {
            $errorObj = new \stdClass;
            $iret = $this->orderSer->deleteOrderToOrder($request_user['userId'], $order);
            if(false == $iret)
            {
                $isSuccess = false;
                $errorObj->error_code = 1;
                $errorObj->error_message = "RET_ERROR";
                $errorObj->order = $order['order'];
            }
            else
            {
                $errorObj->error_code = 0;
                $errorObj->error_message = "RET_OK";
                $errorObj->order = $order['order'];
                $operLog = sprintf("order #%d  %s delete.", $order['order'], $order['symbol']);
                $this->operLogSer->recordOperLog($request_user['userId'], $request_ip, $operLog);
            }
            $errorArray[] = $errorObj;
        }

        $this->logerSer->logInfo("Delete order end.");
        if(false == $isSuccess)
        {
            $this->logerSer->logError("Delete order failed.");
            $result['message'] = "系统内部错误"; $result['result'] = 0;
        }
        else
        {
            $this->logerSer->logError("Delete order succeed.");
            $result['message'] = "删除单成功"; $result['result'] = 1;
        }

        $output = $this->uiAdapterSer->parsePostMsgToOrderClose($result, $errorArray);
        $this->ajaxReturn($output , 'JSON');
        return;
    }

}
