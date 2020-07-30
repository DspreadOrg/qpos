var DoTrade = function (listener) {
    writeObj(listener);
    mListener = listener;
    console.log("DoTrade init" + mListener);
    writeObj(this);
}

var mListener;


var EmvOption = {};
EmvOption.START = 0;
EmvOption.START_WITH_FORCE_ONLINE = 1;

var DoTradeMode = {};
DoTradeMode.COMMON = 0;
DoTradeMode.CHECK_CARD_NO_IPNUT_PIN = 1;
DoTradeMode.IS_DEBIT_OR_CREDIT = 2;

var TransactionResult = {
    APPROVED: "APPROVED",
    TERMINATED: "TERMINATED",
    DECLINED: "DECLINED",
    CANCEL: "CANCEL",
    CAPK_FAIL: "CAPK_FAIL",
    NOT_ICC: "NOT_ICC",
    SELECT_APP_FAIL: "SELECT_APP_FAIL",
    DEVICE_ERROR: "DEVICE_ERROR",
    CARD_NOT_SUPPORTED: "CARD_NOT_SUPPORTED",
    MISSING_MANDATORY_DATA: "MISSING_MANDATORY_DATA",
    CARD_BLOCKED_OR_NO_EMV_APPS: "CARD_BLOCKED_OR_NO_EMV_APPS",
    INVALID_ICC_DATA: "INVALID_ICC_DATA",
    FALLBACK: "FALLBACK",
    NFC_TERMINATED: "NFC_TERMINATED",
    CARD_REMOVED: "CARD_REMOVED",
    TRADE_LOG_FULL: "TRADE_LOG_FULL",
    TRANSACTION_NOT_ALLOWED_AMOUNT_EXCEED: "TRANSACTION_NOT_ALLOWED_AMOUNT_EXCEED"
}


var mTradeAmount;
var mCurrencyCode;
var mCashbackAmount;
var mTradeType;
var mDoTradeMode = DoTradeMode.COMMON;
var mCardTmode = CardTradeMode.CardTradeMode_SWIPE_TAP_INSERT_CARD;
var mAmountIcon = "";
var cDisplayStr = "";
var mFormatId = "";
var mBatchId = "";
var mAmountPoint = "";
var mSaveLogFlag = "";
var mIsSupportCashBack = false;

const FINA_CONFIRM = "03";   // 金融确认报文
const BATCH_DC = "04";   //   
const OFFLINE_ADVICE = "05";   //
const ONLINE_ADVICE = "06";   //联机通知报文
const REVERSAL = "07";   //冲正报文


const EMV_TRANS_ACCEPT = "01";			/*交易授受*/
const EMV_TRANS_DENIAL = "02";			/*交易拒绝*/
const EMV_TRANS_GOONLINE = "03";			/*联机*/


function setAmountPoint(flag) {
    if (flag) {
        mAmountPoint = "01";
    } else {
        mAmountPoint = "00";
    }
}


function isSavelog(flag) {
    if (flag) {
        mSaveLogFlag = "01";
    } else {
        mSaveLogFlag = "00";
    }
}

function setAmount(amount, cashbackAmount, currencyCode, transactionType) {
    console.log("setAmount:" + amount + "setAcashbackAmount:" + cashbackAmount);
    mTradeAmount = amount;
    mCashbackAmount = cashbackAmount;
    mCurrencyCode = currencyCode;
    console.log("transactionType :" + transactionType);
    mTradeType = toHex(transactionType).substr(2, 2);
    console.log("setAmount tradeType: " + mTradeType);
}

var AmountType = {
    MONEY_TYPE_NONE:1,
    MONEY_TYPE_RMB:2,
    MONEY_TYPE_DOLLAR:3,
    MONEY_TYPE_CUSTOM_STR:4
};

function setAmountIcon(amtType, amountIcon){
    console.log("setAmountIcon:" + amtType + "setAcashbackAmount:" + amountIcon);
    var str = "";
        if (amtType == AmountType.MONEY_TYPE_NONE) {
            str = "01";
        } else if (amtType == AmountType.MONEY_TYPE_RMB) {
            str = "02";
        } else if (amtType == AmountType.MONEY_TYPE_DOLLAR) {
            str = "03";
        } else if (amtType == AmountType.MONEY_TYPE_CUSTOM_STR) {
            mAmountIcon = amountIcon;
            if (amountIcon != null && amountIcon != "") {
                mAmountIcon = byteArray2Hex(getUTF8Bytes(amountIcon.trim()));
            }
            return;
        }
        this.amountIcon = str;
}

function setDoTradeMode(doTradeMode) {
    mDoTradeMode = doTradeMode;
}

function setFormatId(formatId) {
    mFormatId = formatId;
}

function setBatchId(batchId) {
    mBatchId = batchId;
}

function setCardTmodeMode(cardTmode) {
    mCardTmode = cardTmode;
}


DoTrade.prototype.doTrade = function (keyIndex, timeOut) {
    doTrade(keyIndex, timeOut);
}

