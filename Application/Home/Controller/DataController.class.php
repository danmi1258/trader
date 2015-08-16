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
	private static $client =null;

    private static function _loadClient(){
        $socket = new TSocket('localhost', 9091);
      
        $socket->setSendTimeout(20000);
        $socket->setRecvTimeout(40000); 
        $transport = new TBufferedTransport($socket);
        $protocol = new TBinaryProtocol($transport);
        $transport->open();
   
        self::$client = new \Thrift\MT4WebServiceClient($protocol);
        $socket->setDebug(TRUE);
    }

	public function _initialize(){
        if(! self::$client ){
            self::_loadClient() ;
        }
	}



    public function quote_history($symbol="EURUSD",$period="4"){
        $ci = new \Thrift\MT4ChartInfo() ;
        $ci->symbol= $symbol;
        $ci->_end= 1439010319;
        $ci->start= $ci->_end - 162400 ;
        //$ci->period=  \Thrift\MT4PERIOD_TYPE::P_PERIOD_M1;
        $ci->period = $period ;
        $ci->mode= \Thrift\MT4CHART_TYPE::C_CHART_RANGE_IN;

        //$this->client->testSayHi() ;
        try {

                $ret = array("result"=>1,"data"=>array()) ;
                $qh=self::$client->getHistoryChartData($ci) ;
                echo count($qh);
                foreach($qh as $k => $v){
                    $v->s = $symbol ;
                    $v->t = $v->ctm ;
                    unset($v->ctm) ;
                    $v->o = $v->open ;
                    unset($v->open);
                    $v->c = $v->close ;
                    unset($v->close);
                    $v->h = $v->high ;
                    unset($v->high);
                    $v->l = $v->low ;
                    unset($v->low);

                    array_push($ret['data'],$v) ;

                }
                echo json_encode($ret) ;
        } catch (Exception $e) {
                echo json_decode(array("result"=>-1,"message"=>"".$e)) ;
        }
    }

    public function symbol_detail($symbol="EURUSD"){

        $ret=self::$client->symbolDetail($symbol);
        echo json_encode($ret);




    }
}