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
        $socket->setRecvTimeout(8000000); 
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
        $timeGap=0 ;
        $arrayLength=1 ;
        switch($period){
            case 0:
                $timeGap=60* $arrayLength;
                $period = \Thrift\MT4PERIOD_TYPE::P_PERIOD_M1 ;
                break ;
            case 1:
                $timeGap=300* $arrayLength;
                $period = \Thrift\MT4PERIOD_TYPE::P_PERIOD_M5 ;
                break ;
            case 2:
                $timeGap=900* $arrayLength ;
                $period = \Thrift\MT4PERIOD_TYPE::P_PERIOD_M15 ;
                break ;
            case 3:
                $timeGap=1800* $arrayLength;
                $period = \Thrift\MT4PERIOD_TYPE::P_PERIOD_M30 ;
                break ;
            case 4:
                $timeGap=3600* $arrayLength;
                $period = \Thrift\MT4PERIOD_TYPE::P_PERIOD_H1 ;
                break ;
            case 5:
                $timeGap=14400* $arrayLength;
                $period = \Thrift\MT4PERIOD_TYPE::P_PERIOD_H4 ;
                break ;
            case 6:
                //$timeGap=86400* $arrayLength;
                $timeGap=43200 *  $arrayLength;
                $period = \Thrift\MT4PERIOD_TYPE::P_PERIOD_D1 ;
                break ;
            case 7:
                $timeGap=604800* $arrayLength;
                $period = \Thrift\MT4PERIOD_TYPE::P_PERIOD_W1 ;
                break ;
            case 8:
                $timeGap=2592000* $arrayLength;
                $period = \Thrift\MT4PERIOD_TYPE::P_PERIOD_MN1 ;
                break ;
        }
        $ci = new \Thrift\MT4ChartInfo() ;
        $ci->symbol= $symbol;
        $ci->start= 1439020319;
        $ci->_end= $ci->start + 86400 ;
        //$ci->period=  \Thrift\MT4PERIOD_TYPE::P_PERIOD_M1;
        $ci->period = $period ;
        $ci->mode= \Thrift\MT4CHART_TYPE::C_CHART_RANGE_IN;
        //$this->client->testSayHi() ;
        dump($ci);
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
                    unset($v->vol) ;
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