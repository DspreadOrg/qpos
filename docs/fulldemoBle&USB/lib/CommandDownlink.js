function CommandDownlink(cmdCode, cmdSubCode, delay){
  packCmmandDownlink(0x21, cmdCode, cmdSubCode, delay, new Array());
}

function CommandDownlink2(cmdCode, cmdSubCode, delay,paras){
  packCmmandDownlink(0x21, cmdCode, cmdSubCode, delay, paras);
}

function CommandDownlink3(cmdID,cmdCode, cmdSubCode, delay, paras) {
  packCmmandDownlink(cmdID, cmdCode, cmdSubCode, delay, paras);
}

function CommandDownlink4(cmdID,cmdCode, cmdSubCode, delay) {
  packCmmandDownlink(cmdID, cmdCode, cmdSubCode, delay, new Array());
}

function getDownPByte(offset){
  return getPByte(offset);
}

function getDownPBytes(){
  return getPBytes();
}

function packCmmandDownlink(cmdID, cmdCode, cmdSubCode, delay, paras){
  packet(paras.length);
  setCmdID(cmdID);
  setCmdCode(cmdCode);
  setCmdSubCode(cmdSubCode);
  setTimeOut(delay);
  setDataField(paras);
  buildCRC();
}
