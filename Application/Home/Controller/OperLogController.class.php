<?php
namespace Home\Controller;
use Think\Controller;
use Think\Log;

class OperLogController extends Controller {

    protected function LoggerPrint($message, $level = 'ERROR')
    {
        Log::write($message, $level);
        Log::save();
    }

    public function getUserFromCookie($cookie_user)
    {
        if(NULL == $cookie_user)
        {
            return NULL;
        }
        $user =  (array)json_decode($cookie_user);
        return $user;
    }

    public function getOperLogCountByUser($userid, $ipKey, $rangStart, $rangEnd)
    {
        $Model = D('OperLog');

        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $condition['userid'] = $userid;
        if($ipKey != NULL and $ipKey != "")
        {
            $condition['ipaddr'] = $ipKey;
        }
        $result = $Model->where($condition)->limit($rangStart,$rangEnd)->count();
        return $result;
    }

    public function  getOperLogForPost($userid, $ipKey, $timeStart, $timeEnd, $rangStart, $rangEnd)
    {
        $Model = D('OperLog');

        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $condition['userid'] = $userid;
        $condition['operdate']  >= $timeStart;
        $condition['_string']  = "operdate >= '$timeStart' and operdate <= '$timeEnd'";
        if($ipKey != NULL and $ipKey != "")
        {
            $condition['ipaddr'] = $ipKey;
        }
        $result =$Model->where($condition)->limit($rangStart,$rangEnd)->select();
        return $result;
    }

    public function parseLogsForAck($logs)
    {
        $orders = array();
        foreach($logs as $log)
        {
            $data = new \stdClass;
            $data->bwTenant = NULL;
            $data->createTime = strtotime($log['operdate']);
            $data->from = NULL;
            $data->id = $log['userid'];
            $data->ip = $log['ipaddr'];
            $data->key = NULL;
            $data->log = $log['opercontent'];
            $data->logType = "";
            $data->login = "";
            $data->modifyTime = NULL;
            $data->offset = 0;
            $data->pageNo = NULL;
            $data->pageSize = 20;
            $data->twTenant = NULL;
            $data->userId = $log['userid'];
            $orders[] = $data;
        }
        return $orders;
    }

    //用户注册操作
    public function search()
    {

    	if(false == IS_POST)
    	{
    	    //暂时返回页面跳转，最终的时候全部封装成json格式的结构
    	    $this->LoggerPrint("Fail Message Type.");
            $result['message'] = "系统内部错误";
            $result['result'] = 0;
    	    $this->AckPostMsgToRegister($result, NULL);
    	    return;
    	}

    	//Parse data in web_view to controller.
    	$request_payload = file_get_contents('php://input');
    	$request_para = (array)json_decode($request_payload);

        $timestart = date("Y/m/d G:i:s", $request_para['from']);
        $timeend = date("Y/m/d G:i:s", $request_para['to']);
        $ipKey = $request_para['key'];
        $pageNo = $request_para['pageNo'];
        $pageSize = 20;
        $request_user = $this->getUserFromCookie(cookie('userInfo'));

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
        $this->LoggerPrint("PageNo=".$pageNo."rangFrom=".$rangFrom."rangEnd=".$rangEnd);

        $logs = $this->getOperLogForPost($request_user['userId'], $ipKey, $timestart, $timeend, $rangFrom, $rangEnd);

        $data = new \stdClass;
        $data->maxPage = $pageNum;
        $data->offset = $pageSize * $pageNum;
        $data->pageSize = 20;
        $data->total = $totalNum;
        $data->twTenant = null;

        $data->list = $this->parseLogsForAck($logs);
        $result['message'] = null;
        $result['result'] = 1;
        $this->AckPostMsgToSearchOperLog($result, $data);
        return;
    }

    public function AckPostMsgToSearchOperLog($result, $data)
    {
        $output = new \stdClass;
        $output->data = $data;
        $output->message = $result['message'];
        $output->result = $result['result'];
        $this->ajaxReturn($output);

    }

    public function getSysTime()
    {
        date_default_timezone_set('Asia/Chongqing'); //系统时间差8小时问题
        $date = date("Y/m/d H:i:s");
        return $date;
    }
    public function getNextOperLogId()
    {
        $Model = M('OperLog');
        if(NULL == $Model){
            $this->LoggerPrint("Create Order Model fail.");
            return NULL;
        }
        $max_tradeId = $Model->fetchSql(false)->max('operid');
        return ($max_tradeId + 1);
    }

    public function saveLogToDB($log)
    {
        $Model = M('Order');
        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $Model->create($log);

        $iret =$Model->save();
        if(false == $iret)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $this->LoggerPrint('execute sql succeed.');
        return true;
    }

    public function  recordOperLog($userid, $ipaddr, $context)
    {
        $log['operdate'] = $this->getSysTime();
        $log['operid'] = $this->getNextOperLogId();
        $log['userid'] = $userid;
        $log['ipaddr'] = $ipaddr;
        $log['opercontent'] = $context;

        return $this->saveLogToDB($log);
    }



}
