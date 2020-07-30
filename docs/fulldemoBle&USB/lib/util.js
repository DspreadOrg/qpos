function uuidFormat(uuid) {
    if (uuid == undefined)
        return;
    var uuidString = uuid;
    return "0x" + uuidString.substring(4, 13).toUpperCase();
}

function writeObj(obj) {
    var description = "";
    for (var i in obj) {
        var property = obj[i];
        description += i + " = " + property + "\n";
    }
    // console.log(description);
}

function hexStr2Bytes(str) {
    if (str.includes("0x")) {
        str = str.replace("0x","");
    }
    var pos = 0;
    if (str == "") {
        return new Array();
    }
    var len = str.length;
    if (len % 2 != 0) {
        return null;
    }
    len /= 2;
    var hexA = new Array();
    for (var i = 0; i < len; i++) {
        var s = str.substr(pos, 2);
        var v = parseInt(s, 16);
        hexA.push(v);
        pos += 2;
    }
    return hexA;
}

function byteArray2Hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');

}

//字符串转字节数组
function stringToBytes(str) {
    var ch,
    st,
    re = [];
    for (var i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i); // get char
        st = []; // set up "stack"
        do {
            st.push(ch & 0xFF); // push byte to stack
            ch = ch >> 8; // shift value down by 1 byte
        } while (ch);
        // add stack contents to result
        // done because chars have "wrong" endianness
        re = re.concat(st.reverse());
    }
    // return an array of bytes
    return re;
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
            
    }
}

function printDataView(dView) {
    var uint8 = new Uint8Array(dView.byteLength);
    for (var i = 0; i < dView.byteLength; i++) {
        uint8[i] = dView.getUint8(i);
    }
    var hex = byteArray2Hex(uint8);
    console.log("printDataView:" + hex);
}

function dataView2Hex(dView) {
    var uint8 = new Uint8Array(dView.byteLength);
    for (var i = 0; i < dView.byteLength; i++) {
        uint8[i] = dView.getUint8(i);
    }
    return byteArray2Hex(uint8);

}

//数组复制数组
function arrCopyArr(arr, arrIndex, res, resIndex, arrLength) {
    for (var i = arrIndex; i < arrIndex + arrLength; i++) {
        res[resIndex] = arr[i];
        resIndex++;
    }
    return res;
}

function toHex(num) {
    return num < 16 ? "0x0" + num.toString(16).toUpperCase() : "0x" + num.toString(16).toUpperCase();
}

function calCRC(arr) {
    var crcByte = arr[0];
    for (var i = 1; i < arr.length; i++) {
        crcByte = (crcByte ^ arr[i]);
    }
    console.log("===crc===" + crcByte);
    return crcByte;
}

//传入arrbuffer
function copyArr(arr, arrIndex, res, resIndex, arrLength) {
    // copyArr(dataBuffer, 0 , receivedataBuffer, 0, read_offset)
    var j = resIndex;
    var dataView = new DataView(res);
    var len = arrIndex + arrLength;
    var dataViewArr = new DataView(arr);
 //   printDataView(dataViewArr);
    for (var i = arrIndex; i < len; i++) {
        var a = dataViewArr.getUint8(i);
        // console.log("arr[" + i + "]" + arr[i]+" , a = "+a);
        dataView.setUint8(j, a);
        j++;

    }
    console.log("copy Arr: " + byteArray2Hex(res));
    return res;
}

function getBytesFromArr(offset, len, bytes) {
    return bytes.slice(offset, offset + len);
}

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function byteArrayToInt(b) {
    var result = 0;
    for (var i = 0; i < b.length; i++) {
        result <<= 8;
        result |= (b[i] & 0xff); //
    }
    return result;
}

//将16进制字符串转为数组
function Str2Bytes(str) {
    var pos = 0;
    if (str == "") {
        return new Array();
    }
    var len = str.length;
    if (len % 2 != 0) {
        return null;
    }
    len /= 2;
    var hexA = new Array();
    for (var i = 0; i < len; i++) {
        var s = str.substr(pos, 2);
        var v = parseInt(s, 16);
        hexA.push(v);
        pos += 2;
    }
    return hexA;
}
//整形转为hex值
function intToHex(i) {
    var str;
    if (i >= 0 && i < 16) {
        str = "0" + i.toString(16);
    } else if (i >= 16 && i < 256) {
        str = i.toString(16);
    } else {
        str = "0" + i.toString(16);
    }
    if (str.length%2!=0  && str.charAt(0) == '0') {
        str = str.substring(1);
    }
    return Str2Bytes(str);
}

