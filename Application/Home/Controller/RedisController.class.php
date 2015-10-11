<?php
namespace Home\Controller;
use Think\Cache\Driver\Redis;
use Think\Controller;
use Think\Cache;
use Think\Log;
use Home\Service\RedisSetService;




class RedisController extends Controller{

    private $redisSer;

    public function __construct()
    {
        $this->redisSer = new RedisSetService();
    }

    public function  test()
    {
        $redis = new Redis();
       // $redis->connect('127.0.0.1',6379);
        $redis->set('test','hello world!');
        echo $redis->get("test");

    }

    public function testZSet()
    {
        $ret = $this->redisSer->ZSetAdd("zset", "100001", 235.01);
        if($ret == false)
        {
            echo "failed";
        }
        else
        {
            echo "succeed";
        }
        $obj = new \stdClass;
        $obj->bl = 1.201;
        $obj->sl = 1.112;
        $obj->tp = 1.301;
       /*
        $ret = $this->redisSer->ZSetAdd("zset", "100002", $obj);
        if($ret == false)
        {
            echo "failed";
        }
        else
        {
            echo "succeed";
        }
        */
    }

    public function testHSet()
    {
        $ret = $this->redisSer->HSetAdd("zhash", "100001", 235.01);
        if($ret == false)
        {
            echo "failed";
        }
        else
        {
            echo "succeed";
        }
        $obj = new \stdClass;
        $obj->bl = 1.201;
        $obj->sl = 1.112;
        $obj->tp = 1.301;
        $ret = $this->redisSer->HSetAdd("zhash", "100002", $obj);
        if($ret == false)
        {
            echo "failed";
        }
        else
        {
            echo "succeed";
        }
    }


}