DoTrade.prototype.doCheckCard = function (keyIndex, timeOut) {
    setDoTradeMode(DoTradeMode.CHECK_CARD_NO_IPNUT_PIN);
    doTrade(keyIndex, timeOut);
}

DoTrade.prototype.selectEmvApp = function (index) {
  
    console.log("EMVSelectEMVApp");
        EMVSelectEMVApp(index);
}
DoTrade.prototype.sendOnlineProcessResult = function (onLineData) {
        console.log("go online");
        EMVGoOnLine(onLineData);
}


function doTrade(keyIndex, timeOut) {
    if (keyIndex >= 10) {
        return;
    }
    EmvPolCard(mTradeAmount, timeOut, mAmountIcon, keyIndex, mCardTmode, mTradeType, mCurrencyCode, cDisplayStr);
}
function EmvPolCard(tradeAmount, timeout, amountIcon, keyIndex, cardTradeMode, tradeType, currencyCode, customDisplayString) {

    var index = 0;

    var amountIconArr = new Array();
    var amountArr = new Array();
    var subTimeArr = new Array();
    var cdsArr = new Array();
    var formatArr = new Array();
    var batchIdArr = new Array();
    var decPointArr = new Array();
    var isSaveLogArr = new Array();
    var isReturnPanArr = new Array();
    var panSalt = new Array();
    var amountIconLen = 0;
    if (!isEmpty(amountIcon)) {
        //			amountIconArr = amountIcon.trim().getUTF8Bytes();
        amountIconArr = hexStr2Bytes(amountIcon.trim());
        amountIconLen = amountIconArr.length;
    }

    var amountLen = 0;
    if (!isEmpty(tradeAmount)) {
        amountArr = getUTF8Bytes(tradeAmount.trim());
        amountLen = amountArr.length;
    }


    var subTime = getFormatDateyyyyMMddHHmmss();
    var subTimeLen = 0;
    if (!isEmpty(subTime)) {
        subTimeArr = hexStr2Bytes(subTime.trim());
        subTimeLen = subTimeArr.length;
    }



    var cuDispayLen = 0;
    var cds = customDisplayString;
    if (!isEmpty(cds)) {
        cdsArr = hexStr2Bytes(cds.trim());
        cuDispayLen = cdsArr.length;
    }

    var formatIDLen = 0;
    if (!isEmpty(mFormatId)) {
        formatArr = hexStr2Bytes(mFormatId.trim());
        formatIDLen = formatArr.length;
    }

    var bachIdLen = 0;
    if (!isEmpty(mBatchId)) {
        batchIdArr = hexStr2Bytes(mBatchId.trim());
        bachIdLen = batchIdArr.length;
    }

    var decPointLen = 0;
    if (!isEmpty(mAmountPoint)) {
        decPointArr = hexStr2Bytes(mAmountPoint.trim());
        decPointLen = decPointArr.length;
    }

    var isSaveLogLen = 0;

    if (!isEmpty(mSaveLogFlag)) {
        isSaveLogArr = hexStr2Bytes(mSaveLogFlag.trim());
        isSaveLogLen = isSaveLogArr.length;
    }

    var panLen = 0;
    var panStr = "00";
    if (!isEmpty(panStr)) {
        isReturnPanArr = hexStr2Bytes(panStr.trim());
        panLen = isReturnPanArr.length;
    }

    var salt = "313431323137";
    panSalt = hexStr2Bytes(salt);
    var saltLen = panSalt.length;

    var paraslen = 1 + amountLen + 1 + 1 + amountIconLen + 1 + 1 + subTimeLen +
        1 + 1 + 1 + 1 + 1 + 1 + 2 + 1 + cuDispayLen +
        8 + 1 + formatIDLen + 1 + bachIdLen + 1 + decPointLen + 1 + isSaveLogLen + 1 + panLen + 1 + saltLen;


    var paras = new Array(paraslen);

    paras[index++] = amountLen;
    arrCopyArr(amountArr, 0, paras, index, amountLen);
    index += amountLen;

    //		System.out.println("jinru EMVPollCard 0 ----- "+cardTradeMode);
    if (cardTradeMode == CardTradeMode.CardTradeMode_ONLY_INSERT_CARD) {
        paras[index++] = 0x01;
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_ONLY_SWIPE_CARD) {
        paras[index++] = 0x02;
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_SWIPE_TAP_INSERT_CARD) {
        paras[index++] = 0x03;
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_UNALLOWED_LOW_TRADE) {
        paras[index++] = 0x04;//芯片卡 和 磁条卡 和NFC 上翻键 结合不允许降级
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_SWIPE_INSERT_CARD) {
        paras[index++] = 0x05;
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_SWIPE_TAP_INSERT_CARD_UNALLOWED_LOW_TRADE) {
        paras[index++] = 0x06;//芯片卡 和 磁条卡 结合不允许降级
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_ONLY_TAP_CARD) {
        paras[index++] = 0x07;
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_SWIPE_TAP_INSERT_CARD_NOTUP) {
        paras[index++] = 0X08;
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_SWIPE_TAP_INSERT_CARD_NOTUP_UNALLOWED_LOW_TRADE) {
        paras[index++] = 0X09;  //芯片卡 和 磁条卡 和NFC 没有上翻键 结合不允许降级
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_TAP_INSERT_CARD) {
        paras[index++] = 0X0B;
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_TAP_INSERT_CARD_NOTUP) {
        paras[index++] = 0X0A;
    } else if (cardTradeMode == CardTradeMode.CardTradeMode_SWIPE_TAP_INSERT_CARD_DOWN) {
        paras[index++] = 0X0C;
    } else {
        paras[index++] = 0x03;
    }

    paras[index++] = amountIconLen;
    arrCopyArr(amountIconArr, 0, paras, index, amountIconLen);
    index += amountIconLen;


    if (mDoTradeMode == DoTradeMode.CHECK_CARD_NO_IPNUT_PIN) {
        paras[index++] = 0x01;
    } else if (mDoTradeMode == DoTradeMode.IS_DEBIT_OR_CREDIT) {
        paras[index++] = 0x03;
    } else {
        paras[index++] = 0x00;
    }

    paras[index++] = subTimeLen;
    arrCopyArr(subTimeArr, 0, paras, index, subTimeLen);
    index += subTimeLen;

    //randomLen
    paras[index++] = 0;

    //extraLen
    paras[index++] = 0;


    paras[index++] = keyIndex;
    //isPosInputAmountFlag
    paras[index++] = 0x00;
    //isPosDisplayAmountFlag
    paras[index++] = 0x01;

    if (isEmpty(tradeType)) {
        tradeType = "01";
    }
    
    paras[index++] = hexStr2Bytes(tradeType)[0];

    if (isEmpty(currencyCode)) {
        currencyCode = "0156";
    }
    
    if (currencyCode.length == 3) {
        currencyCode = "0" + currencyCode;
    }
    paras[index++] = hexStr2Bytes(currencyCode)[0];
    paras[index++] = hexStr2Bytes(currencyCode)[1];

    paras[index++] = cuDispayLen;
    arrCopyArr(cdsArr, 0, paras, index, cuDispayLen);
    index += cuDispayLen;

    paras[index++] = formatIDLen;
    arrCopyArr(formatArr, 0, paras, index, formatArr.length);
    index += formatIDLen;

    paras[index++] = bachIdLen;
    arrCopyArr(batchIdArr, 0, paras, index, batchIdArr.length);
    index += bachIdLen;

    paras[index++] = decPointLen; //小数点
    arrCopyArr(decPointArr, 0, paras, index, decPointArr.length);
    index += decPointLen;

    paras[index++] = isSaveLogLen;
    arrCopyArr(isSaveLogArr, 0, paras, index, isSaveLogArr.length);
    index += isSaveLogLen;

    paras[index++] = panLen; //卡号
    arrCopyArr(isReturnPanArr, 0, paras, index, isReturnPanArr.length);
    index += panLen;

    paras[index++] = saltLen;
    arrCopyArr(panSalt, 0, paras, index, panSalt.length);
    index += saltLen;

    var mac = calMac(paras, paras.length - 8);//mac
    arrCopyArr(mac, 0, paras, index, 8);
    index += 8;
    mListener.onRequestWaitingUser();
    CommandDownlink2(0x16, 0x20, timeout, paras);//[[CommandDownlink new] init:0x16 aSubCode:0x20 aDelay:delay aParas:td];
    var datas = getDownPBytes();
    startSession(new Uint8Array(datas).buffer, onReceiveDateListener, 15);
}

