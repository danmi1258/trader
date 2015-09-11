<?php

namespace Home\Service;
use Think\Model;
use Think\Log;

/*类名：LogService
  类描述：打印本地日志记录在log文件中
*/
class UserService extends Model {

    Protected $autoCheckFields = false;


    /*********************************************************************
    function:JudgeAccountType 判读account的类型
    intput: account
    output: phone/email/other
    *********************************************************************/
    public function judgeAccountType($account)
    {
        $pattern = "/1[3458]{1}\d{9}$/";
        if(preg_match($pattern, $account))
        {
            return "phone";
        }
        if(preg_match("/\w+@(\w|\d)+\.\w{2,3}/i",$account))
        {
            return "email";
        }
        return "other";
    }

    public function getUserByAccount($account, $authType)
    {
        $Model = D('User');
        if(NULL == $Model){
            $this->LoggerPrint("Create User Model fail.");
            return NULL;
        }
        if ($authType == "phone"){
            $data = $Model->fetchSql(false)->where('mobilenum="'.$account.'"')->find();
            return $data;
        }else if($authType == "email"){
            $data = $Model->fetchSql(false)->where('email="'.$account.'"')->find();
            return $data;
        }
        return NULL;
    }



    public function addNewUser($data)
    {

        $Model = D('User');
        if(NULL == $Model){
            return false;
        }

        $user['mobilenum'] = is_null($data['mobilenum'])? "" : $data['mobilenum'];
        $user['email'] = is_null($data['email'])? "" : $data['email'];
        $user['authnum'] = $data['authnum'];
        $user['ischeck'] = $data['ischeck'];

        $result = $Model->add($user);
        if($result)
        {
            return true;
        }else{
            $this->LoggerPrint($Model->getError());
            return false;
        }
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

    public function updateUserByDBKey($autouserid, $data)
    {

        $Model = D('User');

        if(NULL == $Model)
        {
            $this->LoggerPrint('execute sql failed.');
            return false;
        }
        $Model->create($data);

        $iret =$Model->where('autouserid='.$data['autouserid'])->save();
        if(false == $iret)
        {
            return false;
        }
        return true;
    }



    public function isExistUserByName($petname)
    {
        $User = D('User');
        $data = $User->where('petname='.$petname)->find();
        if(NULL == $data){
            return false;
        }else{
            return true;
        }
    }

    public function isExistUserById($userid)
    {
        $User = D('User');
        $data = $User->where('userid='.$userid)->find();
        if(NULL == $data){
            return false;
        }else{
            return true;
        }
    }

}
