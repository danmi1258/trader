<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Trader Work</title>
<link rel="stylesheet" type="text/css" href="/trader/Public/css/index.css" />
<link rel="stylesheet" type="text/css" href="/trader/Public/css/black.css" />
<LINK href="/favicon.ico" type="image/x-icon" rel=icon>
<LINK href="/favicon.ico" type="image/x-icon" rel="shortcut icon">
<script type="text/javascript" src="/trader/Public/build/react.js"></script>
<script type="text/javascript" src="/trader/Public/build/JSXTransformer.js"></script>
<script type="text/javascript" src="/trader/Public/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="/trader/Public/js/entrance.js"></script>
</head>
<body>
<script>
  var WEBSOCKET_URL = 'wss://beta.traderwork.com/api/v1/channel';
var ws = new WebSocket("wss://beta.traderwork.com/api/v1/channel");
ws.onopen =
function(){ws.send('{"bwTenant":"16","tenantId":"0","serviceId":"2","login":"2089045570","symbols":["EURUSD","USDJPY","GBPUSD","USDCHF","USDCAD","XAUUSD","UKOUSD","USOUSD","XAGUSD","EURUSD","GBPUSD","AUDUSD","NZDUSD","USDCHF","USDCAD","USDJPY","USDJPY"],"account":"875011170@qq.com","apiKey":"66585ba82ccc41810cee60114c52c3e4d2d3d43c","expiredAt":1438763072}');console.log("open"); };
ws.onmessage = function(evt){console.log(evt);};
ws.onclose = function(evt){console.log("WebSocketClosed!");};
ws.onerror = function(evt){console.log("WebSocketError");};
var _hmt = _hmt || [];
(function () {
 var hm = document.createElement("script");
 hm.src =
 "hm.baidu.com/hm.js?3e8ad816c68f2f465deee1a4168ad880";
 var s =
 document.getElementsByTagName("script")[0];
 s.parentNode.insertBefore(hm, s);
 })();
</script>
<script type="text/javascript" src="/trader/Public/js/common.js"></script>
<script type="text/javascript" src="/trader/Public/js/homepage.js"></script>
</body>
</html>