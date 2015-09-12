<?php

namespace Home\Service;
use Think\Model;
use Think\Log;

/****************************************************************
类名：OperLogService
类描述：记录所有操作日志信息
备注:
*****************************************************************/
class OperLogService extends Model {

    Protected $autoCheckFields = false;

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

    public function  getOperLogForSearch($userid, $ipKey, $timeStart, $timeEnd, $rangStart, $rangEnd)
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

    public function addOperLog($log)
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
        return true;
    }


}
