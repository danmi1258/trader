<?php
namespace Home\Controller;
use Think\Controller;
use Think\Log;

use Home\Service\LogService;
use Home\Service\UserService;

class UserController extends Controller {

    private $logerSer;
    private $userSer;
    private $operlogSer;
    private $uiAdapterSer;
    private $toolkitSer;

    public function __construct()
    {
        parent::__construct();
        $this->logerSer = D('Log', 'Service');
        $this->userSer = D('User', 'Service');
        $this->operlogSer = D('OperLog', 'Service');
        $this->uiAdapterSer = D('UIAdapter', 'Service');
        $this->toolkitSer = D('ToolKit', 'Service');
    }

    /****************************************************************
    函数名：register
    功能描述：用户注册操作
    备注: 对外接口  user/register
    *****************************************************************/
    public function register()
    {
        $result=array();
        $output=NULL;
        $registeruser=NULL;

    	if(false == IS_POST)
    	{
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            goto ERROR;
    	}

    	$request_payload = file_get_contents('php://input');
    	$request_para = (array)json_decode($request_payload);

        $registeruser = $this->uiAdapterSer->parseRequestParaToReg($request_para);
    	if($registeruser->password != $registeruser->rePassword)
    	{
            $this->logerSer->logError("Input password is not same.");
            $result['message'] = "两次密码输入不一致"; $result['result'] = 0;
    	    goto ERROR;
    	}

    	$authtype =  $this->userSer->JudgeAccountType($registeruser->account);
    	if($authtype == "other")
    	{
            $this->logerSer->logError("Check account type failed.");
    	    $result['message'] = "传递参数错误";  $result['result'] = 0;
    	    goto ERROR;
    	}
        if($authtype == "phone")
        {
            $this->logerSer->logError("Check account type failed.");
            $result['message'] = "当前系统暂不支持手机验证";  $result['result'] = 0;
            goto ERROR;
        }

    	$user = $this->userSer->getUserByAccount($registeruser->account, $authtype);
    	if (NULL == $user)
    	{
            $this->logerSer->logError("The User is not exist.");
            $result['message'] = "验证码错误"; $result['result'] = 0;
            goto ERROR;

    	}else if(NULL != $user && "1" == $user['ischeck'])
    	{
    	    //用户已经注册成功
            $this->logerSer->logError("The User is aleady exist.");
            $result['message'] = "用户已经注册成功，请直接登录。";   $result['result'] = 0;
            goto ERROR;
    	}

    	//正常注册流程
    	if($registeruser->captcha !=  $user['authnum'])
    	{
    	    //验证码错误
            $this->logerSer->logError("The captcha is not right.");
    	    $result['message'] = "验证码错误"; $result['result'] = 0;
    	    goto ERROR;
    	}

    	$user['password'] = $registeruser->password;
    	$user['petname'] = $registeruser->nickname;
    	$user['ischeck'] = 1;
        $user['avatar'] = "/trader/Public/userAvatar/0.jpg";
        $user['usertype'] = "注册用户";
        $user['userstatus'] = "审核中";

        /*初始化配额以及杠杆比例，以后写入配置文件*/
        $user['balance'] = 2000;
        $user['levenum'] = 100;


    	//写入数据库中  update
    	$iRet = $this->userSer->updateUserByDBKey($user['autouserid'], $user);
    	if(false == $iRet){
            $this->logerSer->logError("Update user info failed.");
            $result['message'] = "系统内部错误";   $result['result'] = 0;
            goto ERROR;
    	}

        $registeruser->userId = $user['userid'];
        $registeruser->userAvatar = $user['avatar'];

        $this->logerSer->logError("Register succeed.");
        $result['message'] = "注册成功"; $result['result'] = 1;
        $output = $this->uiAdapterSer->parsePostMsgToReg($result, $registeruser);
        $this->ajaxReturn($output , 'JSON');
        return;

ERROR:
        $output = $this->uiAdapterSer->parsePostMsgToReg($result, $registeruser);
        $this->ajaxReturn($output , 'JSON');
        return;
    }