function onReceiveDateListener(receivedData) {
    console.log('onReceiveDateListener----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));
    //Judging whether it is an ic card or a mrc card
    if (receivedData.substring(18, 20) == "01" && receivedData.substring(8, 12) == "1620") { //是ic卡

        mListener.onDoTradeResult(DoTradeResult.ICC, null);
        var paras = EMVStart(EmvOption.START);
        CommandDownlink2(0x16, 0x30, 60, paras);
        var datas = getDownPBytes();
        console.log(byteArray2Hex(datas));
        startSession(new Uint8Array(datas).buffer, onReceiveDateListener, 5);

    } else if (receivedData.substring(18, 20) == "00" && receivedData.substring(8, 12) == "1620") { //mrc
        // print("this is MRC card ");
        checkCardResult(DoTradeResult.MCR, receivedData);
    }
    else if (receivedData.substring(18, 20) == "03" && receivedData.substring(8, 12) == "1620") { //NFC
       // print("NFC_ONLINE");
        checkCardResult(DoTradeResult.NFC_ONLINE, receivedData);
    }
    else if (receivedData.substring(18, 20) == "04" && receivedData.substring(8, 12) == "1620") { //NFC
        // print("NFC_OFFLINE");
        checkCardResult(DoTradeResult.NFC_OFFLINE, receivedData);
    }
    else if (receivedData.substring(18, 20) == "05" && receivedData.substring(8, 12) == "1620") {
        // print("NFC_DECLINED");
        mListener.onDoTradeResult(DoTradeResult.NFC_DECLINED, null);
    } else if (receivedData.substring(6, 8) == "24" && receivedData.substring(8, 12) == "1630") {


        var len = parseInt(receivedData.substring(14, 18), 16);
        var dataStr = receivedData.substring(18, 18 + len * 2);
        console.log("dataStra==" + dataStr);
        console.log("receive  len" + len);
        if (receivedData.substring(12, 14) == "02") {
            var hashtable = new Array();

            var index = 0;
            var appCount = parseInt(dataStr.substring(index, index + 2), 16);
            console.log("appCount = " + appCount);
            index += 2;
            for (var i = 0; i < appCount; i++) {
                index += 2;
                index += 2;;
                var app1Len = parseInt(dataStr.substring(index, index + 2), 16);
                index += 2;
                var app1 = hex2Ascii(dataStr.substring(index, index + app1Len * 2));
                index += app1Len * 2;
                hashtable.push(app1);
            }
       
            mListener.onRequestSelectEmvApp(hashtable);
        } else {
            continueEmvProcess(dataStr);
        }
       
        //  buffer=null;
    } else if (receivedData.substring(6, 12) == "241640") {
        console.log("online result===" + receivedData);
        var len = parseInt(receivedData.substring(14, 18), 16);
        console.log("le==+++" + len)
        var dataStr = bufData + receivedData.substring(18, 18 + len * 2);
        console.log("111===" + dataStr.length);
        var dataArr = Str2Bytes(dataStr);
        console.log("len==" + dataArr.length);

        var dict = analysisEmvResult(dataArr);
        var transResult = dict[0];
        var packType = dict[1];
        var _issScriptRes = dict[2];
        var forceAccept = dict[3];
        var iccData = dict[4];
        console.log("icc result===" + iccData);
        if(transResult == EMV_TRANS_ACCEPT){
            if(packType == REVERSAL){
                mListener.onRequestDisplay(Display.REMOVE_CARD);
                mListener.onReturnReversalData(iccData);
                mListener.onRequestTransactionResult(TransactionResult.DECLINED);
            }else if(packType == FINA_CONFIRM || packType == BATCH_DC){
                mListener.onRequestDisplay(Display.REMOVE_CARD);

                mListener.onRequestBatchData(iccData);
                mListener.onRequestTransactionResult(TransactionResult.APPROVED);
            }
        }else if(transResult == EMV_TRANS_DENIAL){
            if (packType == ONLINE_ADVICE|| packType == OFFLINE_ADVICE) {
                mListener.onRequestDisplay(Display.REMOVE_CARD);

                mListener.onRequestBatchData(iccData);
                mListener.onRequestTransactionResult(TransactionResult.DECLINED);
            } else if (REVERSAL == packType) {
                mListener.onRequestDisplay(Display.REMOVE_CARD);

                mListener.onReturnReversalData(iccData);
                mListener.onRequestTransactionResult(TransactionResult.DECLINED);
            }
        }
        // var result = anlysDataCommon(true, iccData)
        // print("icc result===" + result);
    }
};
function continueEmvProcess(dataStr) {
    var data = hexStr2Bytes(dataStr);
    var dict = analysisEmvResult(data);
    var transResult = dict[0];
    var packType = dict[1];
    var _issScriptRes = dict[2];
    var forceAccept = dict[3];
    var iccData = dict[4];
    if (EMV_TRANS_GOONLINE == transResult) {
        mListener.onRequestOnlineProcess(iccData);
    } else {
        emvGoOffLine(dict);
    }
}

function emvGoOffLine(dict) {
    var transResult = dict[0];
    var packType = dict[1];
    var _issScriptRes = dict[2];
    var forceAccept = dict[3];
    var iccData = dict[4];
 

    if (EMV_TRANS_DENIAL == (transResult)) {
        if (ONLINE_ADVICE == (packType) || OFFLINE_ADVICE == (packType)) {

            mListener.onReqestDisplay(Display.REMOVE_CARD)
           
            mListener.onRequestBatchData(iccData)
         
            mListener.onRequestTransactionResult(TransactionResult.DECLINED)
            
            return;
        } else if (REVERSAL == (packType)) {
            mListener.onRequestDisplay(Display.REMOVE_CARD);
          
            mListener.onReturnReversalData(iccData);
         
            mListener.onRequestTransactionResult(TransactionResult.DECLINED);

            return;
        }
    } else if (EMV_TRANS_ACCEPT == (transResult)) {
        if (REVERSAL == (packType)) {

          
            mListener.onRequestDisplay(Display.REMOVE_CARD);
        
            mListener.onReturnReversalData(iccData)
        
            mListener.onRequestTransactionResult(TransactionResult.DECLINED);
        
            return;
        } else if (FINA_CONFIRM == (packType) || BATCH_DC == (packType)) {
           
            mListener.onRequestDisplay(Display.REMOVE_CARD);
          
            mListener.onRequestBatchData(iccData);
         
            mListener.onRequestTransactionResult(TransactionResult.APPROVED);

            return;
        }
    }


    startSysSession(packageInstructionReset(), null, 5);
    logListaner = "onError(Error.UNKNOWN)";
    console.log(logListener);
}

function EMVSelectEMVApp(index) {
    var paras = new Array();
    paras.push(index);
    CommandDownlink2(0x16, 0x31, 30, paras);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSysSession(new Uint8Array(datas).buffer, null, 60).then(
        function (data) {
            if (getResult() == 0) {

                var dataLen = upPLength();
                console.log(" length()--" + upPLength());
                var index = 0;
                var dataStr = byteArray2Hex(getUpPBytes(index, dataLen));
                continueEmvProcess(dataStr);
            }

        },
        function (reason) {
            console.log(reason);
        }
    );
}


function EMVGoOnLine(paras) {
    CommandDownlink2(0x16, 0x40, 30, hexStr2Bytes(paras));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onReceiveDateListener, 60);
}


