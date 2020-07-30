//解析posinfo的信息
function anlycPosInfo() {
    var countLen = upPLength();
    console.log(" length()--" + upPLength());
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
    var SUB = "";
    if (hardwareVersion.length > 3) {
        SUB = hardwareVersion.substr(3, hardwareVersionLen);
        hardwareVersion = hardwareVersion.substr(0, 3);
    }

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

    var isSupportedTrack1Len = getUpPByte(index++);
    var isSupportedTrack1 = byteArray2Hex(getUpPBytes(index, isSupportedTrack1Len));

    if (isSupportedTrack1 == "00") {
        isSupportedTrack1 = "false";
    } else {
        isSupportedTrack1 = "true";
    }
    index += isSupportedTrack1Len;

    var isSupportedTrack2Len = getUpPByte(index++);
    var isSupportedTrack2 = byteArray2Hex(getUpPBytes(index, isSupportedTrack2Len));
    if (isSupportedTrack2 == "00") {
        isSupportedTrack2 = "false";
    } else {
        isSupportedTrack2 = "true";
    }
    index += isSupportedTrack2Len;

    var isSupportedTrack3Len = getUpPByte(index++);
    var isSupportedTrack3 = byteArray2Hex(getUpPBytes(index, isSupportedTrack3Len));
    if (isSupportedTrack3 == "00") {
        isSupportedTrack3 = "false";
    } else {
        isSupportedTrack3 = "true";
    }
    index += isSupportedTrack3Len;

    var dataEncryptionMode = "";
    if (index < countLen) {
        var dataEncryptionModeLen = getUpPByte(index++);//加密方式
        dataEncryptionMode = byteArray2Hex(getUpPBytes(index, dataEncryptionModeLen));
        index += dataEncryptionModeLen;
    }
    console.log("dataEncryptionMode: " + dataEncryptionMode);
    var updateWorkKeyFlag = "";
    if (index < countLen) {
        var updateWorkKeyFlagLen = getUpPByte(index++);//
        updateWorkKeyFlag = byteArray2Hex(getUpPBytes(index, updateWorkKeyFlagLen));

        if (updateWorkKeyFlag == "00") {
            updateWorkKeyFlag = "false";
        } else {
            updateWorkKeyFlag = "true";
        }
        index += updateWorkKeyFlagLen;
    }
    var keyboardflag = "";
    if (index < countLen) {//是否有键盘
        var keyboardflaglen = getUpPByte(index++);//
        keyboardflag = byteArray2Hex(getUpPBytes(index, keyboardflaglen));

        if (keyboardflag == "00") {
            keyboardflag = "false";
        } else {
            keyboardflag = "true";
        }
        index += keyboardflaglen;
    }

    var batteryPercentage = "";
    if (index < countLen) {//电量百分比
        var batteryPercentagelen = getUpPByte(index++);//

        var al = getUpPBytes(index, batteryPercentagelen)[0];
        if (al > 100) {
            al = 100;
        } else if (al < 0) {
            al = 0;
        }
        batteryPercentage = al.toString(10);
        batteryPercentage = batteryPercentage + "%";
        index += batteryPercentagelen;
    }

    var dict = {isSupportedTrack1 : isSupportedTrack1,
                isSupportedTrack2 : isSupportedTrack2,
                isSupportedTrack3 : isSupportedTrack3,
                bootloaderVersion : bootloaderVersion,
                firmwareVersion   : firmwareVersion,
                isUsbConnected    : isUsbConnected,
                isCharging        : isCharging,
                batteryLevel      : batteryLevel,
                hardwareVersion   : hardwareVersion,
                SUB               : SUB,
                updateWorkKeyFlag : updateWorkKeyFlag,
                keyboardflag      : keyboardflag,
                batteryPercentage : batteryPercentage
    };
    return dict;

}

//解析posid的信息
function anlycPosId() {
    // console.log("pos id : " + byteArray2Hex(getUpPBytes(0, length())));
    var countLen = upPLength();
    var index = 0;
    var psamIdLen = getUpPByte(index++);
    var psamId = byteArray2Hex(getUpPBytes(index, psamIdLen));

    index += psamIdLen;

    var posIdLen = getUpPByte(index++);
    var posId = byteArray2Hex(getUpPBytes(index, posIdLen));
    index += posIdLen;
    console.log("posId:" + posId)

    var merchantId = "";
    var vendorCode = "";
    var deviceNumber = "";
    var psamNo = "";

    var merchantIdLen = getUpPByte(index++);//商户ID 银联标准的 15字节
    merchantId = byteArray2Hex(getUpPBytes(index, merchantIdLen));
    index += merchantIdLen;

    var vendorCodeLen = getUpPByte(index++);//厂商编号
    vendorCode = byteArray2Hex(getUpPBytes(index, vendorCodeLen));
    index += vendorCodeLen;

    if (index < countLen) {
        var deviceNumberLen = getUpPByte(index++);//设备编号
        deviceNumber = byteArray2Hex(getUpPBytes(index, deviceNumberLen));
        index += deviceNumberLen;

        var psamNoLen = getUpPByte(index++);//psam编号
        psamNo = byteArray2Hex(getUpPBytes(index, psamNoLen));
        index += psamNoLen;
    }
    //TODO add
    var csn = "";
    if (index < countLen) {
        var csnLen = getUpPByte(index++);
        csn = byteArray2Hex(getUpPBytes(index, csnLen));
        index += csnLen;
    }

    var tmk0Status = "";
    var tmk1Status = "";
    var tmk2Status = "";
    var tmk3Status = "";
    var tmk4Status = "";

    if (index < countLen) {

        var tmk0Len = getUpPByte(index++);
        tmk0Status = byteArray2Hex(getUpPBytes(index, tmk0Len));
        index += tmk0Len;

        var tmk1Len = getUpPByte(index++);
        tmk1Status = byteArray2Hex(getUpPBytes(index, tmk1Len));
        index += tmk1Len;

        var tmk2Len = getUpPByte(index++);
        tmk2Status = byteArray2Hex(getUpPBytes(index, tmk2Len));
        index += tmk2Len;

        var tmk3Len = getUpPByte(index++);
        tmk3Status = byteArray2Hex(getUpPBytes(index, tmk3Len));
        index += tmk3Len;

        var tmk4Len = getUpPByte(index++);
        tmk4Status = byteArray2Hex(getUpPBytes(index, tmk4Len));
        index += tmk4Len;


    }
    var keyboardflag = "";
    if (index < countLen) {//是否有键盘
        var keyboardflaglen = getUpPByte(index++);//
        keyboardflag = byteArray2Hex(getUpPBytes(index, keyboardflaglen));

        if (keyboardflag == "00") {
            keyboardflag = "false";
        } else {
            keyboardflag = "true";
        }
        index += keyboardflaglen;
    }
    var dict = {posId  : posId,
                csn    : csn,
                psamId : psamId
    };
    return dict;
}