    /****************************************************************
    函数名：auth
    功能描述：用户鉴权登陆处理函数 
    备注: 对外接口  user/auth
    *****************************************************************/
    public function auth()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "传递参数错误";  $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToAuth($result, NULL);
            $this->ajaxReturn($output, 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_para = (array)json_decode($request_payload);
        $authUser = $this->uiAdapterSer->parseRequestPara2Auth($request_para);

        $authtype = $this->userSer->judgeAccountType($authUser->account);
        if($authtype == "other")
        {
            $this->logerSer->logError("Check account type faile.");
            $result['message'] = "传递参数错误";  $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToAuth($result, NULL);
            $this->ajaxReturn($output, 'JSON');
            return;
        }

        $user = $this->userSer->getUserByAccount($authUser->account, $authtype);
        if(NULL == $user)
        {
            $this->logerSer->logError("The user is not exist.");
            $result['message'] = "用户不存在"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToAuth($result, NULL);
            $this->ajaxReturn($output, 'JSON');
            return ;
        }

        //TODO:这个地方先采用明文存储
        if($user['password'] !=  $authUser->password)
        {
            $this->logerSer->logError("The password is not right.");
            $result['message'] = "密码不正确"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToAuth($result, NULL);
            $this->ajaxReturn($output, 'JSON');
            return ;
        }

        if($user['usertype'] != "注册用户")
        {
            $this->logerSer->logError("The usertype is not register.");
            $result['message'] = "用户非注册用户"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToAuth($result, NULL);
            $this->ajaxReturn($output, 'JSON');
            return ;
        }

        if($user['userstatus'] != "审核通过")
        {
            $this->logerSer->logError("The password is not right.");
            $result['message'] = "用户审核中，请登录后台查看用户状态。"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToAuth($result, NULL);
            $this->ajaxReturn($output, 'JSON');
            return ;
        }

        //返回响应
        $this->logerSer->logInfo("The user auth success.");
        $this->logerSer->logInfo("image=". $user['avatar']);
        //根据user中的内容填充authuser中的内容
        $postUser = $this->uiAdapterSer->parseInnerUserToPostUser($user, $authUser);
        $result['message'] = "登录成功";  $result['result'] = 1;
        $output = $this->uiAdapterSer->parsePostMsgToAuth($result, $postUser);
        $this->ajaxReturn($output, 'JSON');
        return;
    }



    /****************************************************************
    函数名：passcode
    功能描述：生成验证码，添加到DB中
    备注: 对外接口  user/passcode
    *****************************************************************/
    public function passcode()
    {
    	if(false == IS_POST)
    	{
    	    $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
    	    $output = $this->uiAdapterSer->parsePostMsgToPasscode($result, NULL, NULL);
            $this->ajaxReturn($output , 'JSON');
    	    return;
    	}

    	$request_payload = file_get_contents('php://input');
    	$request_para = (array)json_decode($request_payload);

    	$account = $request_para['account'];
    	if($account == '')
    	{
            $this->logerSer->logError("The account in Req msg is NULL.");
    	    $result['message'] = "传递参数为空"; $result['result'] = 0;
    	    $output = $this->uiAdapterSer->parsePostMsgToPasscode($result, NULL, NULL);
            $this->ajaxReturn($output , 'JSON');
    	    return;
    	}

    	$authtype =  $this->userSer->JudgeAccountType($account);
    	if($authtype == "other" || $authtype=="phone")
    	{
            $this->logerSer->logError("Check account type failed.");
    	    $result['result'] = 0; $result['message'] = "传递参数错误";
            if($authtype=="phone") $result['message'] = "当前系统不支持手机验证，请使用邮箱注册。";
    	    $output = $this->uiAdapterSer->parsePostMsgToPasscode($result, NULL, NULL);
            $this->ajaxReturn($output , 'JSON');
    	    return;
    	}

        $this->logerSer->logInfo("The authtype is $authtype.");

    	$passcode = "";
    	$user = $this->userSer->getUserByAccount($account, $authtype);
    	if (NULL == $user)
    	{
            $this->logerSer->logInfo("The user is not exist.");
    	    $passcode = $this->toolkitSer->makeRandomPasscode();
    	    if($authtype == "phone")
    	    {
        		$newuser['mobilenum']=$account;
        		$newuser['email']="";
    	    }else{
        		$newuser['mobilenum']="";
        		$newuser['email']=$account;
    	    }
    	    $newuser['authnum']=$passcode;
    	    $newuser['ischeck']="0";
            $this->logerSer->logInfo("The newUser passcode is $passcode.");

    	    $ret = $this->toolkitSer->sendAuthNumToUser($authtype, $account, $passcode);
    	    if(false == $ret)
    	    {
                $this->logerSer->logError("Send AuthNum To User failed.");
                $result['message'] = "邮件发送失败，请检查邮件服务器或者邮箱是否正常。"; $result['result'] = 0;
                $output = $this->uiAdapterSer->parsePostMsgToPasscode($result, NULL, NULL);
                $this->ajaxReturn($output , 'JSON');
                return;
    	    }
            else
            {
                $this->logerSer->logError("Send AuthNum To User succeed.");
            }

    	    $iret = $this->userSer->addNewUser($newuser);
    	    if($iret == false)
    	    {
        		$this->logerSer->logError("Add new user to db failed.");
        		$result['message'] = "System Inner Error."; $result['result'] = 0;
        		$output = $this->uiAdapterSer->parsePostMsgToPasscode($result, NULL, NULL);
                $this->ajaxReturn($output , 'JSON');
        		return;
    	    }

            $this->logerSer->logError("Oper passcode for new user success.");
    	    $result['message'] = "验证码已经发送"; $result['result'] = 1;
            $output = $this->uiAdapterSer->parsePostMsgToPasscode($result, $newuser, $authtype);
            $this->ajaxReturn($output , 'JSON');
    	    return;

    	}else{
            $this->logerSer->logInfo("The user is exist.");

    	    if($user['ischeck'] == "1")
    	    {
                $this->logerSer->logInfo("The user is already exist.");
        		$result['message'] = "用户已经存在"; $result['result'] = "0";
        		$output = $this->uiAdapterSer->parsePostMsgToPasscode($result, $newuser, $authtype);
                $this->ajaxReturn($output , 'JSON');
    	    }else if($user['ischeck'] == "0")
    	    {
                $this->logerSer->logInfo("The user is checking，retry send new authnum.");
                if(authtype == "phone")
                {
                    $account = $user['mobilenum'];
                }else{
                    $account = $user['email'];
                }
                $ret = $this->toolkitSer->sendAuthNumToUser($authtype, $account, $user['authnum']);
                if(false == $ret)
                {
                    $result['message'] = "邮件发送失败，请检查邮件服务器或者邮箱是否正常。"; $result['result'] = 0;
                    $output = $this->uiAdapterSer->parsePostMsgToPasscode($result, NULL, NULL);
                    $this->ajaxReturn($output , 'JSON');
                    return;
                }
                else
                {
                    $this->logerSer->logError("Send AuthNum To User succeed.");
                }

        		$result['message']="用户已经注册中，请查收验证码。";	$result['result'] ="1";
        		$output = $this->uiAdapterSer->parsePostMsgToPasscode($result, $newuser, $authtype);
                $this->ajaxReturn($output , 'JSON');
    	    }
    	    return;
    	}
    }