function intToHexValue(i){
    var str;
    if (i >= 0 && i < 16) {
        str = "0" + i.toString(16);
    } else if (i >= 16 && i < 256) {
        str = i.toString(16);
    } else {
        str = "0" + i.toString(16);
    }
    return str;
}

var CLICKTAG = 0;

function button_onclick(pElement) {
    if (CLICKTAG == 0) {
        CLICKTAG = 1;
        pElement.disabled = true;
        // 等待3s后重置按钮可用
        setTimeout(function () {
            CLICKTAG = 0;
            pElement.disabled = false;
        }, 3000);
    }
}

function getDate() {

    var myDate = new Date();

    //获取当前年
    var year = myDate.getFullYear();

    //获取当前月
    var month = myDate.getMonth() + 1;

    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    //获取当前时间

    var now = year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
	return now;
}

//日期时间处理
function conver(s) {
    return s < 10 ? '0' + s : s;
}



//以创建节点的形式打印日志

// function print(info){
// 	info+="\n"; 
//     console.log("info "+info);
// }

var symbols = " !\"#$%&'()*+,-./0123456789:;<=>?@";
var loAZ = "abcdefghijklmnopqrstuvwxyz";
symbols += loAZ.toUpperCase();
symbols += "[\\]^_`";
symbols += loAZ;
symbols += "{|}~";
//hex值转为ascii码
function hex2Ascii(str) {
    var valueStr = str.toLowerCase();
    var hex = "0123456789abcdef";
    var text = "";
    var i = 0;

    for (i = 0; i < valueStr.length; i = i + 2) {
        var char1 = valueStr.charAt(i);
        if (char1 == ':') {
            i++;
            char1 = valueStr.charAt(i);
        }
        var char2 = valueStr.charAt(i + 1);
        var num1 = hex.indexOf(char1);
        var num2 = hex.indexOf(char2);
        var value = num1 << 4;
        value = value | num2;

        var valueInt = parseInt(value);
        var symbolIndex = valueInt - 32;
        var ch = '?';
        if (symbolIndex >= 0 && value <= 126) {
            ch = symbols.charAt(symbolIndex)
        }
        text += ch;
    }
    return text;
}

function isEmpty(str) {
    if (str == null || typeof str == "undefined" || str.trime == "") {
        return true;
    }
    else {
        return false;
    }
}

function getFormatDateyyyyMMddHHmmss() {
    var date = new Date();
    return date.getFullYear().toString() + conver(date.getMonth() + 1) + conver(date.getDate()) + conver(date.getHours()) + conver(date.getMinutes()) + conver(date.getSeconds());
}



function getUTF8Bytes(str) {
    var bytes = [];
    var len = str.length;
    for (var i = 0; i < len; ++i) {
        var code = str.charCodeAt(i);
        if (code >= 0x10000 && code <= 0x10ffff) {
            bytes.push((code >> 18) | 0xf0);                // 第一个字节
            bytes.push(((code >> 12) & 0x3f) | 0x80);
            bytes.push(((code >> 6) & 0x3f) | 0x80);
            bytes.push((code & 0x3f) | 0x80);
        } else if (code >= 0x800 && code <= 0xffff) {
            bytes.push((code >> 12) | 0xe0);
            bytes.push(((code >> 6) & 0x3f) | 0x80);
            bytes.push((code & 0x3f) | 0x80);
        } else if (code >= 0x80 && code <= 0x7ff) {
            bytes.push((code >> 6) | 0xc0);
            bytes.push((code & 0x3f) | 0x80);
        } else {
            bytes.push(code)
        }
    }

    return bytes;
}


function toGbkBytes(str) {
    var byteArr = new Array();
    for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i);
        if (ch == '%') {
            var num = str.charAt(i + 1) + str.charAt(i + 2);
            num = parseInt(num, 16);
            num = num | (-1 << 8);
            byteArr.push(num);
            i += 2;
        } else {
            byteArr.push(ch.charCodeAt());
        }
    }
    return byteArr;
}





