//Swipe results
function checkCardResult(tradeResult, result) {
    var tradeResultHashTable = new Array();
    console.log("result:" + result);
    var ucLink = hexStr2Bytes(result.substring(14, 14 + result.length - 16));
    var cardStatus = ucLink[2];
    var index = 4;
    var countLen = ucLink.length;

    var encTrack1Len = ucLink[index++];
    // print("len:" + encTrack1Len);

    var encTrack1 = byteArray2Hex(getBytesFromArr(index, encTrack1Len, ucLink));
    index += encTrack1Len;
    tradeResultHashTable.push(encTrack1);
    var encTrack2Len = ucLink[index++];
    var encTrack2 = byteArray2Hex(getBytesFromArr(index, encTrack2Len, ucLink));
    index += encTrack2Len;
    
    tradeResultHashTable.push(encTrack2);
    var encTrack3Len = ucLink[index++];
    var encTrack3 = byteArray2Hex(getBytesFromArr(index, encTrack3Len, ucLink));
    index += encTrack3Len;

     
    tradeResultHashTable.push(encTrack3);
    var formatIDLen = ucLink[index++];
    var formatID = ab2str(getBytesFromArr(index, formatIDLen, ucLink));
   
    index += formatIDLen;
    tradeResultHashTable.push(formatID);
    var maskedPANLen = ucLink[index++];
    var maskedPAN = ab2str(getBytesFromArr(index, maskedPANLen, ucLink));
    index += maskedPANLen;
  
    tradeResultHashTable.push(maskedPAN);
    var expiryDateLen = ucLink[index++];
    var expiryDate = ab2str(getBytesFromArr(index, expiryDateLen, ucLink));
    index += expiryDateLen;
     
    tradeResultHashTable.push(expiryDate);
    var serviceCodeLen = ucLink[index++];
    var serviceCode = ab2str(getBytesFromArr(index, serviceCodeLen, ucLink));
    index += serviceCodeLen;
    
    tradeResultHashTable.push(serviceCode);
    var cardHolderNameLen = ucLink[index++];
    var cardHolderName = ab2str(getBytesFromArr(index, cardHolderNameLen, ucLink));
    index += cardHolderNameLen;
   

    tradeResultHashTable.push(cardHolderName);

    var pinBlockLen = ucLink[index++];
    var pinBlock = byteArray2Hex(getBytesFromArr(index, pinBlockLen, ucLink));
    index += pinBlockLen;
     
    tradeResultHashTable.push(pinBlock);
    var trackksnLen = ucLink[index++];
    var trackksn = byteArray2Hex(getBytesFromArr(index, trackksnLen, ucLink));
    index += trackksnLen;
    
    tradeResultHashTable.push(trackksn);
    var pinKsnLen = ucLink[index++];
    var pinKsn = byteArray2Hex(getBytesFromArr(index, pinKsnLen, ucLink));
    index += pinKsnLen;
   
    tradeResultHashTable.push(pinKsn);
    var trackRandomNumber;
    var pinRandomNumber;

    if (index < countLen) {
        var trackRandomNumberLen = ucLink[index++];
        trackRandomNumber = byteArray2Hex(getBytesFromArr(index, trackRandomNumberLen, ucLink)); //[Util byteArray2Hex:[uc getBytesFromArr:index Length:trackRandomNumberLen]];
        index += trackRandomNumberLen;
        tradeResultHashTable.push(trackRandomNumber);
        var pinRandomNumberLen = ucLink[index++];
        pinRandomNumber = byteArray2Hex(getBytesFromArr(index, pinRandomNumberLen, ucLink)); //[Util byteArray2Hex:[uc getBytesFromArr:index Length:trackRandomNumberLen]];
        index += pinRandomNumberLen;
        tradeResultHashTable.push(pinRandomNumber);
    } else {
        trackRandomNumber = "";
        pinRandomNumber = "";
    }

    var psamNo = "";
    if (index < countLen) {
        var psamNoLen = ucLink[index++];
        psamNo = ab2str(getBytesFromArr(index, psamNoLen, ucLink)); //[Util asciiFormatString:[uc getBytesFromArr:index Length:psamNoLen]];
        index += psamNoLen;
        tradeResultHashTable.push(psamNo);
    }
    var track1Length;
    var track2Length;
    var track3Length;
    if (index < countLen) {
        var a = new Array(1);
        a[0] = ucLink[index++];
        var t1Len = byteArrayToInt(a);
        var b = new Array(1)
        b[0] = ucLink[index++];
        var t2Len = byteArrayToInt(b);
        var c = new Array(1)
        c[0] = ucLink[index++];
        var t3Len = byteArrayToInt(c);

        track1Length = t1Len.toString();
        track2Length = t2Len.toString();
        track3Length = t3Len.toString();

    } else {
        track1Length = "";
        track2Length = "";
        track3Length = "";
    }

    var encPAN;
    if (index < countLen) {
        var encPANLen = ucLink[index++];
        encPAN = byteArray2Hex(getBytesFromArr(index, encPANLen, ucLink));
        index += encPANLen;
        
    } else {
        encPAN = "";
    }
    tradeResultHashTable.push(encPAN);
    var encTracks = encTrack2.toString() + encTrack3.toString();
 
    mListener.onDoTradeResult(tradeResult, tradeResultHashTable);
    
}