    /****************************************************************
    函数名：info_update
    功能描述：更新用户名称以及照片
    备注: 对外接口  user/info_update
    *****************************************************************/
    public  function info_update()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToUpdate($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }
        $request_payload = file_get_contents('php://input');
        $request_update = (array)json_decode($request_payload);

        $userAvatar = $request_update['userAvatar'];
        $nickName = $request_update['nickname'];

        $request_user = $this->userSer->getUserFromCookie(cookie('userInfo'));
        if(NULL == $request_user)
        {
            $this->logerSer->logError("The user is fault.");
            $result['message'] = "用户信息异常"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToUpdate($result, NULL, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }
        /* 写入头像并返回图片所在的url地址 */
        $renewImage = substr($userAvatar, strlen('data:image/bmp;base64,'), strlen($userAvatar));
        $img = base64_decode($renewImage);
        $imgStoragePath = "Public/userAvatar/".$request_user['userId']. ".jpg";
        unlink($imgStoragePath);
        unlink($imgStoragePath."!web");
        file_put_contents($imgStoragePath, $img);
        file_put_contents($imgStoragePath."!web", $img);
        $imageUrlPath= __ROOT__ . "/".$imgStoragePath;

        $currentUser = $this->userSer->getUserFromDBByUserId($request_user['userId']);
        $currentUser['avatar'] = $imageUrlPath;

        if($nickName != NULL)
        {
            $currentUser['petname'] = $nickName;
        }

        $this->userSer->updateUserByDBKey($currentUser['autouserid'], $currentUser);

        $this->logerSer->logError("Update info success.");
        $result['message'] = "用户的信息更新成功"; $result['result'] = 1;
        $output = $this->uiAdapterSer->parsePostMsgToUpdate($result, $currentUser);
        $this->ajaxReturn($output, 'JSON');

        return;
    }

