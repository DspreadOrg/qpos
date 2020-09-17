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

var trasactionData = document.getElementById("displayText");

var mService = new QPOSService();
function QPOSServiceListenerImpl() {}
var qPOSServiceListenerImpl = new QPOSServiceListenerImpl();
mService.initListener(qPOSServiceListenerImpl);
mOnResult = new QPOSAnalyResult(qPOSServiceListenerImpl);

QPOSServiceListenerImpl.prototype.onQposInfoResult = function (deviceInfo) {
    console.log("onQposInfoResult:" + deviceInfo);
    var str = "";
    for(var key in deviceInfo){
        str += key + ": " +deviceInfo[key]+"\r";
    }
    trasactionData.innerText = "onQposInfoResult:" + "\r" + str;
}
QPOSServiceListenerImpl.prototype.onQposIdResult = function (deviceId) {
    console.log("onQposIdResult" + deviceId);
    var str = "";
    for(var key in deviceId){
        str += key + ": " +deviceId[key]+"\r";
    }
    trasactionData.innerText = "onQposIdResult:" + "\r" + str;
}
QPOSServiceListenerImpl.prototype.onRequestSelectEmvApp = function (hashtable) {
    console.log("onRequestSelectEmvApp" + hashtable);
    mService.selectEmvApp(0);
}

QPOSServiceListenerImpl.prototype.onRequestDisplay = function (msg) {
    console.log("onRequestDisplay" + msg);
    trasactionData.innerText = "onRequestDisplay:" + msg;
}
QPOSServiceListenerImpl.prototype.onRequestWaitingUser = function (msg) {
    console.log("onRequestWaitingUser" + msg);
    trasactionData.innerText = "Please insert/swipe/tap card now.";
}

QPOSServiceListenerImpl.prototype.onRequestTransactionResult = function (msg) {
    console.log("onRequestTransactionResult" + msg);
    alert("onRequestTransactionResult "+msg);
}
QPOSServiceListenerImpl.prototype.onError = function (msg) {
    console.log("onError" + msg);
}
QPOSServiceListenerImpl.prototype.onEmvICCExceptionData = function (msg) {
    console.log("onEmvICCExceptionData" + msg);
    trasactionData.innerText = "onEmvICCExceptionData:" + msg;
}
QPOSServiceListenerImpl.prototype.onLcdShowCustomDisplay = function(msg){
    console.log("onLcdShowCustomDisplay" + msg);
}

QPOSServiceListenerImpl.prototype.onReturnDoInputCustomStr = function(msg,name){
    console.log("onReturnDoInputCustomStr: " + msg);
    console.log(name);
}