DoTrade.prototype.getNFCBatchData = function (onSuccess, onError) {
    return getNFCBatchData(onSuccess, onError);
}

function getNFCBatchData(onSuccess,onError) {
    getICCTag(1, 0, "").then(
        function (data) {
            if (getResult() == 0) {
                var data = byteArray2Hex(getUpPBytes(0, upPLength()));
                onSuccess(data);
            }
        },
        function (reason) {
            onError(reason);
            console.log(reason);
        }
    );
}


/**
    *  cardType  NFC card or Chip card, only 0 or 1
    *  tagCount  The number of the tag
    *  tagArrStr The tag content
    * 
    * return promise
    */

DoTrade.prototype.getICCTag = function (cardType, tagCount, tagArrStr) {
    return getICCTag(cardType, tagCount, tagArrStr);
}


function getICCTag(cardType, tagCount, tagArrStr) {

    var hashtable = new Array();
    var str = "00";
    str += byteArray2Hex(intToHex(cardType));
    str += byteArray2Hex(intToHex(cardType));//"01";
    str += byteArray2Hex(intToHex(tagCount));
    if (isEmpty(tagArrStr)) {
        tagArrStr = "00";
    }
    str += tagArrStr;
    var paras = hexStr2Bytes(str.trim());

    CommandDownlink2(0x16, 0x51, 5, paras);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));

    return startSysSession(new Uint8Array(datas).buffer, null, 5);
}