    /****************************************************************
    函数名：password_update
    功能描述：更新用户密码
    备注: 对外接口  user/password_update
    *****************************************************************/
    public function password_update()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToUpdate($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_update = (array)json_decode($request_payload);

        $request_update['oldPassword'];  $request_update['password'];

        $request_user = $this->userSer->getUserFromCookie(cookie('userInfo'));
        $currentUser = $this->userSer->getUserFromDBByUserId($request_user['userId']);

        if($currentUser['password'] != $request_update['oldPassword'])
        {
            $result['message'] = "原始密码输入错误";  $result['result'] = 0;
        }
        else
        {
            $currentUser['password'] = $request_update['password'];
            $this->userSer->updateUserByDBKey($currentUser['autouserid'], $currentUser);
            $result['message'] = "用户的信息更新成功";  $result['result'] = 1;
        }

        $output = $this->uiAdapterSer->parsePostMsgToUpdate($result, $currentUser);
        $this->ajaxReturn($output, 'JSON');
        return;
        //$this->redirect("/Home/Login/index");
    }

    /****************************************************************
    函数名：email_update
    功能描述：更新用户邮箱
    备注: 对外接口  user/email_update
    *****************************************************************/
    public  function  email_update()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToUpdate($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_update = (array)json_decode($request_payload);

        $checksum = $request_update['captcha'];
        $email = $request_update['email'];

        $request_user = $this->userSer->getUserFromCookie(cookie('userInfo'));
        $currentUser = $this->userSer->getUserFromDBByUserId($request_user['userId']);

        $output = new \stdClass;

        if($email == $currentUser['reemail'] and
            $checksum == $currentUser['reemailchecksum'])
        {
            $currentUser['email'] = $email;
            $currentUser['reemail'] = "";
            $currentUser['reemailchecksum'] = "";
            $this->userSer->updateUserByDBKey($currentUser['autouserid'], $currentUser);
            $result['message'] = "更新用户邮箱成功";  $result['result'] = 1;
        }
        else
        {
            $result['message'] = "验证码过期或输入错误";  $result['result'] = 0;
        }

        $output = $this->uiAdapterSer->parsePostMsgToUpdate($result, $currentUser);
        $this->ajaxReturn($output, 'JSON');
        return;

    }

    /****************************************************************
    函数名：phone_update
    功能描述：修改手机号的API
    备注: 对外接口  user/phone_update
    *****************************************************************/
    public  function  phone_update()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parsePostMsgToUpdate($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }
        $request_payload = file_get_contents('php://input');
        $request_update = (array)json_decode($request_payload);

        $checksum = $request_update['captcha'];
        $phone = $request_update['phone'];

        $request_user = $this->userSer->getUserFromCookie(cookie('userInfo'));
        $currentUser = $this->userSer->getUserFromDBByUserId($request_user['userId']);

        $output = new \stdClass;

        if($phone == $currentUser['rephone'] and
            $checksum == $currentUser['rephonechecksum'])
        {
            $currentUser['mobilenum'] = $phone;
            $currentUser['rephone'] = "";
            $currentUser['rephonechecksum'] = "";
            $this->userSer->updateUserByDBKey($currentUser['autouserid'], $currentUser);
            $result['message'] = "更新用户手机成功";  $result['result'] = 1;
        }
        else
        {
            $result['message'] = "验证码过期或输入错误";  $result['result'] = 0;
        }

