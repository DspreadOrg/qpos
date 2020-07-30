var QPOSService =  function(writeChar) {
    this.mOnResult;
    console.log("QPOSService init");
    this.mDoTrade;
    this.mWebBluetooth;
    this.mEMVManager;
    this.writeChar;
    this.mKeyManager;
    this.mUpdateFirmware;
    this.mGtMifareCardInfo;
    this.mpinOperation;
}

QPOSService.prototype.initListener = function (listener) {
    this.mOnResult = new QPOSAnalyResult(listener);
    this.mDoTrade = new DoTrade(listener);
    this.mWebBluetooth = new webBluetooth(this.mOnResult,this.writeChar);
    this.mEMVManager = new EMVManager(listener);
    this.mKeyManager = new keyManager(listener);
    this.mUpdateFirmware = new UpdateFirmwareManager(listener);
    this.mGtMifareCardInfo = new GetMifareCardInfo(listener);
    this.mpinOperation = new pinOperation(listener);
}

QPOSService.prototype.getQPosInfo = function () {
    this.mOnResult.getQPosInfo();
}
QPOSService.prototype.getQPosId = function () {
   this.mOnResult.getQPosId();
}
QPOSService.prototype.doTrade = function (keyIndex, timeOut){
    console.log("doTrade");
    this.mDoTrade.doTrade(keyIndex, timeOut);
}

QPOSService.prototype.doCheckCard = function (keyIndex, timeOut) {
    this.mDoTrade.doCheckCard(keyIndex, timeOut);
}

QPOSService.prototype.selectEmvApp = function (index) {
    this.mDoTrade.selectEmvApp(index);
}

QPOSService.prototype.sendOnlineProcessResult = function (str) {
    this.mDoTrade.sendOnlineProcessResult(str);
}

QPOSService.prototype.getNFCBatchData = function (onSuccess, onError) {
    return this.mDoTrade.getNFCBatchData(onSuccess, onError);
}

QPOSService.prototype.resetPosStatus = function () {
    this.mWebBluetooth.startSysSession(packageInstructionReset(), null, 5);
}

QPOSService.prototype.updateEmvAPP = function (operationType, appTLV) {
    this.mEMVManager.updateEmvAPP(operationType, appTLV);
}

QPOSService.prototype.updateEmvCAPK = function (operationType, capkTLV) {
    this.mEMVManager.updateEmvCAPK(operationType, capkTLV);
}

QPOSService.prototype.updateEmvConfig = function (emvAppCfg, emvCapkCfg) {
    this.mEMVManager.updateEmvConfig(emvAppCfg, emvCapkCfg);
}

QPOSService.prototype.getICCTag = function (cardType, tagCount, tagArrStr) {
    return this.mDoTrade.getICCTag(cardType, tagCount, tagArrStr);
}

QPOSService.prototype.setMasterKey = function (key,checkValue,keyIndex,timeout) {
    this.mKeyManager.setMasterKey(key, checkValue, keyIndex,timeout);
}

QPOSService.prototype.udpateWorkKey = function (pik,pikCheck,trk,
    trkCheck,mak,makCheck,keyIndex,timeout) {
    this.mKeyManager.udpateWorkKey(pik,pikCheck,trk,
    trkCheck,mak,makCheck,keyIndex,timeout);
}

QPOSService.prototype.doUpdateIPEKOperation = function (ipekgroup,trackksn,trackipek,trackipekCheckvalue,   emvksn
    , emvipek,emvipekCheckvalue,pinksn,pinipek,pinipekCheckvalue) {
    this.mKeyManager.doUpdateIPEKOperation(ipekgroup,trackksn,trackipek,trackipekCheckvalue,   emvksn
    , emvipek,emvipekCheckvalue,pinksn,pinipek,pinipekCheckvalue);
}

QPOSService.prototype.lcdShowCustomDisplay = function (lcdModeAlign,lcdFont,timeout) {
    this.mKeyManager.lcdShowCustomDisplay(lcdModeAlign,lcdFont,timeout);
}

QPOSService.prototype.lcdShowCloseDisplay = function () {
    this.mKeyManager.lcdShowCloseDisplay();
}

QPOSService.prototype.doInputCustomStr = function (operateType,displayType,maxLength,strCustom,name, timeout) {
    this.mKeyManager.doInputCustomStr(operateType,displayType,maxLength,strCustom,name, timeout);
}

QPOSService.prototype.pollOnMifareCard = function (timeout) {
    this.mGtMifareCardInfo.pollOnMifareCard(timeout);
}

QPOSService.prototype.finishMifareCard = function (timeout) {
    this.mGtMifareCardInfo.finishMifareCard(timeout);
}

QPOSService.prototype.setInputCsutomStr = function (keyIndex,   maxLen,   typeFace,  timeout) {
    this.mpinOperation.setInputCsutomStr(keyIndex,   maxLen,   typeFace,  timeout);
}
// QPOSService.prototype.updatePosFirmware = function (updateData,address) {
//     this.mUpdateFirmware.updatePosFirmware(updateData,address);
// }

