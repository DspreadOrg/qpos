// 蓝牙设备提供的服务的 UUIDs

// var MPOS_SERVICE = "0000180a-0000-1000-8000-00805f9b34fb";
// var MPOS_VALUE = "00002a29-0000-1000-8000-00805f9b34fb";
var MPOS_SERVICE = "49535343-fe7d-4ae5-8fa9-9fafd205e455";
var MPOS_VALUE = "49535343-8841-43f4-a8d4-ecbe34729bb3";
var notify_uuid = "49535343-1e4d-4bd9-ba61-23c647249616";

var MPOS_DATA_Ready = false;
var MPOS_Notify_State;


//设备抽象
var Connected_Device;
//连接状态
var Connected_Server;
var Connected = false;
//服务是否存在
var MPOS_SERVICE_FLAG = false;


var mService = new QPOSService();
function QPOSServiceListenerImpl() { }
var qPOSServiceListenerImpl = new QPOSServiceListenerImpl();
mService.initListener(qPOSServiceListenerImpl);
mOnResult = new QPOSAnalyResult(qPOSServiceListenerImpl);

QPOSServiceListenerImpl.prototype.onQposInfoResult = function (deviceInfo) {
    console.log("onQposInfoResult" + deviceInfo);
}
QPOSServiceListenerImpl.prototype.onQposIdResult = function (deviceId) {
    console.log("onQposIdResult" + deviceId);
}
QPOSServiceListenerImpl.prototype.onRequestSelectEmvApp = function (hashtable) {
    console.log("onRequestSelectEmvApp" + hashtable);
    mService.selectEmvApp(0);
}
QPOSServiceListenerImpl.prototype.onRequestDisplay = function (msg) {
    console.log("onRequestDisplay" + msg);
}
QPOSServiceListenerImpl.prototype.onRequestTransactionResult = function (msg) {
    console.log("onRequestTransactionResult" + msg);
}
QPOSServiceListenerImpl.prototype.onError = function (msg) {
    console.log("onError" + msg);
}
QPOSServiceListenerImpl.prototype.onEmvICCExceptionData = function (msg) {
    console.log("onEmvICCExceptionData" + msg);
}
QPOSServiceListenerImpl.prototype.onDoTradeResult = function (msg,msg1) {
    console.log("onDoTradeResult" + msg);
    console.log("onDoTradeResult" + msg1);
    //getPin(1, 0, 6, "please input pin", "6230202010566462", "", 20);
}

QPOSServiceListenerImpl.prototype.onRequestOnlineProcess = function (msg) {
    var str = "8A023030";//Currently the default value,
    mService.sendOnlineProcessResult(str);
}

QPOSServiceListenerImpl.prototype.onRequestBatchData = function (iccData) {
    console.log("onRequestBatchData" + iccData);
} 

QPOSServiceListenerImpl.prototype.onReturnReversalData = function (iccData) {
    console.log("onReturnReversalData" + iccData);
}

QPOSServiceListenerImpl.prototype.onReturnGetEMVListResult = function (aidString) {
    console.log("onReturnGetEMVListResult(aidString)" + aidString);
}
QPOSServiceListenerImpl.prototype.onReturnUpdateEMVResult = function (flag) {
    console.log("onReturnUpdateEMVResult(true)" + flag);
}
QPOSServiceListenerImpl.prototype.onReturnUpdateEMVRIDResult = function (flag) {
    console.log("onReturnUpdateEMVRIDResult(false)" + flag);
}
QPOSServiceListenerImpl.prototype.onReturnCustomConfigResult = function (flag) {
    console.log("onReturnCustomConfigResult(true)" + flag);
}

//连接设备或断开连接
function DiscoveOrDisConnect() {
    if (Connected) {
        Connected_Device.gatt.disconnect();
        console.log("===>用户断开了连接<===")
        UpdateUI();
    }
    else {
        DiscoverDevice();
        UpdateUI();
    }
}

function start(){

    if(Connected){
        setAmount("1111", "", "0156", TransactionType.GOODS);
        mService.doTrade(0,20);
        // getQPosInfo();
    }else{
        DiscoverDevice();
        UpdateUI();
    }
}