var encMode
function analysisEmvResult(emvResult) {
    console.log("analysisEmvResult")
    var hashtable = new Array();
    if (emvResult == null || emvResult.length == 0) {
        return hashtable;
    }
    var index = 0;
    index++; //个预留
    encMode = emvResult[index++]; //加密模式

    var a = new Array(1);
    a[0] = emvResult[index++];
    var transResult = byteArray2Hex(a);

    var b = new Array(1);
    b[0] = emvResult[index++];
    var packType = byteArray2Hex(b);

    var c = new Array(1);
    c[0] = emvResult[index++];
    var issScriptResLen = byteArrayToInt(c);
    var arrs = new Array(issScriptResLen);
    arrCopyArr(emvResult, index, arrs, 0, issScriptResLen);
    var issScriptRes = byteArray2Hex(arrs);
    index += issScriptResLen;

    var forceAcceptLen = emvResult[index++];
    arrs = new Array(forceAcceptLen);
    arrCopyArr(emvResult, index, arrs, 0, forceAcceptLen);
    var forceAccept = byteArray2Hex(arrs);
    index += forceAcceptLen;

    var iccarr = new Array(2)
    iccarr[0] = emvResult[index];
    iccarr[1] = emvResult[index + 1];
    var iccDataLen = byteArrayToInt(iccarr);
    index += 2;
    arrs = new Array(iccDataLen);
    arrCopyArr(emvResult, index, arrs, 0, iccDataLen);
    var iccData = byteArray2Hex(arrs);
    index += iccDataLen;
    var qfData = "";

    if (index < emvResult.length) {
        arrs = intToHex(iccDataLen);

        var str = byteArray2Hex(arrs);
        if (str.length == 2) {
            str = "00" + str;
        }
        iccData = str + iccData;
        var qfDataLen = emvResult.length - index;
        arrs = new Array(qfDataLen);
        arrCopyArr(emvResult, index, arrs, 0, qfDataLen);
        qfData = byteArray2Hex(arrs);
        index += iccDataLen;
    }
    iccData += qfData;
    hashtable.push(transResult);
    hashtable.push(packType);
    hashtable.push(issScriptRes);
    hashtable.push(forceAccept);
    hashtable.push(iccData);
    console.log("end analysisEmvResult" + encMode)
    // print('hashtable:', hashtable)
    return hashtable;
}

