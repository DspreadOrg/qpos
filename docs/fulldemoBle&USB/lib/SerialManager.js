var SerialManager = function (onResult) {

    writeObj(onResult);
    mOnResult = onResult;
    console.log("SerialManager init" + mOnResult);
    writeObj(mOnResult);
}

var mOnResult;

var connectionId;

    var onConnect = function (connectionInfo) {
            if(typeof(connectionInfo) == "undefined") {
        //             print("Serial port connection error, please select another serial port")

                
    }
    else {
                chrome.serial.onReceive.addListener(onReceiveCallback); //指定串口数据接收函数
                connectionId = connectionInfo.connectionId;
        // print("connection succeeded")
        // print(connectionId)

            
    }

};

var onReceiveCallback = function (info) {
    console.log('oncharacteristicchanged' + getDate());
    setNotifyReceiveData(true);
    var buffer = info.data;
    var dataView = new DataView(buffer);
    printDataView(dataView);
    appendData(dataView);
}

function connectToDevice(chuankou) {

            chrome.serial.connect(chuankou, {
                    bitrate: 9600
                
    }, onConnect);
}



function disconnectToDevice(disConnet) {

    chrome.serial.disconnect(connectionId, disConnet)
}

var notifyReceiveData = false;

function setNotifyReceiveData(recFlag) {
    notifyReceiveData = recFlag;

}

function getNotifyReceiveData() {

    return notifyReceiveData;
}


var mUpdateFlag = false;
function setUpdate(updateFlag) {
    mUpdateFlag = updateFlag;
}

function packageInstructionQue() {
    CommandDownlink4(CmdId.CMDID_QUERY, 0,
        0, 0x5A);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    return new Uint8Array(datas).buffer;
}

function packageInstructionPart() {

    CommandDownlink4(
        CmdId.CMDID_PART_DATA, 0, 0, 0x5A);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    return new Uint8Array(datas).buffer;

}

function packageInstructionReset() {
    CommandDownlink4(CmdId.CMDID_RESET, 0,
        0, 15);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    return new Uint8Array(datas).buffer;
}

//Write data
function basicWriteBle(buffer) {
    chrome.serial.send(connectionId, buffer, console.log.bind(console));
}

function writePromise(buf) {
    setNotifyReceiveData(false);
    var writeBuf = buf;
    console.log("Data write：" + byteArray2Hex(writeBuf));
    clearReadbuffer();
    basicWriteBle(writeBuf);
    console.log("*******************test write result****************");
}


SerialManager.prototype.startSession = function (buf, onReceiveDate, delay) {
    startSession(buf, onReceiveDate, delay);
}

var bufData = "";
var bufLen = 0;
var result = null;
function startSession(buf, onReceiveDate, delay) {
    delay *= 100;
    result = null;
    writePromise(buf);
    console.log('writePromise' + getDate());
    function onWaitingNotifyDataFun() {
        delay--;
        readBleDataBuffer(onReceiveDate, delay, onWaitingNotifyDataFun);
    }
    readBleDataBuffer(onReceiveDate, delay, onWaitingNotifyDataFun);
}


function readBleDataBuffer(onReceiveDate, delay, onWaitingNotifyData) {
    setTimeout(function () {
        //console.log("readBleDataBuffer:time:" + delay);
        if (delay <= 0) {
            initPartBuffer();
            console.log("onError(Error.TIMEOUT)" + getDate());
            return;
        }
        //  console.log('readBufferData' + getDate());
        if (!getNotifyReceiveData()) {
            //  console.log('no notify data to return----------------')
            onWaitingNotifyData();
            return;
        }
        var receiveDa = readBufferData();
        if (receiveDa == null) {
            initPartBuffer();
            console.log("onError(Error.UNKNOWN)");
            return;
        }
        printDataView(receiveDa);
        // console.log('isCompleteInstruction----------------' + isCompleteInstruction());
        if (isCompleteInstruction()) {
            var receivedData = dataView2Hex(receiveDa);
            if (receivedData.substring(6, 8) != "24") {
                if (receivedData.substring(6, 8) == "36") {
                    bufLen = parseInt(receivedData.substring(14, 18), 16);
                    bufData += receivedData.substring(18, 18 + bufLen * 2);
                    console.log('onReceiveDateListener----------------' + "Data unpacking");
                    startSession(packageInstructionPart(), onReceiveDate, 0x5A);
                } else if (receivedData.substring(6, 8) == "23"
                     || receivedData.substring(6, 8) == "41"
                     || receivedData.substring(6, 8) == "43"
                     || receivedData.substring(6, 8) == "42"
                     || receivedData.substring(6, 8) == "52") {

                    startSession(packageInstructionQue(), onReceiveDate, 0x5A);
                    console.log('onReceiveDateListener----------------' + "Send inquiry");
                } else {
                    packet2(hexStr2Bytes(receivedData));
                    mOnResult.checkCmdId();
                }

            } else {
                console.log('onReceiveDateListener----------------' + "Complete data");
                if (bufLen != 0) {
                    var len = parseInt(receivedData.substring(14, 18), 16);
                    var dataStr = receivedData.substring(8, 18) + bufData + receivedData.substring(18, 18 + len * 2);
                    console.log('Partially stitching complete data----------------' + dataStr);
                    packageCommandUplink(dataStr);
                } else {
                    console.log('Complete data----------------' + receivedData);
                    packet2(hexStr2Bytes(receivedData));
                }

                console.log('Packaged data----------------' + byteArray2Hex(getAllBytes()));
                initPartBuffer();
                if (validPCRC()) {
                    var f = mOnResult.checkCmdId();
                    if (!f) {
                        return;
                    }

                    if (onReceiveDate != null) {
                        onReceiveDate(byteArray2Hex(getAllBytes()));
                    } else {
                        result = byteArray2Hex(getAllBytes());
                    }
                }

            }
        } else {
            console.log('reading data----------------')
            onWaitingNotifyData();
            return;
        }

    }, 10)
}

