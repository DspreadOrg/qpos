var EMVManager = function (listener) {
    writeObj(listener);
    mListener = listener;
    console.log("EMVManager init" + mListener);
    writeObj(this);
}

var mListener;


EMVManager.prototype.updateEmvAPP = function (operationType, appTLV) {
    updateEmvAPP(operationType, appTLV);
}

EMVManager.prototype.updateEmvCAPK = function (operationType, capkTLV) {
    updateEmvCAPK(operationType, capkTLV);
}

EMVManager.prototype.updateEmvConfig = function (emvAppCfg, emvCapkCfg) {
    updateEmvConfig(emvAppCfg, emvCapkCfg);
}




var mOperationType;
var WRITE_MAX_LEN = 100;
function updateEmvAPP(operationType, appTLV) {
    if (operationType == null || operationType == undefined) {
        return;
    }
    if (isEmpty(appTLV)) {
        appTLV = "";
    }
    mOperationType = operationType;
    var paras = updateEMV(operationType, appTLV);
    CommandDownlink2(0x17, 0xA0, 15, hexStr2Bytes(paras));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onReturnUpdateEmvAPPResult, 5);
}


function updateEMV(operationType, data) {
    var p = "";
    switch (operationType) {
        case EMVDataOperation.CLEAR:
            p = "01";
            break;
        case EMVDataOperation.ADD:
            p = "02" + data;
            break;
        case EMVDataOperation.DELETE:
            p = "03" + data;
            break;
        case EMVDataOperation.ATTAINLIST:
            p = "04";
            break;
        case EMVDataOperation.UPDATE :
            p = "05" + data;
            break;
        case EMVDataOperation.GETEMV:
            p = "06" + data;
            break;
    }
    return p;
}

function onReturnUpdateEmvAPPResult(receivedData) {
    console.log('onReturnUpdateEmvAPPResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));

    if (getResult() == 0) {
        if (mOperationType == EMVDataOperation.ATTAINLIST) {
            var aidString = byteArray2Hex(getUpPBytes(0, upPLength()));
            var numLen = 0;
            var num = aidString.substring(0, 2);
            for (var i = 0; i < aidString.length; i++) {
                if (aidString.search("1000000000000000000000000000000000") == 1) {
                    numLen = parseInt(num, 16) - 1;
                    aidString = aidString.replace("1000000000000000000000000000000000", "");
                    if (numLen < 17) {
                        num = "0" + toHex(numLen).substr(2, 2).toUpperCase();
                    } else {
                        num = toHex(numLen).substr(2,2).toUpperCase();
                    }
                }
            }
            aidString = num + aidString.slice(2);
            console.log("onReturnUpdateEmvAPPResult" + aidString);
            mListener.onReturnGetEMVListResult(aidString);
        } else if (mOperationType == EMVDataOperation.GETEMV) {
            var aidEmvData = byteArray2Hex(getUpPBytes(0, upPLength()));
            console.log("onReturnUpdateEmvAPPResult" + aidEmvData);
            mListener.onReturnGetEMVListResult(aidEmvData);
        } else {
            console.log("onReturnUpdateEmvAPPResult" + true);
            mListener.onReturnUpdateEMVResult(true);
        }
    } else {
        console.log("onReturnUpdateEmvAPPResult" + false);
        mListener.onReturnUpdateEMVResult(false);
    }
    mOperationType = null;
}

function updateEmvCAPK(operationType, capkTLV) {
    if (operationType == null || operationType == undefined || operationType == EMVDataOperation.UPDATE) {
        return;
    }

    if (isEmpty(capkTLV)) {
        capkTLV = "";
    }
    mOperationType = operationType;
    var paras = updateEMV(operationType, capkTLV);
    CommandDownlink2(0x17, 0xA1, 15, hexStr2Bytes(paras));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onReturnUpdateEmvCAPKResult, 5);
}