QPOSServiceListenerImpl.prototype.onDoTradeResult = function (msg,msg1) {
    console.log("onDoTradeResult" + msg);
    console.log("onDoTradeResult" + msg1);
    if (msg=="ICC") {
        trasactionData.innerText = "onDoTradeResult: " + msg;
    }else if(msg=="MCR"){
        var track1 = msg1[0].toUpperCase();
        var track2 = msg1[1].toUpperCase();
        var track3 = msg1[2].toUpperCase();
        var fomatid = msg1[3];
        var cardNum = msg1[4];
        var expiredData = msg1[5];
        var serviceCode = msg1[6];
        var serviceCode1 = msg1[7];
        var pinBlock = msg1[8].toUpperCase();
        var trackksn = msg1[9].toUpperCase();
        var pinksn = msg1[10].toUpperCase();
        trasactionData.innerText = "onDoTradeResult: " + msg + "\r" +
                                    "track1: " + track1 + "\r" +
                                    "track2: " + track2 + "\r" +
                                    "track3: " + track3 + "\r" +
                                    "fomatid: " + fomatid + "\r" +
                                    "cardNum: " + cardNum + "\r" +
                                    "expiredData: " + expiredData + "\r" +
                                    "serviceCode: " + serviceCode + "\r" +
                                    "pinBlock: " + pinBlock + "\r" +
                                    "pinksn: " + pinksn + "\r" +
                                    "trackksn: " + trackksn + "\r";
    }else if (msg=="NFC_ONLINE") {
        var track1 = msg1[0].toUpperCase();
        var track2 = msg1[1].toUpperCase();
        var track3 = msg1[2].toUpperCase();
        var fomatid = msg1[3];
        var cardNum = msg1[4];
        var expiredData = msg1[5];
        var serviceCode = msg1[6];
        var serviceCode1 = msg1[7];
        var pinBlock = msg1[8].toUpperCase();
        var trackksn = msg1[9].toUpperCase();
        var pinksn = msg1[10].toUpperCase();
        trasactionData.innerText = "onDoTradeResult: " + msg + "\r" +
                                    "track1: " +  track1 + "\r" +
                                    "track2: " +  track2 + "\r" +
                                    "track3: " +  track3 + "\r" +
                                    "fomatid: " + fomatid + "\r" +
                                    "cardNum: " + cardNum + "\r" +
                                    "expiredData: " + expiredData + "\r" +
                                    "serviceCode: " + serviceCode + "\r" +
                                    "pinBlock: " + pinBlock + "\r" +
                                    "pinksn: " + pinksn + "\r" +
                                    "trackksn: " + trackksn + "\r";

        mService.getNFCBatchData(function onSuccess(nfcBatchData) {
            trasactionData.innerText = "NFCBatchData: " + "\r" + nfcBatchData.toUpperCase();
        } , function onError(error){
            console.log(error);
        });
        
    }else if (msg=="NFC_OFFLINE") {
        trasactionData.innerText = "onDoTradeResult: " + msg + "\r" + msg1;
    }else if (msg=="NFC_DECLINED") {
        trasactionData.innerText = "onDoTradeResult: " + msg + "\r" + msg1;
    }else if (msg=="TRY_ANOTHER_INTERFACE") {
        trasactionData.innerText = "onDoTradeResult: " + msg;
    }else if (msg=="BAD_SWIPE") {
        trasactionData.innerText = "onDoTradeResult: " + msg;
    }else if (msg=="NONE") {
        trasactionData.innerText = "onDoTradeResult: " + msg;
    }else if (msg=="NOT_ICC") {
        trasactionData.innerText = "onDoTradeResult: " + msg;
    }else if (msg=="NO_RESPONSE") {
        trasactionData.innerText = "onDoTradeResult: " + msg;
    }else if (msg=="NO_UPDATE_WORK_KEY") {
        trasactionData.innerText = "onDoTradeResult: " + msg;
    }
  
}

QPOSServiceListenerImpl.prototype.onRequestOnlineProcess = function (msg) {
    var str = "8A023030";//Currently the default value,
    mService.sendOnlineProcessResult(str);
    trasactionData.innerText = "onRequestOnlineProcess:"+"\r" + msg;
}

QPOSServiceListenerImpl.prototype.onRequestBatchData = function (iccData) {
    console.log("onRequestBatchData" + iccData);
    trasactionData.innerText = "onRequestBatchData:" +"\r"+ iccData;
} 

QPOSServiceListenerImpl.prototype.onReturnReversalData = function (iccData) {
    console.log("onReturnReversalData" + iccData);
    trasactionData.innerText = "onReturnReversalData:" +"\r"+ iccData;
}

