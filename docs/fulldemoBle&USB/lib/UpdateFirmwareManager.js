var UpdateFirmwareManager = function (listener) {
    writeObj(listener);
    mListener = listener;
    console.log("UpdateFirmwareManager init" + mListener);
    writeObj(this);
}

var mListener;

UpdateFirmwareManager.prototype.updatePosFirmware = function(updateData,address){
    updatePosFirmware(updateData,address);
}

function updatePosFirmware(updateData,address) {
	CommandDownlink(0x11, 0x30, 5);
	var datas = getDownPBytes();
	console.log(byteArray2Hex(datas));

	startSysSession(new Uint8Array(datas).buffer, null, 5).then(
        function (data) {
        	if (getResult() == 0) {

        		var index = 0;
        		var bootloaderVersionLen = getUpPByte(index++);
        		var bootloaderVersion = byteArray2Hex(getUpPBytes(index, bootloaderVersionLen));
        		bootloaderVersion = hex2Ascii(bootloaderVersion);
        		index += bootloaderVersionLen;

        		var firmwareVersionLen = getUpPByte(index++);
        		var firmwareVersion = byteArray2Hex(getUpPBytes(index, firmwareVersionLen));
        		firmwareVersion = hex2Ascii(firmwareVersion);
        		index += firmwareVersionLen;

        		var hardwareVersionLen = getUpPByte(index++);
        		var hardwareVersion = byteArray2Hex(getUpPBytes(index, hardwareVersionLen));
        		hardwareVersion = hex2Ascii(hardwareVersion);
        		index += hardwareVersionLen;

        		var batteryLevelLen = getUpPByte(index++);
        		console.log("batteryLevelLen:" + batteryLevelLen);
        		var batteryLevel = byteArrayToInt(getUpPBytes(index, batteryLevelLen)) + " mV";
        		index += batteryLevelLen;

        		var isChargingLen = getUpPByte(index++);
        		var isCharging = byteArray2Hex(getUpPBytes(index, isChargingLen));
        		if (isCharging == "00") {
        			isCharging = "false";
        		} else {
        			isCharging = "true";
        		}
        		index += isChargingLen;

        		var isUsbConnectedLen = getUpPByte(index++);
        		var isUsbConnected = byteArray2Hex(getUpPBytes(index, isUsbConnectedLen));
        		if (isUsbConnected == "00") {
        			isUsbConnected = "false";
        		} else {
        			isUsbConnected = "true";
        		}
        		index += isUsbConnectedLen;
                if (isCharging.search("true") == 0 || isUsbConnected.search("true") == 0) {
                    console.log("<<<<<<<<<<<<disConnect start: is charging " + isCharging);
                    setUpdateData(updateData);
                    console.log("begin updating===");
        			startUpdateFirmware();
        		}
        	}

        },
        function (reason) {
            console.log(reason);
            setUpdateData(updateData);
        	startUpdateFirmware();
        }
    );

}

var g_UpgPackDataLen = 0;
var g_UpgPackData = new Array();
var g_UpgPackDataIndex = 0;
var upgPack_totalLen;
function setUpdateData(data) {
    var array = hexStr2Bytes(data);
    var packlen = array.length - 32;
    g_UpgPackData = new Array(packlen);
    arrCopyArr(array, 32, g_UpgPackData, 0, packlen);
    upgPack_totalLen = packlen;
    g_UpgPackDataLen = packlen;
    console.log("data len:" + g_UpgPackDataLen);
    g_UpgPackDataIndex = 0;
}


function startUpdateFirmware() {
    if (g_UpgPackDataLen == 0) {
        console.log("Success!");
        return;
    }
    console.log("updateData: "+g_UpgPackData);
    
    var T = g_UpgPackData[g_UpgPackDataIndex];

    var LBytes = new Array(2);
        LBytes[0] = g_UpgPackData[g_UpgPackDataIndex +1];
        LBytes[1] = g_UpgPackData[g_UpgPackDataIndex +2];

    var L = byteArrayToInt(LBytes);

    var V = new Array(L);
    arrCopyArr(g_UpgPackData, g_UpgPackDataIndex + 3, V, 0, L);
    console.log("g_UpgPackDataIndex: " + g_UpgPackDataIndex + "T: " + T + " ,L: " + L + " ,V: " + byteArray2Hex(V));

    g_UpgPackDataIndex += (L + 3);
    g_UpgPackDataLen -= (L + 3);

    console.log("startUpdateFirmware-----------");

    switch (T) {
        case 0x02:
            doWorkbyT0x02(V);

            break;
        case 0x03:
            doWorkbyT0x03();

            break;
        case 0x04:
            doWorkbyT0x04();

            break;
        case 0x11:
            console.log(" 0x11 start" + getDate());
            setTimeout(function () {
                console.log(" 0x11 excute" + getDate());
                //doWorkbyT0x11(V);
                writePromise(new Uint8Array(V).buffer);
                startUpdateFirmware();
            }, 100);
            break;
        case 0x12:
            doWorkbyT0x12(V);
            break;
        default:
            break;
    }

}

function doWorkbyT0x02(V) {
    var time = byteArrayToInt(V);
    time *= 2;
    console.log(" Thread.sleep(" + time + ")" + getDate());
    setTimeout(function () {
        console.log("----------->device open" + getDate());
        startUpdateFirmware();
    }, time * 1000);
}

var conCou = 0; 
function doWorkbyT0x03() {

    console.log("open connecttion ...");
    openAndConnectDevice().then(
        function (data) {
            console.log("+++++++++++++++: open success ");
            startUpdateFirmware(); 
        },
        function (reason) {
            console.log(reason);
            console.log("+++++++++++++++: open  failed ");
            conCou++;
            if (conCou < 3) {
                setTimeout(function () {
                doWorkbyT0x03();
            }, 500);
            }

        }
    );       
}

function doWorkbyT0x04() {
    console.log("closeAndConnectDevice" + " ...");
    closeAndConnectDevice(function () {
        startUpdateFirmware(); 
    });
}

function doWorkbyT0x11(V) {
    setUpdate(true);
    startSysSession(new Uint8Array(V).buffer, null,5).then(
        function (data) {
            var dataBytes = hexStr2Bytes(data);
            if (dataBytes.length == 0 || dataBytes[6] != 0) {
                console.log("0x11 update failed ");
                setUpdate(false);
                return;
            }
            setUpdate(false);
            startUpdateFirmware();
        },
        function (reason) {
            setUpdate(false);
            console.log(reason);
            console.log("UPDATE_STATE.FAILED");
            startUpdateFirmware();
        }
    );
}
function doWorkbyT0x12(V) {
    startSysSession(new Uint8Array(V).buffer, null, 5).then(
        function (data) {
            if (getResult() == 0) {
                if (commandID() == CmdId.CMDID_CRCERROR) {
                    console.log("Read: " + "UPDATE_STATE.PACKED_ERROR");
                }
                startUpdateFirmware(); 
            }

        },
        function (reason) {
            console.log(reason);
            console.log("Read: " + "UPDATE_STATE.LOWPOWER");
        }
    );
}
