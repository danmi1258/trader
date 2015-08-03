<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Trader Work</title>
<load href="/trader/Public/css/index.css">
<load href="/trader/Public/css/black.css">
<LINK href="/favicon.ico" type="image/x-icon" rel=icon>
<LINK href="/favicon.ico" type="image/x-icon" rel="shortcut icon">
<load href='/trader/Public/build/react.js'>
<load href="/trader/Public/build/JSXTransformer.js">
<load href="/trader/Public/js/jquery-1.11.3.min.js">
</head>
<body>
<script>
  var WEBSOCKET_URL = 'wss://beta.traderwork.com/api/v1/channel';
var ws = new WebSocket("wss://beta.traderwork.com/api/v1/channel");
ws.onopen = function(){ws.send("Test!");console.log("open"); };
ws.onmessage = function(evt){console.log(evt);ws.close();};
ws.onclose = function(evt){console.log("WebSocketClosed!");};
ws.onerror = function(evt){console.log("WebSocketError");};
</script>
<load href='/trader/Public/js/common.js'>
<load href='/trader/Public/js/homepage.js'>
</body>
</html>