<?php
namespace Home\Controller;
use Think\Controller;
use \Think\Log ;
class ApiController extends Controller {
    public function auth(){
    	$account=I("post.account") ;
    	$pwd=I("post.password");
    	Log::record($account."".$pwd) ;
    
    	$ret=array("result"=>1, "data"=>"dd" ) ;
    	echo json_encode($ret) ;
    }
}