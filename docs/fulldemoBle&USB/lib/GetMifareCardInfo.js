var GetMifareCardInfo = function (listener) {
    writeObj(listener);
    mListener = listener;
    console.log("GetMifareCardInfo init" + mListener);
    writeObj(this);
}

var mListener;
var mParas;

GetMifareCardInfo.prototype.pollOnMifareCard = function (timeout) {
    pollOnMifareCard(timeout);
}

GetMifareCardInfo.prototype.finishMifareCard = function (timeout) {
    finishMifareCard(timeout);
}

function pollOnMifareCard(timeout){
	doMifareCard("01",timeout);
}

function finishMifareCard(timeout){
	doMifareCard("0E",timeout);
}

function doMifareCard(paras,timeout){
	mParas = paras;
	CommandDownlink2(0x17, 0x80, timeout, hexStr2Bytes(paras));
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onSearchMifareCardResult, 5);
}

function onSearchMifareCardResult(receivedData) {
	console.log('onReturnGetPinResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));
	var index = 1;
	if (getResult() == 0) {
		if(mParas == "01"){
			var status = intToHexValue(getUpPBytes(index++, 1));
			var cardType = intToHexValue(getUpPBytes(index++,1));
			console.log("status "+status);
			var atqa=byteArray2Hex(getUpPBytes(index, 2));
			index += 2;
			var SAK=byteArray2Hex(getUpPBytes(index, 1));
				console.log("status+:"+status+"type:"+cardType+"atqa"+atqa+"sak:"+SAK);
				index=index+1;
			var	cardUidLen=getUpPBytes(index++,1);
			var	cardUid=byteArray2Hex(getUpPBytes(index, cardUidLen));
				index=index+cardUidLen;
				var cardAtsLen=getUpPBytes(index++,1);
				var cardAts="";
				if(cardAtsLen!=0){
					cardAts=byteArray2Hex(getUpPBytes(index, cardAtsLen));
				}
				console.log("cardlen:"+cardUidLen+" cad:"+cardUid);
				var deviceInfoData = {
					"cardType": cardType,
					"ATQA": atqa,
					"SAK": SAK,
					"cardUidLen": cardUidLen+"",
					"cardUid": cardUid,
					"cardAtsLen":cardAtsLen+"",
					"cardAts": cardAts
				};
				if(status == ("00")){
					deviceInfoData["status"] = "poll card success!";
				}else{
					deviceInfoData["status"] = "poll card fail!";
				}
				mListener.onSearchMifareCardResult(deviceInfoData);//回调接口
			}else if(mParas == "0E"){
				var status =intToHexValue(getUpPBytes(index++,1));
				if(status == ("00")){
					mListener.onFinishMifareCardResult(true);
				}else{
					mListener.onFinishMifareCardResult(false);
				}
			}
		}
	}

