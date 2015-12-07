<?php
header("Content-type: text/html; charset=utf-8");
$ID = $_GET["rowNum"];
$str =  '{
        "data": [{
            "id":"1",
            "name": "这里是视屏名",
            "imgUrl": "",
            "typeName": "视屏",
            "type": "1",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"2",
            "name": "这里是视屏名1",
            "imgUrl": "",
            "typeName": "音屏",
            "type": "2",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"3",
            "name": "这里是视屏名2",
            "imgUrl": "",
            "typeName": "图片",
            "type": "3",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{ 
            "id":"4",
            "name": "这里是视屏名3",
            "imgUrl": "",
            "typeName": "文稿",
            "type": "4",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"5",
            "name": "这里是视屏名4",
            "imgUrl": "",
            "typeName": "包",
            "type": "5",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"6",
            "name": "这里是视屏名5",
            "imgUrl": "",
            "typeName": "图片",
            "type": "1",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"7",
            "name": "这里是视屏名6",
            "imgUrl": "",
            "typeName": "视屏",
            "type": "1",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"8",
            "name": "这里是视屏名7",
            "imgUrl": "",
            "typeName": "视屏",
            "type": "1",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"9",
            "name": "这里是视屏名8",
            "imgUrl": "",
            "typeName": "视屏",
            "type": "1",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"10",
            "name": "这里是视屏名9",
            "imgUrl": "",
            "typeName": "视屏",
            "type": "1",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"11",
            "name": "这里是视屏名10",
            "imgUrl": "",
            "typeName": "视屏",
            "type": "1",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"12",
            "name": "这里是视屏名11",
            "imgUrl": "",
            "typeName": "视屏",
            "type": "1",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        },{
            "id":"13",
            "name": "这里是视屏名12",
            "imgUrl": "",
            "typeName": "视屏",
            "type": "1",
            "status": "已审核",
            "time": "2014年4月20日 14:20:20",
            "operator":"admin"
        }],
        "totalPages": "20",
        "totalRecords": "300",
        "repeatitems": 4,
        "id": "id"
}';

$arr = json_decode($str,true);
$newarr = array_splice($arr['data'],0,$ID);
$arr['data'] = $newarr;
echo json_encode($arr);