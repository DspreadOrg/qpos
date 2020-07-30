function commandCode(){
  return getCmdCode();
}

function subCommandCode(){
  return getCmdSubCode();
}

function getResult(){
  return getResultCode();
}

function commandID() {
  return getCmdID();
}

function upPLength(){
  // console.log("length+++++++" + getByte(3) + " "+getByte(4));
  var aLe=new Array();
  aLe[0] = getPByte(3);
  aLe[1] = getPByte(4);
  return byteArrayToInt(aLe);
}

function getUpPByte(offset){
  return getDataFieldByte(offset);
}

function getUpPBytes(offset,len){
  var r = new Array();
  for (var i = 0; i < len; i++) {
    r[i] = getDataFieldByte(offset + i);
  }
  return r;
}

function getAllBytes(){
  return getPBytes();
}

function validCRC(){
  return validPCRC();
}

function packageCommandUplink(paras) {
    var ss = hexStr2Bytes(paras.substring(10, paras.length));
    packet(paras.length/2-5);
    setCmdID(CmdId.CMDID_COMPLETED);
    setCmdCode(parseInt(paras.substring(0, 2),16));
    setCmdSubCode(parseInt(paras.substring(2, 4), 16));
    setTimeOut(0);
    setDataField(ss);
    buildCRC();
}



