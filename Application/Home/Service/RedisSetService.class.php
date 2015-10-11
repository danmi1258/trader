<?php
namespace Home\Service;
use Think\Cache\Driver\Redis;
use Think\Cache;
use Think\Log;




class RedisSetService extends Cache {

    private $logerSer;
    /**
     * 架构函数
     * @param array $options 缓存参数
     * @access public
     */
    public function __construct($options=array()) {
        if ( !extension_loaded('redis') ) {
            E(L('_NOT_SUPPORT_').':redis');
        }
        $options = array_merge(array (
            'host'          => C('REDIS_HOST') ? : '127.0.0.1',
            'port'          => C('REDIS_PORT') ? : 6379,
            'timeout'       => C('DATA_CACHE_TIMEOUT') ? : false,
            'persistent'    => false,
        ),$options);

        $this->options =  $options;
        $this->options['expire'] =  isset($options['expire'])?  $options['expire']  :   C('DATA_CACHE_TIME');
        $this->options['prefix'] =  isset($options['prefix'])?  $options['prefix']  :   C('DATA_CACHE_PREFIX');
        $this->options['length'] =  isset($options['length'])?  $options['length']  :   0;
        $func = $options['persistent'] ? 'pconnect' : 'connect';
        $this->handler  = new \Redis;
        $options['timeout'] === false ?
            $this->handler->$func($options['host'], $options['port']) :
            $this->handler->$func($options['host'], $options['port'], $options['timeout']);

        $this->logerSer = D('Log', 'Service');
    }

    /**
     * 写入缓存
     * @access public
     * @param string $zsetName 缓存有序集合名称
     * @param mixed $value  存储数据
     * @param string $key  orderID
     * @return boolean
     */
    public function ZSetAdd($zsetName, $key, $score) {
        N('cache_write',1);
        if($zsetName == NULL || $key == NULL || $score == NULL)
        {
            return false;
        }
        //对数组/对象数据进行缓存处理，保证数据完整性
        $key  =  (is_object($key) || is_array($key)) ? json_encode($key) : $key;
        $result = $this->handler->zAdd($zsetName, $score, $key);
        if($result != 1) {
            $this->logerSer->logError("redis:add zset $zsetName $key $score failed.");
            return false;
        }
        $this->logerSer->logInfo("redis:add zset $zsetName $key $score success.");
        return true;
    }

    public function ZSetDel($zsetName, $key) {
        N('cache_write',1);
        if($zsetName == NULL || $key == NULL )
        {
            return false;
        }
        //对数组/对象数据进行缓存处理，保证数据完整性
        $result = $this->handler->zDelete($zsetName, $key);
        if($result != 1) {
            $this->logerSer->logError("redis:del zset $zsetName $key failed.");
            return false;
        }
        $this->logerSer->logInfo("redis:del zset $zsetName $key success.");
        return true;
    }


    public function HSetAdd($hashName, $key , $value)
    {
        N('cache_write',1);
        if($hashName == NULL || $key == NULL || $value == NULL)
        {
            return false;
        }
        //对数组/对象数据进行缓存处理，保证数据完整性
        $value  =  (is_object($value) || is_array($value)) ? json_encode($value) : $value;
        $result = $this->handler->hSet($hashName, $key, $value);
        if($result != 1) {
            $this->logerSer->logError("redis:add hset $hashName $key $value failed.");
            return false;
        }
        $this->logerSer->logInfo("redis:add hset $hashName $key $value success.");
        return true;
    }

    public function HSetDel($hashName, $key)
    {
        N('cache_write',1);
        if($hashName == NULL || $key == NULL)
        {
            return false;
        }
        $result = $this->handler->hDel($hashName, $key);
        if($result != 1) {
             $this->logerSer->logError("redis:del hset $hashName $key failed.");
            return false;
        }
         $this->logerSer->logInfo("redis:del hset $hashName $key success.");
        return true;
    }



}