function onReturnUpdateEmvCAPKResult(receivedData) {
    console.log('onReturnUpdateEmvCAPKResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));

    if (getResult() == 0) {
        if (mOperationType == EMVDataOperation.ATTAINLIST) {
            var aidString = byteArray2Hex(getUpPBytes(0, upPLength()));
            var numLen = 0;
            var num = aidString.substring(0, 2);
            for (var i = 0; i < aidString.length; i++) {
                if (aidString.search("1000000000000000000000000000000000") == 1) {
                    numLen = parseInt(num, 16) - 1;
                    aidString = aidString.replace("1000000000000000000000000000000000", "");
                    if (numLen < 17) {
                        num = "0" + toHex(numLen).substr(2, 2).toUpperCase();
                    } else {
                        num = toHex(numLen).substr(2, 2).toUpperCase();
                    }
                }
            }
            aidString = num + aidString.slice(2);
            console.log("onReturnUpdateEmvCAPKResult" + aidString);
            mListener.onReturnGetEMVListResult(aidString);
        } else if (mOperationType == EMVDataOperation.GETEMV) {
            var aidEmvData = byteArray2Hex(getUpPBytes(0, upPLength()));
            console.log("onReturnUpdateEmvCAPKResult" + aidEmvData);
            mListener.onReturnGetEMVListResult(aidEmvData);
        } else {
            console.log("onReturnUpdateEmvCAPKResult" + true);
            mListener.onReturnUpdateEMVRIDResult(true);
        }
    } else {
        console.log("onReturnUpdateEmvCAPKResult" + false);
        mListener.onReturnUpdateEMVRIDResult(false);
    }
    mOperationType = null;
}

var mEmvAppCfg = "";
var mEmvCapkCfg = "";
function updateEmvConfig(emvAppCfg, emvCapkCfg) {
    
    if (isEmpty(emvAppCfg) || emvAppCfg.length % 2 != 0) {
     
        return;
    }

    if (isEmpty(emvCapkCfg) || emvCapkCfg.length % 2 != 0) {
       
        return;
    }
      mOffset = 0;
    mCustomParamString = "";
    mCustomParam = null;
    mEmvAppCfg = emvAppCfg;
    mEmvCapkCfg = emvCapkCfg;
    doUpdateCustomParam(CustomParam.CUSTOM_PARAM_SEG_EMV_APP, 0, mEmvAppCfg);
}

var mOffset = 0;
var mCustomParamString = "";
var mCustomParam;
function doUpdateCustomParam(customParam, offset, customParamString) {

    mOffset = offset;
    mCustomParamString = customParamString;
    mCustomParam = customParam;
    var customParamSize = customParamString.length / 2;

    startSendCustomParam(OperationLogo.WRITE, customParam, customParamSize).then(
        function (data) {
            if (getResult() == 0) {
                console.log('startSendCustomParam success! ');
                return updateCustomParam();
            }

        },
        function (reason) {
            console.log(reason);
          
        }
    );
}


function startSendCustomParam(opLogo, customParam,  customParamSize) {

    var aStr = "";
   
    if (opLogo == OperationLogo.READ) {//操作标识
        aStr += "00";
    } else {
        aStr += "01";
    }

    if (customParam == CustomParam.CUSTOM_PARAM_SEG_EMV_APP) {//操作类型
        aStr += "00";
    } else if (customParam == CustomParam.CUSTOM_PARAM_SEG_EMV_CAPK) {
        aStr += "01";
    } else if (customParam == CustomParam.CUSTOM_PARAM_SEG_CUSTOM1) {
        aStr += "02";
    } else if (customParam == CustomParam.CUSTOM_PARAM_SEG_CUSTOM2) {
        aStr += "03";
    }

    var tmp = customParamSize;//长度
    var hh = tmp >> 24;
    var hl = (tmp >> 16) & 0xff;
    var lh = (tmp >> 8) & 0xff;
    var ll = (tmp) & 0xff;

    aStr += byteArray2Hex(intToHex(hh));
    aStr += byteArray2Hex(intToHex(hl));
    aStr += byteArray2Hex(intToHex(lh));
    aStr += byteArray2Hex(intToHex(ll));

    aStr += "10";

    CommandDownlink2(0x16, 0x90, 15, hexStr2Bytes(aStr));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    return startSysSession(new Uint8Array(datas).buffer, null, 5);
}


var mUpdateCustomParamResolve = function () {
    console.log("BT success");

}

var mUpdateCustomParamReject =function () {
    console.log("BT success");

}

function updateCustomParam() {
    var aStr = "";
        var arrs = hexStr2Bytes(mCustomParamString);
        var customParamSize = mCustomParamString.length / 2;
    var tmp = mOffset;//偏移量
        var hh = tmp >> 24;
        var hl = (tmp >> 16) & 0xff;
        var lh = (tmp >> 8) & 0xff;
        var ll = (tmp) & 0xff;

        aStr = byteArray2Hex(intToHex(hh));
        aStr += byteArray2Hex(intToHex(hl));
        aStr += byteArray2Hex(intToHex(lh));
        aStr += byteArray2Hex(intToHex(ll));

        tmp = customParamSize - mOffset;//长度
        if (tmp > WRITE_MAX_LEN) {
            tmp = WRITE_MAX_LEN;
        }
        lh = (tmp >> 8) & 0xff;
        ll = (tmp) & 0xff;

        aStr += byteArray2Hex(intToHex(lh));
        aStr += byteArray2Hex(intToHex(ll));
        var tmparrs = new Array(tmp);
        arrCopyArr(arrs, mOffset, tmparrs, 0, tmp);
        aStr += byteArray2Hex(tmparrs);
        CommandDownlink2(0x16, 0xa0, 15, hexStr2Bytes(aStr));
        var datas = getDownPBytes();
        console.log(byteArray2Hex(datas));
        mOffset += tmp;
        startSession(new Uint8Array(datas).buffer, onUpdateCustomParam, 5);
}

function onUpdateCustomParam(receivedData) {
    console.log('onQposIdResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));

    if (getResult() == 0) {
        var customParamSize = mCustomParamString.length / 2;
        var absParamSize = customParamSize - (customParamSize % 1000);
        if (mOffset < customParamSize) {
            console.log('onUpdateCustomParam mOffset： ' + mOffset + 'onUpdateCustomParam customParamSize：' + customParamSize);
            updateCustomParam();
        } else {
            console.log('onUpdateCustomParam success!______ ' + mOffset);
            
            stopSendCustomParam(OperationLogo.WRITE, mCustomParam)
        }     

    } else {
        mListener.onReturnCustomConfigResult(false);
    }
}


function stopSendCustomParam(   opLogo,   customParam) {
    console.log('stopSendCustomParam' + customParam);
    var aStr = "";
    if (opLogo == OperationLogo.READ) {//操作标识
        aStr += "00";
    } else {
        aStr += "01";
    }

    if (customParam == CustomParam.CUSTOM_PARAM_SEG_EMV_APP) {//操作类型
        aStr += "00";
    } else if (customParam == CustomParam.CUSTOM_PARAM_SEG_EMV_CAPK) {
        aStr += "01";
    } else if (customParam == CustomParam.CUSTOM_PARAM_SEG_CUSTOM1) {
        aStr += "02";
    } else if (customParam == CustomParam.CUSTOM_PARAM_SEG_CUSTOM2) {
        aStr += "03";
    }

    CommandDownlink2(0x16, 0x91, 15, hexStr2Bytes(aStr));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    if (customParam == CustomParam.CUSTOM_PARAM_SEG_EMV_APP) {
        startSysSession(new Uint8Array(datas).buffer, null, 5).then(
            function (data) {
                doUpdateCustomParam(CustomParam.CUSTOM_PARAM_SEG_EMV_CAPK, 0, mEmvCapkCfg);
            },
            function (reason) {
         
            }
        );
    } else {
        startSysSession(new Uint8Array(datas).buffer, null, 5);
        mListener.onReturnCustomConfigResult(true);

    }
}

var OperationLogo = {};
OperationLogo.READ = 0;
OperationLogo.WRITE = 1;


var CustomParam = {};
CustomParam.CUSTOM_PARAM_SEG_CUSTOM1 = 0;
CustomParam.CUSTOM_PARAM_SEG_CUSTOM2 = 1;
CustomParam.CUSTOM_PARAM_SEG_EMV_APP = 2;
CustomParam.CUSTOM_PARAM_SEG_EMV_CAPK = 3;
