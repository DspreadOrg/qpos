# Programming Model

All methods the SDK provided can be devided into three types:
1. Init methods；
2. Interactive methods；
3. Listener methods.

The application use the init method to init the EMV card reader hardware and get an instance of the Card Reader. It then can use the interactive methods to start the communication with the card reader. During the communication process, if any message returned from the Card reader, a listener method will be invoked by the SDK package.

To avoid the application block and improve the speed of  data interaction between the smart terminal and QPOS, the SDK framework is designed to work under asynchronous mode.

# Programming Interface

## Initialization

The Class named ‘QPOSService’ is the core of SDK library. Before the APP create this core instance with the parameter of “CommunicationMode mode”, the APP must register all the sub-functions in ‘QPOSServiceListener’. Below code snipplet shows how to init the SDK.

```java
	private void open(CommunicationMode mode) {
		listener = new MyPosListener();
		pos = QPOSService.getInstance(mode);
		if (pos == null) {
			statusEditText.setText("CommunicationMode unknow");
			return;
		}
		pos.setConext(getApplicationContext());
		Handler handler = new Handler(Looper.myLooper());
		pos.initListener(handler, listener);
	}
```

The CommunicaitonMode can be 

```java
	public static enum CommunicationMode{
		AUDIO,
		BLUETOOTH_VER2,
		UART,
        USB
	}
```
The app should choose appropriate communication mode depend on it's hardware configuration.
Note, in the example above the app should realize the call back methods of MyPosListener.

The code below shows how to open the communication bridge with the open() method descripted above.
```java
		if (//we want to use Audio Jack as communication mode) {
			open(CommunicationMode.AUDIO);
			posType = POS_TYPE.AUDIO;
			pos.openAudio();
		} else if (//we want to use UART as communication mode) {
			if (isUsb) {
				open(CommunicationMode.USB);
				posType = POS_TYPE.UART;
				pos.openUsb();
			}else {
				open(CommunicationMode.UART);
				posType = POS_TYPE.UART;
				pos.openUart();
			}
			
		} else {   //We will use Bluetooth
			open(CommunicationMode.BLUETOOTH_VER2);
			posType = POS_TYPE.BLUETOOTH;
            //...
		}
```

## Get Device Information

The app can get the EMV cardreader information by issuing:

```java
		pos.getQposInfo();
```
Note the pos is the instance of QPOSService, the app get it during the initialization process.

The device information will be returned on the below call back:
```java
		@Override
		public void onQposInfoResult(Hashtable<String, String> posInfoData) {
			String isSupportedTrack1 = posInfoData.get("isSupportedTrack1") == null ? ""
					: posInfoData.get("isSupportedTrack1");
			String isSupportedTrack2 = posInfoData.get("isSupportedTrack2") == null ? ""
					: posInfoData.get("isSupportedTrack2");
			String isSupportedTrack3 = posInfoData.get("isSupportedTrack3") == null ? ""
					: posInfoData.get("isSupportedTrack3");
			String bootloaderVersion = posInfoData.get("bootloaderVersion") == null ? ""
					: posInfoData.get("bootloaderVersion");
			String firmwareVersion = posInfoData.get("firmwareVersion") == null ? ""
					: posInfoData.get("firmwareVersion");
			String isUsbConnected = posInfoData.get("isUsbConnected") == null ? ""
					: posInfoData.get("isUsbConnected");
			String isCharging = posInfoData.get("isCharging") == null ? ""
					: posInfoData.get("isCharging");
			String batteryLevel = posInfoData.get("batteryLevel") == null ? ""
					: posInfoData.get("batteryLevel");
			String hardwareVersion = posInfoData.get("hardwareVersion") == null ? ""
					: posInfoData.get("hardwareVersion");
		}

```
App can knows the hardware , firmware version and hardware configuration based on the returned information.


## Get Device ID

The device ID is use to indentifying one paticular EMV card reader. The app use below method to get the device ID:

```java
		pos.getQposId();
```

The Device ID is returned to the app by below call back.

```java
		@Override
		public void onQposIdResult(Hashtable<String, String> posIdTable) {
			String posId = posIdTable.get("posId") == null ? "" : posIdTable
					.get("posId");
		}

```


## Start Transaction

The app can start a magnatic swipe card transaction, or an EMV chip card transaction, by below method:
```java
		pos.doTrade(60);
```
The only paramter is the time out value in second. If the user is using magnatic swipe card, after timeout seconds, the transaction will be timed out.

## Set Transaction Amount

The transaction amount can be set by:

```java
			pos.setAmount(amount, cashbackAmount, "156",
									TransactionType.GOODS);
```

the setAmount method can be called before start a transaction. If it was not called, a call back will be invoked by the SDK, giving app another chance to enter the transaction amount.

```java
		@Override
		public void onRequestSetAmount() {
			pos.setAmount(amount, cashbackAmount, "156",
									TransactionType.GOODS);
        }
```

The setAmount method has below parameters: 
1. amount : how much money in cents
2. cashbackAmount : reserved for future use 
3. currency code : US Dollar,  CNY, etc
4. transactionType : which kind of transaction to be started. The transaction type can be:

```java

	public static enum TransactionType {
		GOODS, 
		SERVICES, 
		CASH,
		CASHBACK, 
		INQUIRY, 
		TRANSFER, 
		ADMIN,
		CASHDEPOSIT,
		PAYMENT
	}
```
Transaction type is used mainly by the EMV Chip card transaction, for magnetic card, app can always use GOODS.
