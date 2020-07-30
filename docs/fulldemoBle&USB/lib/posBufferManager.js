var READ_BUF_MAX_SIZE = 1024 * 10;
var dataBuffer = new ArrayBuffer(READ_BUF_MAX_SIZE);
var dataView = new DataView(dataBuffer);
var read_offset = 0;

function clearReadbuffer() {

    for (var i = 0; i < read_offset; i++) {
        dataView.setUint8(i, 0);
    }
    read_offset = 0;
}

function appendData(dView) {

    var partDataView = dView;
    for (var i = 0; i < partDataView.byteLength; i++) {

        dataView.setUint8(read_offset, partDataView.getUint8(i));
        read_offset++;
    }

}

function readBufferData() {
   
    var receivedataBuffer = new ArrayBuffer(read_offset);
    var receiveDataView = new DataView(receivedataBuffer);
    console.log("read_offset:" + read_offset);
   // printDataView(dataView);
    copyArr(dataBuffer, 0, receivedataBuffer, 0, read_offset);

    return receiveDataView;

}

function isCompleteInstruction() {
    var f = false;
    var needRead;
    console.log("isCompleteInstruction" + dataView.getUint8(0));
    if (dataView.getUint8(0) == 77) {
        var highLen = dataView.getUint8(1);
        var Len = dataView.getUint8(2);
        needRead = (highLen - highLen % 16) / 16 * Math.pow(16, 3) + highLen % 16 * Math.pow(16, 2) + Len;
        console.log("isCompleteInstruction needRead:" + needRead);
        if (read_offset == needRead + 4) {
            f = true;
        }

    }

    else if (dataView.getUint8(0) == 77) {
        var highLen = dataView.getUint8(1);
        var Len = dataView.getUint8(2);
        needRead = (highLen - highLen % 16) / 16 * Math.pow(16, 3) + highLen % 16 * Math.pow(16, 2) + Len;
        console.log("isCompleteInstruction needRead:" + needRead);
        if (read_offset == needRead + 4) {
            f = true;
        }

    }
    return f;

}
