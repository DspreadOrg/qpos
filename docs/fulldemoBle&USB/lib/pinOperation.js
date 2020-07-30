
var pinOperation = function (listener) {
    writeObj(listener);
    mListener = listener;
    console.log("pinOperation init" + mListener);
    writeObj(this);
}
var mListener;
pinOperation.prototype.setInputCsutomStr = function ( keyIndex,   maxLen,   typeFace,  timeout) {
    setInputCsutomStr("0",   keyIndex,   maxLen,   typeFace,  timeout);
}

// function getPin(encryptType, keyIndex, maxLen,  typeFace,  cardNo,  data,  waitPinTime, timeout) {
//     doGetPin(encryptType, keyIndex, maxLen, typeFace, cardNo, data, waitPinTime, timeout);
// }

function setInputCsutomStr(encryptType,   keyIndex,   maxLen,   typeFace,  timeout){
    doGetPin(encryptType, keyIndex, maxLen, typeFace, "", "", 0, timeout);
}

function getPin( encryptType,   keyIndex,   maxLen,   typeFace,    cardNo,   data,  timeout) {
    doGetPin(encryptType, keyIndex, maxLen, typeFace, cardNo, data, 0, timeout);
}

function doGetPin(encryptType, keyIndex, maxLen, typeFace, cardNo, data, waitPinTime, timeout) {

    //预留两字节
    var str = "0000";
    //加密类型+密钥索引+输入密码最大长度
    str += byteArray2Hex(intToHex(encryptType)) + byteArray2Hex(intToHex(keyIndex)) + byteArray2Hex(intToHex(maxLen));

    //显示字体长度+显示字体+卡号长度+卡号+附加数据长度+附加数据
    var typeFaceLen = 0;
    if (!isEmpty(typeFace)) {

        typeFaceLen = getUTF8Bytes(typeFace).length + 1;
        str += byteArray2Hex(intToHex(typeFaceLen)) + byteArray2Hex(toGbkBytes(typeFace)) + "00";
}
    else {
    typeFaceLen = 0;
    typeFace = "";
        str += byteArray2Hex(intToHex(typeFaceLen)) + typeFace;
        }
var cardNoLen = 0;
    if (!isEmpty(typeFace)) {
    cardNoLen = cardNo.length;
        str += byteArray2Hex(intToHex(cardNoLen)) + byteArray2Hex(getUTF8Bytes(cardNo));
        } else {
    cardNoLen = 0;
    cardNo = "";
        str += byteArray2Hex(intToHex(cardNoLen)) + cardNo;
        }
    var dataLen = 0;
    if (!isEmpty(typeFace)) {
    dataLen = data.length / 2;
        str += byteArray2Hex(intToHex(dataLen)) + data;
          } else {
    dataLen = 0;
    data = "";
        str += byteArray2Hex(intToHex(dataLen)) + data;
          }
    str += byteArray2Hex(intToHex(waitPinTime));

    var paras = str;
    CommandDownlink2(0x10, 0x71, timeout, hexStr2Bytes(paras));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onReturnGetPinResult, 5);
}

function onReturnGetPinResult(receivedData) {
    console.log('onReturnGetPinResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));

    if (getResult() == 0) {
        var hashtable = new Array();

        var countLen = upPLength();
        console.log(" length()--" + upPLength());
       
        var index = 2;
        var en_mode = byteArray2Hex(getUpPBytes(index, 2));
            index += 2;
        var pinKsnLen = getUpPByte(index++);
        var pinKsn = byteArray2Hex(getUpPBytes(index, pinKsnLen));
            index += pinKsnLen;
        var pinBlockLen = getUpPByte(index++);
        var pinBlock = byteArray2Hex(getUpPBytes(index, pinBlockLen));
        index += pinBlockLen;
        hashtable.push(pinKsn);
        hashtable.push(pinBlock);
        mListener.onReturnGetPinResult(hashtable);
        console.log("onReturnGetPinResult" + hashtable);
    } else {
        mListener.onReturnGetPinResult(null);
        console.log("onReturnGetPinResult" + "error");
    }
}
function pinKey_TDES(  key_index,   pin,   timeout,   format) {

    if (isEmpty(pin)) {

        console.log("onError(Error.INPUT_INVALID_FORMAT");
                return;
    }
    var str = "0000";//预留两字节
    str += byteArray2Hex(intToHex(key_index)) + pin;
    str += byteArray2Hex(intToHex(format));
    var paras = str;
    CommandDownlink2(0x11, 0x20, timeout, hexStr2Bytes(paras));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onPinKey_TDES_Result, 5);
    }




function onPinKey_TDES_Result(receivedData) {
    console.log('onPinKey_TDES_Result----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));

    if (getResult() == 0) {
        
        var result = byteArray2Hex(getAllBytes());
        
        console.log("esc.onPinKey_TDES_Result(result);" +"result");
    } else {
        console.log("onPinKey_TDES_Result" + "error");
    }
}