        $output = $this->uiAdapterSer->parsePostMsgToUpdate($result, $currentUser);
        $this->ajaxReturn($output, 'JSON');
        return;
    }


    /****************************************************************
    函数名：user_update_verify
    功能描述：修改手机号获取验证码
    备注: 对外接口  user/user_update_verify
    *****************************************************************/
    public  function  user_update_verify()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToUpdateVerify($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_update = (array)json_decode($request_payload);

        $account = $request_update['account'];

        $checksum = $this->toolkitSer->makeRandomPasscode();
        $authType =  $this->userSer->JudgeAccountType($account);

        $iret = $this->toolkitSer->SendAuthNumToUser($authType, $account, $checksum);
        if(false == $iret)
        {
            $this->logerSer->logError("Send authnum failed($authType).");
            $result['message'] = "邮件发送失败，请检查邮件服务器或者邮箱是否正常。";  $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToUpdateVerify($result, $account);
            $this->ajaxReturn($output);
            return;
        }
        $request_user = $this->userSer->getUserFromCookie(cookie('userInfo'));
        $currentUser = $this->userSer->getUserFromDBByUserId($request_user['userId']);

        $this->logerSer->logInfo("authtype is $authType");

        if($authType == "phone")
        {
            $currentUser['rephone'] = $account;
            $currentUser['rephonechecksum'] = $checksum;
        }
        else if($authType == "email")
        {
            $currentUser['reemail'] = $account;
            $currentUser['reemailchecksum'] = $checksum;
        }

        $this->userSer->updateUserByDBKey($currentUser['autouserid'], $currentUser);

        $result['message'] = "验证码已发送，请注意查收";  $result['result'] = 1;
        $output = $this->uiAdapterSer->parseMsgObjToUpdateVerify($result, $account);
        $this->ajaxReturn($output);
        return;
    }


    /****************************************************************
    函数名：user_update_verify
    功能描述：修改图片验证码
    备注: 对外接口  user/verification
    http://document.thinkphp.cn/manual_3_2.html#verify
    *****************************************************************/
    public function verification()
    {
        if(false == IS_GET)
        {
            $this->logerSer->logError("Message Type failed.");
            return;
        }
        $randomkey = $_GET['randomKey'];
        //生成的验证码信息会保存到session中
        $config = array(
            'length' => 4, // 验证码位数
        );
        $Verify = new \Think\Verify($config);
        $Verify->codeSet = '0123456789';
        $Verify->entry();
        return;
    }

    // 检测输入的验证码是否正确，$code为用户输入的验证码字符串
    public function check_verify($code){
        $verify = new \Think\Verify();
        return $verify->check($code);
    }

    /****************************************************************
    函数名：forget_passcode
    功能描述：忘记密码的情况下，获取校验码
    备注: 对外接口  user/user_update_verify
    *****************************************************************/
    public function  forget_passcode()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToForgetPasscode($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_para = (array)json_decode($request_payload);

        $request_obj = $this->uiAdapterSer->parseRequstParaToForgetPasscode($request_para);
        $this->logerSer->logInfo("The verification is ".$request_obj->verification);

        $iret = $this->check_verify($request_obj->verification);
        if($iret == false)
        {
            $this->logerSer->logError("The verification is not right.");
            $result['message'] = "识别码过期或输入错误";  $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToForgetPasscode($result, $request_obj);
            $this->ajaxReturn($output , 'JSON');
            return;
        }
        $this->logerSer->logInfo("The verification is right.");

        $authtype =  $this->userSer->JudgeAccountType($request_obj->account);
        if($authtype == "other" || $authtype == "phone")
        {
            $this->logerSer->logError("Check account type failed.");
            $result['message'] = "传递参数错误"; $result['result'] = 0;
            if($authtype=="phone")  $result['message'] = "当前系统不支持手机验证，请使用邮箱验证。";
            $output = $this->uiAdapterSer->parseMsgObjToForgetPasscode($result, $request_obj);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $this->logerSer->logInfo("The authtype is $authtype.");

        $passcode = "";
        $user = $this->userSer->getUserByAccount($request_obj->account, $authtype);
        if (NULL == $user)
        {
            $this->logerSer->logError("Check account info failed.");
            $result['message'] = "用户不存在"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToForgetPasscode($result, $request_obj);
            $this->ajaxReturn($output , 'JSON');
            return;
        }
        $passcode = $this->toolkitSer->makeRandomPasscode();
        $ret = $this->toolkitSer->sendAuthNumToUser($authtype, $request_obj->account, $passcode);
        if(false == $ret)
        {
            $this->logerSer->logError("Send AuthNum To User failed.");
        }
        else
        {
            $this->logerSer->logError("Send AuthNum To User succeed.");
        }

        $user['repasswordchecksum'] = $request_obj->verification. $passcode;
        $this->userSer->updateUserByDBKey($user['autouserid'], $user);

        $this->logerSer->logError("Get passcode for reset password succeed.");
        $result['message'] = "验证码发送成功"; $result['result'] = 1;
        $output = $this->uiAdapterSer->parseMsgObjToForgetPasscode($result, $request_obj);
        $this->ajaxReturn($output , 'JSON');
        return;
    }

    /****************************************************************
    函数名：preverify_modify_password
    功能描述：重置密码之前对校验码进行验证
    备注: 对外接口  usr/preverify_modify_password
    *****************************************************************/
    public function  preverify_modify_password()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToVerifyForgetPasscode($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_para = (array)json_decode($request_payload);

        $request_obj = $this->uiAdapterSer->parseRequstParaToVerifyForgetPasscode($request_para);

        $authtype =  $this->userSer->JudgeAccountType($request_obj->account);
        if($authtype == "other")
        {
            $this->logerSer->logError("Check account type failed.");
            $result['message'] = "传递参数错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToVerifyForgetPasscode($result, $request_obj);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $this->logerSer->logInfo("The authtype is $authtype.");

        $user = $this->userSer->getUserByAccount($request_obj->account, $authtype);
        if (NULL == $user)
        {
            $this->logerSer->logError("Check account info failed.");
            $result['message'] = "用户不存在"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToVerifyForgetPasscode($result, $request_obj);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $checksum = $request_obj->verification.$request_obj->captcha;
        if($user['repasswordchecksum'] != $checksum)
        {
            $this->logerSer->logError("The verify data is failed.");
            $result['message'] = "验证码过期或者错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToVerifyForgetPasscode($result, $request_obj);
            $this->ajaxReturn($output , 'JSON');
            return;
        }
        else
        {
            $this->logerSer->logError("The verfiy data is right.");
        }

        $result['message'] = "用户校验成功"; $result['result'] = 1;
        $output = $this->uiAdapterSer->parseMsgObjToVerifyForgetPasscode($result, $request_obj);
        $this->ajaxReturn($output , 'JSON');
        return;
    }

    /****************************************************************
    函数名：user_update_verify
    功能描述：重置密码的过程，这个地方要保证注册的时候，手机号以及邮件的一致性
    备注: 对外接口  user/user_update_verify
    *****************************************************************/
    public function renew_password()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToResetPasscode($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_para = (array)json_decode($request_payload);

        $account = $request_para['account'];
        $newPassword = $request_para['password'];

        $authtype =  $this->userSer->JudgeAccountType($account);
        if($authtype == "other")
        {
            $this->logerSer->logError("Check account type failed.");
            $result['message'] = "传递参数错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToResetPasscode($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $this->logerSer->logInfo("The authtype is $authtype.");

        $user = $this->userSer->getUserByAccount($account, $authtype);
        if (NULL == $user)
        {
            $this->logerSer->logError("Check account info failed.");
            $result['message'] = "用户不存在"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToResetPasscode($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        if($user['repasswordchecksum'] == "" || $user['repasswordchecksum'] == NULL)
        {
            $this->logerSer->logError("Check account info failed.");
            $result['message'] = "校验码超期"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToResetPasscode($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $user['password'] = $newPassword;
        $user['repasswordchecksum'] = "";
        $iret = $this->userSer->updateUserByDBKey($user['autouserid'], $user);
        if(false == $iret)
        {
            $this->logerSer->logError("Check account info failed.");
            $result['message'] = "校验码超期"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToResetPasscode($result, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $result['message'] = "修改密码成功"; $result['result'] = 1;
        $output = $this->uiAdapterSer->parseMsgObjToResetPasscode($result, NULL);
        $this->ajaxReturn($output , 'JSON');
        return;
    }

    /**
     * 定期刷新用户的信息，更新周期为10min = 60s
     * @return [type] [description]
     * 对外接口:user/user_renewal
     */
    public function user_renewal()
    {
        if(false == IS_POST)
        {
            $this->logerSer->logError("Message Type failed.");
            $result['message'] = "消息类型错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToUserRenewal($result, NULL, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $request_payload = file_get_contents('php://input');
        $request_para = (array)json_decode($request_payload);

        $account = $request_para['tenantId'];
        $newPassword = $request_para['account'];
        $expiredAt = $request_para['expiredAt'];
        $apiKey = $request_para['apiKey'];
        $newExpire = $request_para['newExpire'];

        $authtype =  $this->userSer->JudgeAccountType($account);
        if($authtype == "other")
        {
            $this->logerSer->logError("Check account type failed.");
            $result['message'] = "传递参数错误"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToUserRenewal($result, NULL, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $this->logerSer->logInfo("The authtype is $authtype.");

        $user = $this->userSer->getUserByAccount($account, $authtype);
        if (NULL == $user)
        {
            $this->logerSer->logError("Check account info failed.");
            $result['message'] = "更新认证信息失败"; $result['result'] = 0;
            $output = $this->uiAdapterSer->parseMsgObjToUserRenewal($result, NULL, NULL);
            $this->ajaxReturn($output , 'JSON');
            return;
        }

        $result['message'] = "更新认证信息成功"; $result['result'] = 1;
        $output = $this->uiAdapterSer->parseMsgObjToUserRenewal($result, $user, $request_para);
        $this->ajaxReturn($output , 'JSON');
        return;
    }



}