QPOSServiceListenerImpl.prototype.onReturnGetEMVListResult = function (aidString) {
    console.log("onReturnGetEMVListResult(aidString)" + aidString);
    trasactionData.innerText = "onReturnGetEMVListResult: " + aidString;
}
QPOSServiceListenerImpl.prototype.onReturnUpdateEMVResult = function (flag) {
    console.log("onReturnUpdateEMVResult: " + flag);
    if (flag) {
       trasactionData.innerText = "onReturnUpdateEMVResult: Success"; 
    }else{
       trasactionData.innerText = "onReturnUpdateEMVResult: Fail";
    }
}
QPOSServiceListenerImpl.prototype.onReturnUpdateEMVRIDResult = function (flag) {
    console.log("onReturnUpdateEMVRIDResult: " + flag);
    if (flag) {
       trasactionData.innerText = "onReturnUpdateEMVRIDResult: Success"; 
    }else{
       trasactionData.innerText = "onReturnUpdateEMVRIDResult: Fail";
    }
}
QPOSServiceListenerImpl.prototype.onReturnCustomConfigResult = function (flag) {
    console.log("onReturnCustomConfigResult: " + flag);
    if (flag) {
       trasactionData.innerText = "onReturnCustomConfigResult: Success"; 
    }else{
       trasactionData.innerText = "onReturnCustomConfigResult: Fail";
    } 
}
QPOSServiceListenerImpl.prototype.onReturnSetMasterKeyResult = function (flag) {
    console.log("onReturnSetMasterKeyResult: " + flag);
    if (flag) {
       trasactionData.innerText = "onReturnSetMasterKeyResult: Success"; 
    }else{
       trasactionData.innerText = "onReturnSetMasterKeyResult: Fail";
    } 
}
QPOSServiceListenerImpl.prototype.onRequestUpdateWorkKeyResult = function (flag) {
    console.log("onRequestUpdateWorkKeyResult: " + flag);
    if (flag) {
       trasactionData.innerText = "onRequestUpdateWorkKeyResult: Success"; 
    }else{
       trasactionData.innerText = "onRequestUpdateWorkKeyResult: Fail";
    } 
}
QPOSServiceListenerImpl.prototype.onSearchMifareCardResult = function (value) {
    console.log("onSearchMifareCardResult: " + value);
    
    var status = value.status;
    var cardType = value.cardType;
    var ATQA = value.ATQA;
    var SAK = value.SAK;
    var cardUidLen = value.cardUidLen;
    var cardUid = value.cardUid;
    var cardAtsLen = value.cardAtsLen;
    var cardAts = value.cardAts;
    console.log(status+" "+cardType+" "+ATQA+" "+SAK+" "+cardUid+" "+cardAts);  
}

QPOSServiceListenerImpl.prototype.onFinishMifareCardResult = function (flag) {
    console.log("onFinishMifareCardResult: " + flag);
}

QPOSServiceListenerImpl.prototype.onReturnGetPinResult = function (value) {
    console.log("onReturnGetPinResult: " + value);
}

QPOSServiceListenerImpl.prototype.onRequestSetPin = function () {
    console.log("onRequestSetPin: ");
    // mService.sendPin("1234");
    dialog();
}

QPOSServiceListenerImpl.prototype.onReturnUpdateIPEKResult = function (flag) {
    console.log("onReturnUpdateIPEKResult: " + flag);
    if (flag) {
       trasactionData.innerText = "onReturnUpdateIPEKResult: Success"; 
    }else{
       trasactionData.innerText = "onReturnUpdateIPEKResult: Fail";
    } 
}

function dialog(){
  var str = prompt("Please input your pin","123456");
  if(str){
    console.log("dialog = "+str);
    mService.sendPin(str);
  }
}

//连接设备或断开连接
function DiscoveOrDisConnect() {
    if (Connected) {
        Connected_Device.gatt.disconnect();
        console.log("===>用户断开了连接<===")
        UpdateUI();
    }else {
        DiscoverDevice();
        UpdateUI();
    }
}

function test(){
 	
}