//发现蓝牙设备
function DiscoverDevice() {
    //过滤出我们需要的蓝牙设备
    //过滤器
    var options = {
        filters: [{ namePrefix: 'MPOS' }],
        optionalServices: [MPOS_SERVICE]
    };

    navigator.bluetooth.requestDevice(options)
        .then(device => {
            console.log('> 设备名称: ' + device.name);
            console.log('> 设备Id: ' + device.id);
            console.log('> 是否已连接到其它设备: ' + device.gatt.connected);
            //连接到该设备
            Connected_Device = device;
            ConnectDevice();
        })
        .catch(error => {
            console.log("=> Exception: " + error);
        });
}

//连接到蓝牙设备
function ConnectDevice() {
    Connected_Device.gatt.connect().then(
        function (server) {
            console.log("> 连接到GATT服务器：" + server.device.id);
            console.log("> 连接成功=" + server.connected);
            //更新UI的信息
            Connected = true;
            UpdateUI();
            //将Server赋给全局变量（已连接的GATT服务器
            Connected_Server = server;

            //监听连接断开事件
            Connected_Device.addEventListener('gattserverdisconnected', function () {
                Connected = false;
                UpdateUI();
            });
            //发现GATT服务器的服务
            DiscoverService();
        },
        function (error) {
            console.log("=> Exception:无法连接 - " + error);
            Connected = false;
            UpdateUI();
        });
}

//发现蓝牙设备的服务和特性
function DiscoverService() {
    console.log("> 正在搜索可用的服务......\n> 服务器：" + Connected_Server);

    //已发现的服务
    let ServicesDiscovered = 0;

    Connected_Server.getPrimaryServices()
        .then(Services => {

            //服务总数
            let ServiceSum = Services.length;
            console.log("> 发现服务数量：" + ServiceSum);

            Services.forEach(service => {
                if (service.uuid == MPOS_SERVICE) {
                    MPOS_SERVICE_FLAG = true;
                    console.log("=> MPOS SERvice uuid: " + service.uuid);
                }

                console.log("> 获取到服务的UUID：" + service.uuid);

                service.getCharacteristics().then(Characteristics => {
                    console.log("> 服务: " + service.uuid);
                    ServicesDiscovered++;

                    //已发现的特性
                    let CharacteristicsDiscovered = 0;
                    //所有的特性
                    let CharacteristicsSum = Characteristics.length;

                    Characteristics.forEach(Characteristic => {

                        CharacteristicsDiscovered++;
                        console.log('>> 特征值(UUID): ' + Characteristic.uuid);
                        if(Characteristic.uuid == MPOS_VALUE){
                            writeChar = Characteristic;
                            MPOS_DATA_Ready = true;
                            new webBluetooth(mOnResult,writeChar);
                        }else if(Characteristic.uuid == notify_uuid){
                            MPOS_Notify_State = Characteristic;
                            registNotify(MPOS_Notify_State);
                        }
                        if (ServicesDiscovered == ServiceSum && CharacteristicsDiscovered == CharacteristicsSum) {
                            console.log("===>服务搜索完成<===");
                            //更新UI的信息
                            UpdateUI();
                            //读取设备型号
                            ReadModelStr();
                        }
                    });

                });
            });
        });
}

//读取设备型号字符串
function ReadModelStr() {
    writeChar.readValue()
        .then(value => {
            data = new Uint8Array(value.buffer);
            console.log("=> DEVICE DATA: " + data);
            let Str = new TextDecoder("utf-8").decode(data);
            //document.getElementById("UI_DeviceType").innerHTML = "Connect Type：" + Str;
        })
        .catch(error => {
            console.log("=> 出现错误: " + error);
            return;
        });
}

//更新UI
function UpdateUI() {
    //是否已连接
    if (Connected) {
        document.getElementById("UI_Connected").innerHTML = "Connect Status：Connected";
        document.getElementById("MBtn").innerHTML = "Disconnect";
        document.getElementById("UI_DeviceType").innerHTML = "Device Type："+Connected_Device.name
    }
    else {
        document.getElementById("UI_Connected").innerHTML = "Connect Status：Disconnect";
        document.getElementById("UI_DeviceType").innerHTML = "Device Type：Unknow"
        document.getElementById("MBtn").innerHTML = "Connect";
        MPOS_DATA_Ready = false;
    }

    //设备类型是否就绪
    if (MPOS_DATA_Ready) {
        console.log("Can do start now");
    }
    else {
        console.log("Please check your device now");
    }
}

//设置要显示的字符串
function SetString(){
    let str=document.getElementById("input_str").value;
    let arr= new Array();

    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    arr.push(10);

    let Buff=new Uint8Array(arr);
    UART_State.writeValue(Buff.buffer);
}


//InitUI();
UpdateUI();