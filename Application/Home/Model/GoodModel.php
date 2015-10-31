<?php

namespace Home\Model;
use Think\Model;
use Think\Log;

class GoodModel extends Model {

    protected $tablePrefix = 'tbl_';
    protected $tableName = 'good';
    protected $fields = array('autogoodid', 'goodid',
			'goodname', 'goodtype', 'swaptype', 'digits',
			'point','contractsize');
    protected $pk = array('autogoodid');



}
