document.addEventListener('DOMContentLoaded', async () => {
  console.log('Startup ----');
  let devices = await navigator.usb.getDevices();
  devices.forEach(device => {
    // prettier-ignore
    console.log(`USB Device Detected: ${device.productName}     serial# ${device.serialNumber}     vendorId: ${device.vendorId}`);
  });
});

navigator.usb.addEventListener('connect', event => {
  console.warn('A USB Device was connected');
});

navigator.usb.addEventListener('disconnect', event => {
  console.warn('A USB Device was disconnected!');
});

let button = document.getElementById('request-device');
var device;
button.addEventListener('click', async () => {
  if (button.innerHTML === 'Connect') {
    // connect to the USB device
    navigator.usb
      .requestDevice({ filters: [{ vendorId: 0x03EB }] })
      .then(device => {
        this.device = device;
        button.innerHTML = 'Disconnect';
        // prettier-ignore
        console.log(`User has selected: ${device.productName}     serial# ${device.serialNumber}     vendorId: ${device.vendorId} opened:${device.opened}`);
        console.log(device);
        OpenDevice(device);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    // disconnect the USB device
    // TODO: figure out how to release this
    device.close();
  }
});

async function OpenDevice(device) {
  await device.open();
  if (device.configuration === null) await device.selectConfiguration(1);
  await device.claimInterface(2);
  console.log('i *think* we have claimed the device at this point.');

  // control transfer -- just throwing out some random guesses here.
  await device.controlTransferOut({
    requestType: 'class',
    recipient: 'interface',
    request: 0x00,
    value: 0x0000,
    index: 0x0001
  });

  while (true) {
    let result = await device.transferIn(1, 4096);

    if (result.data) {
      if (result.status === 'ok') {
        //&& result.data.byteLength === 8) {
        console.log('nonin data received');
        var spo2 = result.data.getUint8(8);
        var pulseRate = getShortValue(
          result.data.getUint8(9),
          result.data.getUint8(10)
        );
        //var counter = getShortValue(result.data[6], result.data[7]);
        //var status = result.data[2];
        document.getElementById('spo2').innerText = `SpO2 - ${spo2}`;
        // prettier-ignore
        document.getElementById('pulseox').innerText = `PulseRate - ${pulseRate}`;
        console.log(`spo2: ${spo2}		pulse rate: ${pulseRate}`);

        // var correctCheck = getBitValue(status, 4);
        // var searching = getBitValue(status, 3);
        // var smartPoint = getBitValue(status, 2);
        // var weakSignal = getBitValue(status, 1);
        // var displaySync = getBitValue(status, 0);
      }
    }

    if (result.status === 'stall') {
      console.warn('Endpoint stalled.  Clearing.');
      await device.clearHalt(1);
    }
  }
}

var getBitValue = function(byte, bit) {
  if (bit < 0) {
    console.log('Bitmask of bit < 0 makes no sense?');
    return false;
  }
  var mask = Math.pow(2, bit);
  var numeric = byte & mask;
  return numeric !== 0;
};

var getShortValue = function(msb, lsb) {
  return msb * 256 + lsb;
};