function startTrade(){
    var currency = document.getElementById("currency_code").value;   //获取form表单中第一个元素的值      
    var amount = document.getElementById("Amount").value;   //直接通过元素的属性Id来直接获取  
    var tractionType = document.getElementById("TractionType").value; 
    if(Connected){

        setAmount(amount, "", currency, transactionTypeConvert(tractionType));
        // setAmountIcon(AmountType.MONEY_TYPE_CUSTOM_STR,"Rs");
        mService.doTrade(0,20);
        // var strArr = stringToBytes("enter amount");
        // var displayStr = byteArray2Hex(strArr);
        // mService.doInputCustomStr(CustomInputOperateType.isNumber, CustomInputDisplayType.Other, 6,displayStr,"test",amount);
        // mService.doUpdateIPEKOperation("0","09120200630001E0004C","2B7D562AFA3EAC7970664394CD19D3D3","B62AA00000000000",
        // 	"09120200630001E0004C","2B7D562AFA3EAC7970664394CD19D3D3","B62AA00000000000","09120200630001E0004C","2B7D562AFA3EAC7970664394CD19D3D3","B62AA00000000000")
    }else{
        DiscoverDevice();
        UpdateUI();
    }
}

function transactionTypeConvert(str){
   console.log("Str:" + str);
   if (str == "0") {
       return TransactionType.GOODS;
   }else if (str == "1") {
       return TransactionType.SERVICES;
   }else if (str == "2") {
       return TransactionType.CASH;
   }else if (str == "3") {
       return TransactionType.CASHBACK;
   }else if (str == "4") {
       return TransactionType.INQUIRY;
   }else if (str == "5") {
       return TransactionType.TRANSFER;
   }else if (str == "6") {
       return TransactionType.ADMIN;
   }else if (str == "7") {
       return TransactionType.CASHDEPOSIT;
   }else if (str == "8") {
       return TransactionType.PAYMENT;
   }else if (str == "9") {
       return TransactionType.PBOCLOG;
   }else if (str == "10") {
       return TransactionType.SALE;
   }else if (str == "11") {
       return TransactionType.PREAUTH;
   }else if (str == "12") {
       return TransactionType.ECQ_DESIGNATED_LOAD;
   }else if (str == "13") {
       return TransactionType.ECQ_UNDESIGNATED_LOAD;
   }else if (str == "14") {
       return TransactionType.ECQ_CASH_LOAD;
   }else if (str == "15") {
       return TransactionType.ECQ_CASH_LOAD_VOID;
   }else if (str == "16") {
       return TransactionType.UPDATE_PIN;
   }else if (str == "17") {
       return TransactionType.REFUND;
   }
}

var appCfgStr = "";
var capkCfgStr = "";
function readLine(){
   appCfgStr="";
   capkCfgStr="";
   const ipt = document.createElement('input')
   ipt.type = 'file'
   ipt.style.display = 'none'
   document.body.appendChild(ipt)
   ipt.click()

   ipt.onchange = () => {
   const files = ipt.files[0]
   var fileName = files.name;
   const reader = new FileReader()
   reader.readAsArrayBuffer(files)
   reader.onload = () => {
        var content = byteArray2Hex(reader.result);
        if ("emv_app.bin" == fileName) {
            appCfgStr = content;
            console.log("app:"+"\r"+appCfgStr);
        }else if ("emv_capk.bin" == fileName) {
            capkCfgStr = content;
            console.log("\r"+"capk:"+"\r"+capkCfgStr);
        } 
    }
   }
}

//发现蓝牙设备
function DiscoverDevice() {
    //过滤出我们需要的蓝牙设备
    //过滤器
    var options = {
        filters: [{ namePrefix: 'MPOS' },{ namePrefix: 'QPOS' },{ namePrefix: 'VEL' }],
        optionalServices: [MPOS_SERVICE]
    };

    navigator.bluetooth.requestDevice(options)
        .then(device => {
            console.log(device);
            console.log('> 设备名称: ' + device.name);
            console.log('> 设备Id: ' + device.id);
            console.log('> 是否已连接到其它设备: ' + device.gatt.connected);
            //连接到该设备
            Connected_Device = device;
            ConnectDevice();
        })
        .catch(error => {pos现在发展
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
                console.log('disconnect ')
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