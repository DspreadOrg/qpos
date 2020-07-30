var TCKEY=[0, 0, 0, 0, 0, 0, 0, 0]
var dataLen=0
var HEADER_LEN=4
var CRC_LEN=1
var OVERHEAD_LEN=5
var DATA_FIELD_HEADER_LEN=5
var bytes=new Array();

function packet(len) {
    dataLen=len;
    len=OVERHEAD_LEN + DATA_FIELD_HEADER_LEN + len;
    bytes = new Array(len);
    bytes[1] = 0;
    var lens = intToHex(len - 4);
    if (lens.length == 1) {
      bytes[2] = lens[0];
    } else {
      bytes[1] = lens[0];
      bytes[2] = lens[1];
    }
    bytes[0] = 77;
  }

  function packet2(b) {
      bytes = new Array(b.length);
      arrCopyArr(b, 0, bytes, 0, b.length);
      dataLen = b.length - (OVERHEAD_LEN + DATA_FIELD_HEADER_LEN);
    console.log("===packet2===" + bytes);
  }

function setPByte(offset, data) {
    bytes[HEADER_LEN + offset] = data;
  }

function getPByte(offset) {
    if (offset + HEADER_LEN < bytes.length) {
      return bytes[offset + HEADER_LEN];
    } else {
      return 0x00;
    }
  }

function getPBytes() {
    return bytes;
  }

function setCmdID(cmdID) {
    bytes[3] = cmdID;
  }

function getCmdID() {
    return bytes[3];
  }

function setCmdCode(cmdCode) {
    setPByte(0, cmdCode);
  }

function setCmdSubCode(cmdSubCode){
    setPByte(1, cmdSubCode);
  }

function getCmdCode() {
    return getPByte(0);
  }

function getCmdSubCode() {
    return getPByte(1);
  }

function getResultCode(){
    return getPByte(2);
  }

function setDataField (dataField) {
    var len = dataField.length;
    setPByte(3, 0);
    var lens = intToHex(len);
    if (lens.length == 1) {
      setPByte(4, lens[0]);
    } else {
      setPByte(3, lens[0]);
      setPByte(4, lens[1]);
    }
    arrCopyArr(dataField, 0, bytes, HEADER_LEN + 5, dataField.length);
  }

function getDataFieldByte(offset) {
    if (offset + HEADER_LEN + 5 < bytes.length) {
      return bytes[offset + HEADER_LEN + 5];
    } else {
      return 0x00;
    }
  }

function setTimeOut(timeOut) {
    setPByte(2, timeOut);
  }


function setPCRC(crc) {
    bytes[bytes.length - 1] = crc;
  }

function buildCRC() {
    setPCRC(calPCRC(bytes));
  }

function getPCRC() {
    return bytes[bytes.length - 1];
}


function calPCRC(arr) {
    var crcByte = arr[0];
    for (var i = 1; i < arr.length-1; i++) {
        crcByte = (crcByte ^ arr[i]);
    }
    console.log("===crc===" + crcByte);
    return crcByte;
}


function validPCRC() {
    var crc = calPCRC(bytes);
    if (crc == getPCRC()) {
      return true;
    } else {
      return false;
    }
  }

function isValid() {
    if (bytes[0] != 0x4d) {
      return false;
    }
    return validPCRC();
  }

function isPEmpty() {
    return dataLen == 0;
  }

function len() {
    return dataLen;
  }

function setDesKey() {
    if (KEY.length == 8) {
      //			TCKEY = KEY;
      arrCopyArr(KEY, 0, TCKEY, 0, 8);
    } else if (KEY.length == 16) {
      var deskey = new Array(8);
      for (var i = 0; i < 8; i++) {
        deskey[i] = (byte)(KEY[i] ^ KEY[i + 8]);
      }
      //			TCKEY = deskey;
      arrCopyArr(deskey, 0, TCKEY, 0, 8);
      console.log("POS_SDK", "TCK: ");
    } else {
      console.log("TCK length error ");
    }
  }

function calMac(ibuf, ilen) {
    var padding_len = 8 - (ilen + 1) % 8;
    var len = ilen + 1 + padding_len;

    var payload1 = new Array(len);
    arrCopyArr(ibuf, 0, payload1, 0, ilen);

    for (var i = ilen; i < len; i++) {
      payload1[i] = 0;
    }

    // 8 bytes XOR
    var payload = [0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < len; i++) {
      payload[i % 8] = (payload[i % 8] ^ payload1[i]);
    }

    console.log("mac payload:" + byteArray2Hex(payload));
    var mac = new Array();
    console.log("TCKEY: " + byteArray2Hex(TCKEY));
    //  mac = encrypt(TCKEY, payload);
    // console.log("mac:" + byteArray2Hex(mac));
    return payload;
  }

