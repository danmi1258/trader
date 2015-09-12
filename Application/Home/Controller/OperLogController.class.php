<?php
namespace Home\Controller;
use Think\Controller;
use Think\Log;

class OperLogController extends Controller {


    private $logerSer;
    private $userSer;
    private $uiAdapterSer;
    private $toolkitSer;
    private $orderSer;

    public function __construct()
    {
        parent::__construct();
        $this->logerSer = D('Log', 'Service');
        $this->userSer = D('User', 'Service');
        $this->uiAdapterSer = D('UIAdapter', 'Service');
        $this->toolkitSer = D('ToolKit', 'Service');
        $this->orderSer = D('Order', 'Service');
    }


    /****************************************************************
    函数名：search
    功能描述：对外接口，搜索贸易的信息
    备注: 对外接口
    *****************************************************************/
    public function search()
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

        $timestart = date("Y/m/d G:i:s", $request_para['from']);
        $timeend = date("Y/m/d G:i:s", $request_para['to']);
        $ipKey = $request_para['key'];
        $pageNo = $request_para['pageNo'];
        $pageSize = 20;
        $request_user = $this->userSer->getUserFromCookie(cookie('userInfo'));

        $totalNum = $this->getOperLogCountByUser($request_user['userId'], $ipKey, $timestart, $timeend);
        $pageNum = (int)($totalNum/$pageSize);
        if(($totalNum - $pageSize*$pageNum) > 0)
        {
            $pageNum = $pageNum + 1;
        }
        $pageRealNum = $totalNum%$pageSize;
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

        $this->logerSer->LogInfo("PageNo=".$pageNo." rangFrom=".$rangFrom." rangEnd=".$rangEnd);

        $logs = $this->getOperLogForSearch($request_user['userId'], $ipKey, $timestart, $timeend, $rangFrom, $rangEnd);

        $data = new \stdClass;
        $data->maxPage = $pageNum;
        $data->offset = $pageSize * $pageNum;
        $data->pageSize = 20;
        $data->total = $totalNum;
        $data->twTenant = null;
        $data->list = $this->uiAdapterSer->parseAckLogsToSearch($logs);
        $result['message'] = null;  $result['result'] = 1;
        $output = $this->uiAdapterSer->parsePostMsgToSearchOperLog($result, $data);
        $this->ajaxReturn($output);
        return;
    }

    /****************************************************************
    函数名：record save
    功能描述：接口，实现添加订单的
    备注: 接口  order/open
    *****************************************************************/
    public function  recordOperLog($userid, $ipaddr, $context)
    {
        $log['operdate'] = $this->uiAdapterSer->getSysTime();
        $log['operid'] = $this->operlogSer->getNextOperLogId();
        $log['userid'] = $userid;
        $log['ipaddr'] = $ipaddr;
        $log['opercontent'] = $context;

        return $this->operlogSer->addOperLog($log);
    }



}
