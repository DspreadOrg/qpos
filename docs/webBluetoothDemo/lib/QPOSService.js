var QPOSService =  function(writeChar) {
    this.mOnResult;
    console.log("QPOSService init");
    this.mDoTrade;
    this.mWebBluetooth;
    this.mEMVManager;
    this.writeChar;
}

QPOSService.prototype.initListener = function (listener) {
    this.mOnResult = new QPOSAnalyResult(listener);
    this.mDoTrade = new DoTrade(listener);
    this.mWebBluetooth = new webBluetooth(this.mOnResult,this.writeChar);
    this.mEMVManager = new EMVManager(listener);
}

QPOSService.prototype.getQPosInfo = function () {
    CommandDownlink(0x11, 0x30, 5);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));

    this.mWebBluetooth.startSession(new Uint8Array(datas).buffer, this.mOnResult.onAnalyQposInfoResult, 5);
}
QPOSService.prototype.getQPosId = function () {
    CommandDownlink(0x10, 0x00, 5);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    this.mWebBluetooth.startSession(new Uint8Array(datas).buffer, this.mOnResult.onAnalyQposIdResult, 5);
}
QPOSService.prototype.doTrade = function (keyIndex, timeOut){
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

QPOSService.prototype.getNFCBatchData = function (onSuccess, onError) {
    return this.mDoTrade.getNFCBatchData(onSuccess, onError);
}

QPOSService.prototype.getICCTag = function (cardType, tagCount, tagArrStr) {
    return this.mDoTrade.getICCTag(cardType, tagCount, tagArrStr);
}