function anlysDataCommon(f, tlv) {
    var hashtable = new Array();

    if (encMode == 0x00 || encMode == 0x10 || encMode == 0x26 || encMode == 0x30) {
        hashtable.push(tlv);
        return hashtable;
    }
    var uc = Str2Bytes(tlv);
    var countLen = uc.length;

    var index = 0;
    var arr = new Array(2);
    arr[0] = uc[index];
    arr[1] = uc[index + 1];
    var iccdataLen = byteArrayToInt(arr);
    index += 2; //card type
    var iccdataarrs = new Array(iccdataLen);
    arrCopyArr(uc, index, iccdataarrs, 0, iccdataLen);
    var iccdata = byteArray2Hex(iccdataarrs);
    index += iccdataLen;
    if (index >= countLen) {
        hashtable.push(iccdata);
        return hashtable;
    }

    index += 2; //card type
    var encTrack1Len = uc[index++];
    var arrs = new Array(encTrack1Len);
    arrCopyArr(uc, index, arrs, 0, encTrack1Len);
    var encTrack1 = byteArray2Hex(arrs);
    index += encTrack1Len;

    var encTrack2Len = uc[index++];
    arrs = new Array(encTrack2Len);
    arrCopyArr(uc, index, arrs, 0, encTrack2Len);
    var encTrack2 = byteArray2Hex(arrs);
    index += encTrack2Len;

    var encTrack3Len = uc[index++];
    arrs = new Array(encTrack3Len);
    arrCopyArr(uc, index, arrs, 0, encTrack3Len);
    var encTrack3 = byteArray2Hex(arrs);
    index += encTrack3Len;

    var formatIDLen = uc[index++];
    arrs = new Array(formatIDLen);
    arrCopyArr(uc, index, arrs, 0, formatIDLen);
    var formatID = ab2str(arrs);
    index += formatIDLen;

    var maskedPANLen = uc[index++];
    arrs = new Array(maskedPANLen);
    arrCopyArr(uc, index, arrs, 0, maskedPANLen);
    var maskedPAN = ab2str(arrs);
    index += maskedPANLen;

    var expiryDateLen = uc[index++];
    arrs = new Array(expiryDateLen);
    arrCopyArr(uc, index, arrs, 0, expiryDateLen);
    var expiryDate = ab2str(arrs);
    index += expiryDateLen;

    var serviceCodeLen = uc[index++];
    arrs = new Array(serviceCodeLen);
    arrCopyArr(uc, index, arrs, 0, serviceCodeLen);
    var serviceCode = ab2str(arrs);
    index += serviceCodeLen;

    var cardHolderNameLen = uc[index++];
    var cardholderName = ab2str(arrs);
    index += cardHolderNameLen;

    var pinBlockLen = uc[index++];
    arrs = new Array(pinBlockLen);
    arrCopyArr(uc, index, arrs, 0, pinBlockLen);
    var pinBlock = byteArray2Hex(arrs);
    index += pinBlockLen;

    var trackksnLen = uc[index++];
    arrs = new Array(trackksnLen);
    arrCopyArr(uc, index, arrs, 0, trackksnLen);
    var trackksn = byteArray2Hex(arrs);
    index += trackksnLen;

    var pinKsnLen = uc[index++];
    arrs = new Array(pinKsnLen);
    arrCopyArr(uc, index, arrs, 0, pinKsnLen);
    var pinKsn = byteArray2Hex(arrs);
    index += pinKsnLen;

    var trackRandomNumber = "";
    var pinRandomNumber = "";
    if (index < countLen) {
        var trackRandomNumberLen = uc[index++];
        arrs = new Array(trackRandomNumberLen);
        arrCopyArr(uc, index, arrs, 0, trackRandomNumberLen);
        trackRandomNumber = byteArray2Hex(arrs);
        index += trackRandomNumberLen;
    }

    if (index < countLen) {
        var pinRandomNumberLen = uc[index++];
        arrs = new Array(pinRandomNumberLen);
        arrCopyArr(uc, index, arrs, 0, pinRandomNumberLen);
        pinRandomNumber = byteArray2Hex(arrs);
        index += pinRandomNumberLen;
    }
    var psamNo = "";

    if (index < countLen) {
        var psamNoLen = uc[index++]; //psam编号
        arrs = new Array(psamNoLen);
        arrCopyArr(uc, index, arrs, 0, psamNoLen);
        psamNo = ab2str(arrs);
        index += psamNoLen;
    }
    var track1Length = "";
    var track2Length = "";
    var track3Length = "";
    if (index < countLen) {
        var t1Len = uc[index++]; //磁道1原始数据长度
        var t2Len = uc[index++]; //磁道2原始数据长度
        var t3Len = uc[index++]; //磁道3原始数据长度

        track1Length = t1Len + "";
        track2Length = t2Len + "";
        track3Length = t3Len + "";
    }

    var encPAN = "";
    if (index < countLen) { //VIPOS 增加卡号密文
        var encPANLen = uc[index++];
        arrs = new Array(encPANLen);
        arrCopyArr(uc, index, arrs, 0, encPANLen);
        encPAN = byteArray2Hex(arrs);
        index += encPANLen;
    }

    var cardSquNo = "";
    var iccCardAppexpiryDate = "";
    if (index < countLen) {
        var cardSquNoLen = uc[index++];
        var cardSquNoArrs = new Array(cardSquNoLen);
        arrCopyArr(uc, index, cardSquNoArrs, 0, cardSquNoLen);
        cardSquNo = byteArray2Hex(cardSquNoArrs);
        index += cardSquNoLen;
    }
    if (index < countLen) {
        var iccCardAppexpiryDateLen = uc[index++];
        var iccCardAppexpiryDateArrs = new Array(iccCardAppexpiryDateLen);
        arrCopyArr(uc, index, iccCardAppexpiryDateArrs, 0, iccCardAppexpiryDateLen);
        iccCardAppexpiryDate = byteArray2Hex(iccCardAppexpiryDateArrs);
        index += iccCardAppexpiryDateLen;
    }

    hashtable.push(formatID);

    hashtable.push(maskedPAN);

    hashtable.push(expiryDate);

    hashtable.push(cardholderName);

    hashtable.push(serviceCode);

    hashtable.push(track1Length);

    hashtable.push(track2Length);

    hashtable.push(track3Length);

    hashtable.push(encTrack1);

    hashtable.push(encTrack2);

    hashtable.push(encTrack3);

    hashtable.push(pinBlock);

    hashtable.push(trackRandomNumber);

    hashtable.push(pinRandomNumber);

    hashtable.push(psamNo);

    hashtable.push(encPAN);

    hashtable.push(iccdata);

    hashtable.push(cardSquNo);

    hashtable.push(trackksn);

    hashtable.push(pinKsn);

    console.log("hashtable end+++++++")

    return hashtable;
}