function initPartBuffer() {
    bufData = "";
    bufLen = 0;
}

SerialManager.prototype.startSysSession = function (buf, onReceiveDate, delay) {
    return startSysSession(buf, onReceiveDate, delay);
}

function startSysSession(buf, onReceiveDate, delay) {
    return new Promise((resolve, reject) => {
        result = null;
        writePromise(buf);
        delay *= 100;
        console.log('writePromise' + getDate());
        function onWaitingNotifyDataFun() {
            delay--;
            readSysBleDataBuffer(onReceiveDate, delay, onWaitingNotifyDataFun, resolve, reject);
        }
        readSysBleDataBuffer(onReceiveDate, delay, onWaitingNotifyDataFun, resolve, reject);

    });
}

function readSysBleDataBuffer(onReceiveDate, delay, onWaitingNotifyData, resolve, reject) {

    setTimeout(function () {
        if (delay <= 0) {
            initPartBuffer();
            reject("time out");
            return;
        }
        if (!getNotifyReceiveData()) {
            onWaitingNotifyData();
            return;
        }
        var receiveDa = readBufferData();
        if (receiveDa == null) {
            initPartBuffer();
            reject('onError(Error.UNKNOWN)');
            return;
        }
        printDataView(receiveDa);
        if (isCompleteInstruction() && !mUpdateFlag) {
            var receivedData = dataView2Hex(receiveDa);
            if (receivedData.substring(6, 8) != "24") {
                if (receivedData.substring(6, 8) == "36") {
                    bufLen = parseInt(receivedData.substring(14, 18), 16);
                    bufData += receivedData.substring(18, 18 + bufLen * 2);
                    console.log('onReceiveDateListener----------------' + "Data unpacking");
                    // startSysSession(packageInstructionPart(), null, 5);

                    result = null;
                    writePromise(packageInstructionPart());
                    var delay = 500;
                    console.log('writePromise' + getDate());
                    function onWaitingNotifyDataFun() {
                        delay--;
                        readSysBleDataBuffer(onReceiveDate, delay, onWaitingNotifyDataFun, resolve, reject);
                    }
                    readSysBleDataBuffer(onReceiveDate, delay, onWaitingNotifyDataFun, resolve, reject);

                } else if (receivedData.substring(6, 8) == "23"
                     || receivedData.substring(6, 8) == "41"
                     || receivedData.substring(6, 8) == "43"
                     || receivedData.substring(6, 8) == "42"
                     || receivedData.substring(6, 8) == "52") {

                    //startSysSession(packageInstructionQue(), null, 5);

                    result = null;
                    writePromise(packageInstructionQue());
                    var delay = 500;
                    console.log('writePromise' + getDate());
                    function onWaitingNotifyDataFun() {
                        delay--;
                        readSysBleDataBuffer(onReceiveDate, delay, onWaitingNotifyDataFun, resolve, reject);
                    }
                    readSysBleDataBuffer(onReceiveDate, delay, onWaitingNotifyDataFun, resolve, reject);

                    console.log('onReceiveDateListener----------------' + "Send inquiry");
                } else {
                    packet2(hexStr2Bytes(receivedData));
                    mOnResult.checkCmdId();
                }

            } else {
                console.log('onReceiveDateListener----------------' + "Complete data");
                if (bufLen != 0) {
                    var len = parseInt(receivedData.substring(14, 18), 16);
                    var dataStr = receivedData.substring(8, 18) + bufData + receivedData.substring(18, 18 + len * 2);
                    console.log('Partially stitching complete data----------------' + dataStr);
                    packageCommandUplink(dataStr);
                } else {
                    console.log('Complete data----------------' + receivedData);
                    packet2(hexStr2Bytes(receivedData));
                }

                console.log('Packaged data----------------' + byteArray2Hex(getAllBytes()));
                initPartBuffer();
                if (validPCRC()) {
                    var f = mOnResult.checkCmdId();
                    if (!f) {
                        reject('data verify error');
                        return;
                    }

                    if (onReceiveDate != null) {
                        console.log('complate true data----------------');
                        onReceiveDate(byteArray2Hex(getAllBytes()));
                    } else {
                        console.log('complate true data----------------');
                        result = byteArray2Hex(getAllBytes());
                        resolve(result);
                    }
                }

            }
        } else if (mUpdateFlag) {
            var bytes = new Array(receiveDa.byteLength);
            for (var i = 0; i < receiveDa.byteLength; i++) {
                bytes[i] = receiveDa.getUint8(i);
            }
            if (receiveDa.getUint8(11) == calPCRC(bytes)) {

                if (onReceiveDate != null) {
                    onReceiveDate(receivedData);
                } else {
                    result = receivedData;
                    resolve(result);
                }
            }
        } else {
            console.log('reading data----------------')
            onWaitingNotifyData();
        }

    }, 10)

}
