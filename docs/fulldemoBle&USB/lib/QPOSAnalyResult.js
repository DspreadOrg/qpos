var QPOSAnalyResult = function (listener) {
	writeObj(listener);
    mListener = listener;
    console.log("QPOSAnalyResult init"+mListener);
	writeObj(this);
}

var mListener;

QPOSAnalyResult.prototype.getQPosId = function () {
    CommandDownlink(0x10, 0x00, 5);
    var datas = getDownPBytes();
    startSession(new Uint8Array(datas).buffer, onAnalyQposIdResult, 5);
}

QPOSAnalyResult.prototype.getQPosInfo = function () {
    CommandDownlink(0x11, 0x30, 5);
    var datas = getDownPBytes();
    startSession(new Uint8Array(datas).buffer, onAnalyQposInfoResult, 5);
}

function onAnalyQposInfoResult(receivedData) {
    console.log('onQposInfoResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));
    if (getResult() == 0) {
        var deviceInfo = anlycPosInfo();
        writeObj(this);
        mListener.onQposInfoResult(deviceInfo);
    } else {
        console.log("onQposInfoResult" + "error");
    }
}
function onAnalyQposIdResult(receivedData) {
    console.log('onQposIdResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));
    if (getResult() == 0) {
        var deviceId = anlycPosId();
        mListener.onQposIdResult(deviceId);
    } else {
        console.log("onQposIdResult" + "error");
    }
}

QPOSAnalyResult.prototype.checkCmdId = function () {
    return checkCmdId();
}

var Display = {
    TRY_ANOTHER_INTERFACE: "TRY_ANOTHER_INTERFACE",
    PLEASE_WAIT: "PLEASE_WAIT",
    REMOVE_CARD: "REMOVE_CARD",
    CLEAR_DISPLAY_MSG: "CLEAR_DISPLAY_MSG",
    PROCESSING: "PROCESSING",
    PIN_OK: "PIN_OK",
    TRANSACTION_TERMINATED: "TRANSACTION_TERMINATED",
    INPUT_PIN_ING: "INPUT_PIN_ING",
    MAG_TO_ICC_TRADE: "MAG_TO_ICC_TRADE",
    INPUT_OFFLINE_PIN_ONLY: "INPUT_OFFLINE_PIN_ONLY",
    CARD_REMOVED: "CARD_REMOVED",
    INPUT_LAST_OFFLINE_PIN: "INPUT_LAST_OFFLINE_PIN",
    MSR_DATA_READY: "MSR_DATA_READY"

}


function checkCmdId() {
    var rf = false;
    var comID = commandID();
    console.log("check: " + comID);
    if (comID == CmdId.CMDID_COMPLETED || comID == CmdId.CMDID_COMPLETED_ENCRY) {
        rf = true;
    } else if (comID == CmdId.CMDID_INPUT_PIN_ING) {
        rf = true;
        if (upPLength() > 0) {
            if (getUpPByte(0) == 0) {

                mListener.onRequestDisplay(Display.INPUT_PIN_ING)
                    ;
            } else {

                mListener.onRequestDisplay(Display.INPUT_OFFLINE_PIN_ONLY)
                    ;
            }
        } else {

            mListener.onRequestDisplay(Display.INPUT_PIN_ING)
                ;
        }

    } else if (comID == CmdId.CMDID_MAG_TO_ICC_TRADE) {
        rf = true;

        mListener.onRequestDisplay(Display.MAG_TO_ICC_TRADE)
            ;
    } else if (comID == CmdId.CMDID_SEND_IC_CARDNO) {
        rf = true;
    } else if (comID == CmdId.CMDID_EMV_KERNEL_PC) {
        rf = true;
    } else if (comID == CmdId.CMDID_CHECK_HAVE_CARD) {
        rf = true;
    } else if (comID == CmdId.CMDID_MSR_DATA_READY) {
        rf = true;

        mListener.onRequestDisplay(Display.MSR_DATA_READY)
            ;
    }
    else {
        rf = false;
        console.log("QPOSService checkCmdId disConnect() 22");
        if (comID == CmdId.CMDID_DESTRUCT) {

            mListener.onRequestTransactionResult(TransactionResult.DEVICE_ERROR)
                ;
        } else if (comID == CmdId.CMDID_TIMEOUT) {

            mListener.onError(POSError.CMD_TIMEOUT)
                ;
        } else if (comID == CmdId.CMDID_CARD_REMOVED) {
            mListener.onRequestDisplay(Display.CARD_REMOVED);
        }
        else if (comID == CmdId.CMDID_USERCANCEL) {

            mListener.onRequestDisplay(Display.TRANSACTION_TERMINATED)
                ;

            mListener.onRequestTransactionResult(TransactionResult.CANCEL)
                ;
        } else if (comID == CmdId.CMDID_MACERROR) {

            mListener.onError(POSError.MAC_ERROR)
                ;
        } else if (comID == CmdId.CMDID_EMV_TRANS_DENIAL) {

            mListener.onEmvICCExceptionData(byteArray2Hex(getUpPBytes(0, upPLength())));

            mListener.onRequestTransactionResult(TransactionResult.DECLINED)
                ;
        } else if (comID == CmdId.CMDID_EMV_TRANS_TERMINATE) {

            mListener.onRequestDisplay(Display.TRANSACTION_TERMINATED);

            mListener.onEmvICCExceptionData(byteArray2Hex(getUpPBytes(0, upPLength())));

            mListener.onRequestTransactionResult(TransactionResult.TERMINATED)
                ;
        } else if (comID == CmdId.CMDID_EMV_TRANS_TERMINATE_NFC) {

            mListener.onRequestTransactionResult(TransactionResult.NFC_TERMINATED)
                ;
        } else if (comID == CmdId.CMDID_NOT_AVAILABLE) {

            mListener.onError(POSError.CMD_NOT_AVAILABLE);

        } else if (comID == CmdId.CMDID_OLD) {
            mListener.onError(POSError.CMD_NOT_AVAILABLE);
        } else if (comID == CmdId.CMDID_RESET) {
            rf = true;


            mListener.onError(POSError.DEVICE_RESET)
                ;

        } else if (comID == CmdId.CMDID_ICC_POWER_ON_ERROR) {// icc卡上电失败
            console.log("POS_SDK", "CmdId.CMDID_ICC_POWER_ON_ERROR,"
                + CmdId.CMDID_ICC_POWER_ON_ERROR);


            mListener.onDoTradeResult(DoTradeResult.NOT_ICC, null)
                ;
        } else if (comID == CmdId.CMDID_WR_DATA_ERROR) { // 读/写数据失败

            mListener.onError(POSError.WR_DATA_ERROR)
                ;
        } else if (comID == CmdId.CMDID_EMV_APP_CFG_ERROR) {// emv


            mListener.onError(POSError.EMV_APP_CFG_ERROR)
                ;
        } else if (comID == CmdId.CMDID_EMV_CAPK_CFG_ERROR) {// //emv


            mListener.onError(POSError.EMV_CAPK_CFG_ERROR)
                ;
        } else if (comID == CmdId.CMDID_NO_UPDATE_WORK_KEY) {

            mListener.onDoTradeResult(DoTradeResult.NO_UPDATE_WORK_KEY, null)
                ;
        } else if (comID == CmdId.CMDID_EMV_TRANS_CARD_BLOCKED_OR_EMV_APPS) {


            mListener.onRequestTransactionResult(TransactionResult.CARD_BLOCKED_OR_NO_EMV_APPS);
            ;
        } else if (comID == CmdId.CMDID_EMV_TRANS_SELECT_APP_FAILED) {


            mListener.onRequestTransactionResult(TransactionResult.SELECT_APP_FAIL)
                ;

        } else if (comID == CmdId.CMDID_EMV_TRANS_CAPK_FAILED) {


            mListener.onRequestTransactionResult(TransactionResult.CAPK_FAIL)
                ;
        } else if (comID == CmdId.CMDID_EMV_TRANS_FALLBACK) {


            mListener.onRequestTransactionResult(TransactionResult.FALLBACK)
                ;
        } else {// 设备异常，请重新插拔设备
            if (comID == CmdId.CMDID_ICC_INIT_ERROR) {// icc模块初始化失败
                console.log("POS_SDK", "CmdId.CMDID_ICC_INIT_ERROR,"
                    + CmdId.CMDID_ICC_INIT_ERROR);
            } else if (comID == CmdId.CMDID_ICC_TRADE_ERROR) {// icc卡通讯失败
                console.log("POS_SDK", "CmdId.CMDID_ICC_TRADE_ERROR,"
                    + CmdId.CMDID_ICC_TRADE_ERROR);
            } else {
                console.log("POS_SDK", "uc command id = " + comID);
            }

            mListener.onError(POSError.UNKNOWN)
                ;
        }
    }

    console.log("checkCmdId rf = " + rf);
    return rf;
}
var POSError = {
    TIMEOUT: "TIMEOUT", MAC_ERROR: "MAC_ERROR", CMD_TIMEOUT: "CMD_TIMEOUT", CMD_NOT_AVAILABLE: "CMD_NOT_AVAILABLE",
    DEVICE_RESET: "DEVICE_RESET", UNKNOWN: "UNKNOWN", DEVICE_BUSY: "DEVICE_BUSY", INPUT_OUT_OF_RANGE: "INPUT_OUT_OF_RANGE",
    INPUT_INVALID_FORMAT: "INPUT_INVALID_FORMAT", INPUT_ZERO_VALUES: "INPUT_ZERO_VALUES", INPUT_INVALID: "INPUT_INVALID",
    CASHBACK_NOT_SUPPORTED: "CASHBACK_NOT_SUPPORTED", CRC_ERROR: "CRC_ERROR", COMM_ERROR: "COMM_ERROR", WR_DATA_ERROR: "WR_DATA_ERROR",
    EMV_APP_CFG_ERROR: "EMV_APP_CFG_ERROR", EMV_CAPK_CFG_ERROR: "EMV_CAPK_CFG_ERROR", APDU_ERROR: "APDU_ERROR", APP_SELECT_TIMEOUT: "APP_SELECT_TIMEOUT",
    ICC_ONLINE_TIMEOUT: "ICC_ONLINE_TIMEOUT", AMOUNT_OUT_OF_LIMIT: "AMOUNT_OUT_OF_LIMIT"

}

var DoTradeResult = {
    NONE: "NONE", MCR: "MCR", ICC: "ICC", NOT_ICC: "NOT_ICC", BAD_SWIPE: "BAD_SWIPE", NO_RESPONSE: "NO_RESPONSE"
    , NO_UPDATE_WORK_KEY: "NO_UPDATE_WORK_KEY",
    NFC_ONLINE: "NFC_ONLINE", NFC_OFFLINE: "NFC_OFFLINE", NFC_DECLINED: "NFC_DECLINED", TRY_ANOTHER_INTERFACE: "TRY_ANOTHER_INTERFACE"
}