function EMVStart(emvOp) {

    console.log("EMVStart>> tradeAmount: " + mTradeAmount);

    var byteLen = 14 + 2 + 2 + 1 + mTradeAmount.length + 1 + mCashbackAmount.length + 2 + 1;
    var paras = new Array(byteLen);
    var index = 0;

    if (emvOp == EmvOption.START) {
        paras[index++] = 0;
    } else if (emvOp == EmvOption.START_WITH_FORCE_ONLINE) {
        paras[index++] = 1;
    }
    paras[index++] = hexStr2Bytes(mTradeType)[0];
    var timearr;
    var terminalTime = getFormatDateyyyyMMddHHmmss();
    if (mTradeAmount.length <= 8) {
        timearr = hexStr2Bytes(terminalTime + "FF");
    } else {
        timearr = hexStr2Bytes(terminalTime + "06");
    }

    arrCopyArr(timearr, 0, paras, index, timearr.length);
    index += timearr.length;

    var str = "";
    if (mTradeAmount.length > 8) {
        str = "FFFFFFFFFFFF";
    } else {
        str = "FFFFFFFF";
    }

    var len = 0;
    if (!isEmpty(mTradeAmount)) {
        len = mTradeAmount.length;
    }

    str = str.substring(0, str.length - len) + mTradeAmount;


    timearr = hexStr2Bytes(str);
    arrCopyArr(timearr, 0, paras, index, timearr.length);
    index += timearr.length;

    if (mTradeAmount.length > 8) {
        str = "";
    } else {
        str = "0000";
    }

    if (mCurrencyCode.length == 3) {
        mCurrencyCode = "0" + mCurrencyCode;
    }
    str += mCurrencyCode;
    timearr = hexStr2Bytes(str);
    arrCopyArr(timearr, 0, paras, index, timearr.length);
    index += timearr.length;

    //		if("04".equals(tradeType)){
    paras[index++] = (mTradeAmount.length + 1);
    arrCopyArr(getUTF8Bytes(mTradeAmount), 0, paras, index, mTradeAmount.length);
    index += mTradeAmount.length;
    paras[index++] = 0x00;

    paras[index++] = (mCashbackAmount.length + 1);
    arrCopyArr(getUTF8Bytes(mCashbackAmount), 0, paras, index, mCashbackAmount.length);
    index += mCashbackAmount.length;
    paras[index++] = 0x00;

    var timeBytes = intToHex(20);
    arrCopyArr(timeBytes, 0, paras, index++, 1);
    return paras;
}


