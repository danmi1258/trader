<?php
namespace Home\Controller ;
use Think\Controller;
use \Think\Log ;
Vendor('Thrift.ClassLoader.ThriftClassLoader','','.php') ;
Vendor('Thrift','','.php') ;

use Thrift\ClassLoader\ThriftClassLoader;



$GEN_DIR = realpath(dirname(__FILE__));
$loader = new ThriftClassLoader();
$loader->registerNamespace('Thrift', VENDOR_PATH);
$loader->registerDefinition('Thrift', VENDOR_PATH);
$loader->register();

	
use Thrift\Protocol\TBinaryProtocol;
use Thrift\Transport\TSocket;
use Thrift\Transport\THttpClient;
use Thrift\Transport\TBufferedTransport;
use Thrift\Exception\TException;
use Thrift ;



class DataController extends Controller {
	private $client ;

	public function _initialize(){
		$socket = new TSocket('10.21.24.74', 9091);
    	$transport = new TBufferedTransport($socket, 1024, 1024);
    	$protocol = new TBinaryProtocol($transport);
    	$transport->open();
    	$this->client = new \Thrift\MT4WebServiceClient($protocol);
    	

	}



    public function quote_history($symbol="EURUSD",$period="4"){

    	$this->client->testSayHi() ;
    	
    	$ret = array("result"=>1,"data"=>array()) ;
    	echo json_encode($ret) ;
    }
}