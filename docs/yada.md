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


