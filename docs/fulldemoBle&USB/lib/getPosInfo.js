function getQPosInfo() {
    CommandDownlink(0x11, 0x30, 5);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));

    startSession(new Uint8Array(datas).buffer, onQposInfoResult, 5);
}

function onQposInfoResult(receivedData) {
    console.log('onQposInfoResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));
       
    if (getResult() == 0) {
            anlycPosInfo();
        } else {
            console.log("onQposInfoResult" +"error");
        }
}

function getQPosId() {
    CommandDownlink(0x10, 0x00, 5);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onQposIdResult, 5);
}

function onQposIdResult(receivedData) {
    console.log('onQposIdResult----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));
    
    if (getResult() == 0) {
         anlycPosId();
        } else {
            console.log("onQposIdResult" + "error");
        }
}

function setShutDownTime(time) {
    if (time > 0xFFFF)
        return;
    var paras = intToHex(time);
    CommandDownlink2(0x20, 0xd0, 5, paras);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onSetShutDownTime, 5);
}

function onSetShutDownTime(receivedData) {
    console.log('onSetShutDownTime----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));

    if (getResult() == 0) {
        console.log("onSetShutDownTime" + "true");

    } else {
        console.log("onSetShutDownTime" + "error");
    }
}

function getShutDownTime() {
    
    CommandDownlink(0x20, 0xE0, 5);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
   startSession(new Uint8Array(datas).buffer, onGetShutDownTime, 5);
}

function onGetShutDownTime(receivedData) {
    console.log('onGetShutDownTime----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));

    if (getResult() == 0) {

        var time = byteArray2Hex(getUpPBytes(0, upPLength()));
        console.log("onGetShutDownTime" + time);

    } else {
        console.log("onGetShutDownTime" + "error");
    }
}

function setSleepModeTime(time) {
    if (time > 0xFFFFFFFF)
        return;
    var arrs = intToHex(time);
    var paras = new Array(4);
    switch (arrs.length) {
            case 1:
                paras[0] = 0;
                paras[1] = 0;
                paras[2] = 0;
                paras[3] = arrs[0];
                break;
            case 2:
                paras[0] = 0;
                paras[1] = 0;
                paras[2] = arrs[0];
                paras[3] = arrs[1];
                break;
            case 3:
                paras[0] = 0;
                paras[1] = arrs[0];
                paras[2] = arrs[1];
                paras[3] = arrs[2];
                break;
            case 4:
                paras = arrs;
                break;
        }
    CommandDownlink2(0x22, 0x70, 5, paras);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onSetSleepModeTime, 5);
}

function onSetSleepModeTime(receivedData) {
    console.log('onSetSleepModeTime----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));

    if (getResult() == 0) {
        console.log("onSetSleepModeTime" + "true");

    } else {
        console.log("onSetSleepModeTime" + "error");
    }
}

function getSleepModeTime() {
    CommandDownlink(0x22, 0x80, 10);
    var datas = getDownPBytes();
    console.log(byteArray2Hex(datas));
    startSession(new Uint8Array(datas).buffer, onGetSleepModeTime, 5);
}

function onGetSleepModeTime(receivedData) {
    console.log('onGetSleepModeTime----------' + receivedData + 'commid----------' + receivedData.substring(6, 8));

    if (getResult() == 0) {
        console.log("onGetSleepModeTime" + "true");

    } else {
        console.log("onGetSleepModeTime" + "error");
    }
}
