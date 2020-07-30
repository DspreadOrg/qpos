
var keyManager = function (listener) {
    writeObj(listener);
    mListener = listener;
    console.log("keyManager init" + mListener);
    writeObj(this);
}

var mListener;
var isLcdClosed = false;
var isLcdshowing = false;
var do_trade_timeout;
var lcdShowCustomDisplayStr = "";
var LcdModeAlign = {
    LCD_MODE_ALIGNLEFT:1,
    LCD_MODE_ALIGNRIGHT:2,
    LCD_MODE_ALIGNCENTER:3
};

var CustomInputOperateType = {
    isNumber:1,
    Other:2
};

var CustomInputDisplayType = {
    PlainText:1,
    Other:2
};


keyManager.prototype.setMasterKey = function (key, checkValue, keyIndex, timeout) {
    setMasterKey(key,checkValue,keyIndex,timeout);
}

keyManager.prototype.udpateWorkKey = function (pik, pikCheck, trk,
    trkCheck, mak, makCheck,keyIndex, timeout) {
    udpateWorkKey(pik,pikCheck,trk,trkCheck,mak,makCheck,keyIndex,timeout);
}

keyManager.prototype.udpateWorkKey = function (pik, pikCheck, trk,
    trkCheck, mak, makCheck,keyIndex, timeout) {
    udpateWorkKey(pik,pikCheck,trk,trkCheck,mak,makCheck,keyIndex,timeout);
}

keyManager.prototype.doInputCustomStr = function (operateType,displayType,maxLength,str,name, timeout) {
    doInputCustomStr(operateType,displayType,maxLength,str, name,timeout);
}

var mName;
function doInputCustomStr(operateType,displayType,maxLength,strCustom,name, timeout){
    mName = name;
    var str = "0000";
    if(operateType == CustomInputOperateType.isNumber){
        str+="00";
    }else{
        str+="01";
    }
    if(operateType == CustomInputDisplayType.PlainText){
        str+="01";
    }else{
        str+="00";
    }
    str += (intToHexValue(maxLength));
    str += (intToHexValue(strCustom.length+1));
    str += strCustom;
    str += "00";
     var paras = hexStr2Bytes(str);
    CommandDownlink2(0x10, 0xC0, timeout,
            paras);
    var datas = getDownPBytes();
    startSession(new Uint8Array(datas).buffer, onReturnDoInputCustomStr, timeout);
}

function onReturnDoInputCustomStr(receivedData){
    console.log("ddd = "+receivedData);
    if(getResult() == 0){
        var ucLink = hexStr2Bytes(receivedData.substring(18, receivedData.length - 2));
        console.log(ucLink);
        var strLen = ucLink[2];
        console.log(strLen);
        var str = byteArray2Hex(getBytesFromArr(3, strLen, ucLink));
        console.log("upda == "+str);

        mListener.onReturnDoInputCustomStr(hex2Ascii(str),mName);
    }else{
        mListener.onReturnDoInputCustomStr(null,mName);
    }
}

keyManager.prototype.doUpdateIPEKOperation = function (ipekgroup,trackksn,trackipek,trackipekCheckvalue,   emvksn
    , emvipek, emvipekCheckvalue, pinksn, pinipek, pinipekCheckvalue) {
    doUpdateIPEKOperation(ipekgroup,trackksn,trackipek,trackipekCheckvalue,emvksn
    , emvipek,emvipekCheckvalue,pinksn,pinipek,pinipekCheckvalue);
}

function lcdShowCustomDisplay(lcdModeAlign, lcdFont, timeout){
    if(isLcdshowing) {
        lcdShowCloseDisplay();
    }
    isLcdshowing = true;
    isLcdClosed = false;
    do_trade_timeout = timeout;
    var align = "00";
    if (lcdModeAlign == LcdModeAlign.LCD_MODE_ALIGNLEFT) {
        align = "00";
    } else if (lcdModeAlign == LcdModeAlign.LCD_MODE_ALIGNRIGHT) {
        align = "20";
    } else if (lcdModeAlign == LcdModeAlign.LCD_MODE_ALIGNCENTER) {
        align = "40";
    } else {
        align = "00";
    }

    if (lcdModeAlign == null){
        align = "80";
    }
    var str = "";
    if (lcdFont != null && (lcdFont) != "") {
        str = align + lcdFont + "00";
    }
    lcdShowCustomDisplayStr = str;
    var paras = hexStr2Bytes(lcdShowCustomDisplayStr);
    CommandDownlink2(0x41, 0x10, do_trade_timeout,
            paras);
    var datas = getDownPBytes();
    startSession(new Uint8Array(datas).buffer, onLcdShowCustomDisplay, do_trade_timeout);
}

function onLcdShowCustomDisplay(receivedData) {
    if (getResult() == 0) {
        var i = 0;
        while (!isLcdClosed && (i<do_trade_timeout * 1000)){
            sleep(1);
            i++;
        }
        isLcdshowing = false;
        if (!isLcdClosed){
            mListener.onLcdShowCustomDisplay(true);
        }
    }else{
        mListener.onLcdShowCustomDisplay(false);
    }
}

function lcdShowCloseDisplay(){
    if(!isLcdshowing) {
        return;
    }
    lcdShowCustomDisplayStr = "";
    var paras = hexStr2Bytes(lcdShowCustomDisplayStr);
    CommandDownlink2(0x41, 0x10, do_trade_timeout,
            paras);
    var datas = getDownPBytes();
    isLcdClosed = true;
    isLcdshowing = false;
    startSession(new Uint8Array(datas).buffer, onLcdShowCustomDisplay, do_trade_timeout);
}

function setMasterKey(key, checkValue, keyIndex, timeout) {
    if (keyIndex > 10) {
        return;
    }
    var paras = key + checkValue + "0" + keyIndex;
    CommandDownlink2(0x10, 0xe2, timeout, hexStr2Bytes(paras));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onSetMasterKeyResult, 5);
}

function onSetMasterKeyResult(receivedData) {
    console.log('onReturnSetMasterKeyResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));
   
    if (getResult() == 0) {
        mListener.onReturnSetMasterKeyResult(true);
    } else {
        mListener.onReturnSetMasterKeyResult(false);
    }
}

function udpateWorkKey(pik, pikCheck, trk,
    trkCheck, mak, makCheck,keyIndex, timeout) {

    if (keyIndex >= 10) {
        return;
    }
    var paras = setWorkKeyStr(pik, pikCheck, trk, trkCheck, mak, makCheck, keyIndex);
    CommandDownlink2(0x10, 0xf0, timeout, hexStr2Bytes(paras));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onUpdateWorkKeyResult, 5);
}

function setWorkKeyStr(  pik,   pikCheck,   trk,
    trkCheck, mak, makCheck, keyIndex) {
    var str = "";

    var pikkLen = 0;

    if (!isEmpty(pik) && !isEmpty(pikCheck)) {
        pikkLen = pik.length + pikCheck.length;
        pikkLen = pikkLen / 2;
    } else {
        pik = "";
        pikCheck = "";
    }
    str += toHex(pikkLen).substr(2,2) + pik
        + pikCheck;

    var trkLen = 0;
    if (!isEmpty(trk) && !isEmpty(trkCheck)) {
    trkLen = trk.length + trkCheck.length;
    trkLen = trkLen / 2;
    } else {
    trk = "";
    trkCheck = "";
    }
    str += toHex(trkLen).substr(2, 2) + trk
    + trkCheck;

    var makLen = 0;
    if (!isEmpty(mak) && !isEmpty(makCheck)) {
    makLen = mak.length + makCheck.length;
    makLen = makLen / 2;
    } else {
    mak = "";
    makCheck = "";
    }
    str += toHex(makLen).substr(2, 2) + mak
    + makCheck;
    console.log("work keys: " + str);
    return str + "0" + keyIndex;
}

function onUpdateWorkKeyResult(receivedData) {
    console.log('onRequestUpdateWorkKeyResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));
    if (getResult() == 0) {
        mListener.onRequestUpdateWorkKeyResult(true);
    } else {
        mListener.onRequestUpdateWorkKeyResult(false);
    }
}


function doUpdateIPEKOperation(  ipekgroup,   trackksn,   trackipek,   trackipekCheckvalue,   emvksn
    , emvipek, emvipekCheckvalue, pinksn, pinipek, pinipekCheckvalue) {

    if (ipekgroup >= 10) {
        return;
    }
    var paras = "0000" + "0" + ipekgroup + trackksn + trackipek + trackipekCheckvalue + emvksn + emvipek + emvipekCheckvalue + pinksn + pinipek + pinipekCheckvalue;
    CommandDownlink2(0x10, 0xf2, 5, hexStr2Bytes(paras));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onUpdateIPEKResult, 5);
}

function onUpdateIPEKResult(receivedData) {
    if (getResult() == 0) {
        mListener.onReturnUpdateIPEKResult(true);
    } else {
        mListener.onReturnUpdateIPEKResult(false);
    }
}


