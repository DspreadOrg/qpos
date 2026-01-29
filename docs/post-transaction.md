## MSR&NFC Card Transaction

Magstripe and NFC card transaction is pretty simple. 
After the app start a transaction, if the user use a magnatic card or a NFC card, below callback will be called feeding the app magnatic card related information. The app then use the information returned for further processing.

```java
    @Override
    public void onDoTradeResult(DoTradeResult result, Hashtable<String, String> decodeData) {
         if (result == DoTradeResult.ICC) {
            statusEditText.setText(getString(R.string.icc_card_inserted));
            TRACE.d("EMV ICC Start");
            pos.doEmvApp(EmvOption.START);
         } else if (result == DoTradeResult.MCR) {
            String maskedPAN = decodeData.get("maskedPAN");
            String expiryDate = decodeData.get("expiryDate");
            String cardHolderName = decodeData.get("cardholderName");
            String ksn = decodeData.get("ksn");
            String serviceCode = decodeData.get("serviceCode");
            String track1Length = decodeData.get("track1Length");
            String track2Length = decodeData.get("track2Length");
            String track3Length = decodeData.get("track3Length");
            String encTracks = decodeData.get("encTracks");
            String encTrack1 = decodeData.get("encTrack1");
            String encTrack2 = decodeData.get("encTrack2");
            String encTrack3 = decodeData.get("encTrack3");
            String partialTrack = decodeData.get("partialTrack");
            String pinKsn = decodeData.get("pinKsn");
            String trackksn = decodeData.get("trackksn");
            String pinBlock = decodeData.get("pinBlock");
            String encPAN = decodeData.get("encPAN");
            String trackRandomNumber = decodeData.get("trackRandomNumber");
            String pinRandomNumber = decodeData.get("pinRandomNumber");
         } else if ((result == DoTradeResult.NFC_ONLINE) || (result == DoTradeResult.NFC_OFFLINE)) {
            String formatID = decodeData.get("formatID");
            String maskedPAN = decodeData.get("maskedPAN");
            String expiryDate = decodeData.get("expiryDate");
            String cardHolderName = decodeData.get("cardholderName");
            String serviceCode = decodeData.get("serviceCode");
            String track1Length = decodeData.get("track1Length");
            String track2Length = decodeData.get("track2Length");
            String track3Length = decodeData.get("track3Length");
            String encTracks = decodeData.get("encTracks");
            String encTrack1 = decodeData.get("encTrack1");
            String encTrack2 = decodeData.get("encTrack2");
            String encTrack3 = decodeData.get("encTrack3");
            String partialTrack = decodeData.get("partialTrack");
            String pinKsn = decodeData.get("pinKsn");
            String trackksn = decodeData.get("trackksn");
            String pinBlock = decodeData.get("pinBlock");
            String encPAN = decodeData.get("encPAN");
            String trackRandomNumber = decodeData.get("trackRandomNumber");
            String pinRandomNumber = decodeData.get("pinRandomNumber");
            Hashtable<String, String> h = pos.getNFCBatchData(); // By calling this method, you can obtain a list of NFC tags.  
         } else if ((result == DoTradeResult.NFC_DECLINED)) {
            statusEditText.setText(getString(R.string.transaction_declined));
         } else if (result == DoTradeResult.PLS_SEE_PHONE) {
            statusEditText.setText(getString(R.string.pls_see_phone));
		 }  
    }
```

Below table describes the meaning of each data element SDK returned:

| Key            | Description                              |
| -------------- | ---------------------------------------- |
| maskedPAN      | Masked card number showing at most the first 6 and last 4 digits with in-between digits masked by “X” |
| expiryDate     | 4-digit in the form of YYMM in the track data |
| cardHolderName | The cardholder name as seen on the card. This can be up to 26 characters. |
| serviceCode    | 3-digit service code in the track data   |
| track1Length   | Length of Track 1 data                   |
| track2Length   | Length of Track 2 data                   |
| track3Length   | Length of Track 3 data                   |
| encTracks      | Reserved                                 |
| encTrack1      | Encrypted track 1 data with T-Des encryption key derived from DATA-key to be generated with trackksn and IPEK |
| encTrack2      | Encrypted track 2 data with T-Des encryption key derived from DATA-key to be generated with trackksn and IPEK |
| encTrack3      | Encrypted track 3 data with T-Des encryption key derived from DATA-key to be generated with trackksn and IPEK |
| partialTrack   | Reserved                                 |
| trackksn       | KSN of the track data                    |

The track data returned in the hashtable is encrytped. It can be encrypted by Dukpt Data Key Variant 3DES CBC mode, or by Dukpt Data Key 3DES CBC mode. Per ANSI X9.24 2009 version request, The later (Data Key with 3DES CBC mode) is usually a recommended choice.

### Decoding Track Data Encrypted with Data Key

Below is another example, the track data is encrypted using data key with 3DES CBC mode (per ANSI X9.24 2009 version request)

```
01-21 04:46:26.764: D/POS_SDK(30241): decodeData: {track3Length=0, track2Length=32, expiryDate=1011, encTrack3=, encPAN=, encTrack1=22FB2E931F3EFAFC8C3899AB779F3719E75D392365DB748EEA789560EEB7714D84AB7FFA5B2E162C9BD566D03DCD240FC9D316CAC4015B782294365F9062CA0A, pinRandomNumber=, encTrack2=153CEE49576C0B709515946D991CB48368FEA0375837ECA6, trackRandomNumber=, trackksn=00000332100300E00002, maskedPAN=622526XXXXXX5453, cardholderName=MR.ZHOU CHENG HAO         , partialTrack=, encTracks=153CEE49576C0B709515946D991CB48368FEA0375837ECA6, psamNo=, formatID=30, track1Length=68, pinKsn=, serviceCode=106, ksn=, pinBlock=}
01-21 04:46:26.766: D/POS_SDK(30241): swipe card:Card Swiped:Format ID: 30
01-21 04:46:26.766: D/POS_SDK(30241): Masked PAN: 622526XXXXXX5453
01-21 04:46:26.766: D/POS_SDK(30241): Expiry Date: 1011
01-21 04:46:26.766: D/POS_SDK(30241): Cardholder Name: MR.ZHOU CHENG HAO   
01-21 04:46:26.766: D/POS_SDK(30241): trackksn: 00000332100300E00002
01-21 04:46:26.766: D/POS_SDK(30241): Service Code: 106
01-21 04:46:26.766: D/POS_SDK(30241): Track 1 Length: 68
01-21 04:46:26.766: D/POS_SDK(30241): Track 2 Length: 32
01-21 04:46:26.766: D/POS_SDK(30241): Track 3 Length: 0
01-21 04:46:26.766: D/POS_SDK(30241): Encrypted Tracks: 153CEE49576C0B709515946D991CB48368FEA0375837ECA6
01-21 04:46:26.766: D/POS_SDK(30241): Encrypted Track 1: 22FB2E931F3EFAFC8C3899AB779F3719E75D392365DB748EEA789560EEB7714D84AB7FFA5B2E162C9BD566D03DCD240FC9D316CAC4015B782294365F9062CA0A
01-21 04:46:26.766: D/POS_SDK(30241): Encrypted Track 2: 153CEE49576C0B709515946D991CB48368FEA0375837ECA6
01-21 04:46:26.766: D/POS_SDK(30241): Encrypted Track 3: 
01-21 04:46:26.766: D/POS_SDK(30241): pinKsn: 00000332100300E000C6
01-21 04:46:26.766: D/POS_SDK(30241): pinBlock: 377D28B8C7EF080A
01-21 04:46:26.766: D/POS_SDK(30241): encPAN: 
01-21 04:46:26.766: D/POS_SDK(30241): trackRandomNumber: 
01-21 04:46:26.766: D/POS_SDK(30241): pinRandomNumber: 
```

The track ksn 00000332100300E00002 can be used to decode the track data:

Track 1 data:22FB2E931F3EFAFC8C3899AB779F3719E75D392365DB748EEA789560EEB7714D84AB7FFA5B2E162C9BD566D03DCD240FC9D316CAC4015B782294365F9062CA0A

Track 2 data:153CEE49576C0B709515946D991CB48368FEA0375837ECA6

Below python script demostrate how to decode track data encrypted with DataKey in CBC mode:

```python
def GetDataKeyVariant(ksn, ipek):
    key = GetDUKPTKey(ksn, ipek)
    key = bytearray(key)
    key[5] ^= 0xFF
    key[13] ^= 0xFF
    return str(key) 

def GetDataKey(ksn, ipek):
    key = GetDataKeyVariant(ksn, ipek)
    return str(TDES_Enc(key,key))

def TDES_Dec(data, key):
    t = triple_des(key, CBC, "\0\0\0\0\0\0\0\0",padmode=None)
    res = t.decrypt(data)
    return res

def decrypt_card_info(ksn, data):
    BDK = unhexlify("0123456789ABCDEFFEDCBA9876543210")
    ksn = unhexlify(ksn)
    data = unhexlify(data)
    IPEK = GenerateIPEK(ksn, BDK)
    DATA_KEY = GetDataKey(ksn, IPEK)
    print hexlify(DATA_KEY)
    res = TDES_Dec(data, DATA_KEY)
    return hexlify(res)

```
Using data key variant to decrypt track 1, will get:

```
16259249 54964104 16598554 553FADC8 EEA8BF50 23A25BA7 02886F00 00000000 0003E450 45145059 15D44964 10653590 41041041 F0000000 00000000 00000000
```

Each character in Track 1 is 6 bits in length, 4 characters are packed into 3 bytes. Each character is mapped from 0x20 to 0x5F. So to get the real ASCII value of each charactor, you need to add 0x20 to each decoded 6 bits.

> For example, the leading 3 bytes of above track 1 data is 16,25,92
>
> Which in binary is: 00010110 00100101 10010010
> Unpacked them to 4 bytes: 000101 100010 010110 010010
> Which in binary is:05221612
> Add 0x20 to each byte:25423632
> Which is in ASCII :%B62

Below java script demonstrate how to decode track1 data :

```java
    public static String decodeTrack1(String compressedTrack1) {
        String resultTrack1 = "" ;
        for(int i = 0; i<compressedTrack1.length()/6; i++) {
            //1. convert every 6chars(3bytes) to binary string
            String sub = compressedTrack1.substring(i * 6, (i + 1) * 6);
            int threeByteInt = Integer.parseInt(sub, 16);
            BigInteger bigInter = BigInteger.valueOf(threeByteInt);
            String strBinary = bigInter.toString(2);
            //BigInteger.toString(radix) will miss leading 0s, so need padding 0 at the begging with length of 3byte(24 bits)
            String withLeadingZeros = String.format("%24s", strBinary).replace(' ', '0');

            //2. group binary result on every 6 binary chars into 4 groups (bytes)
            byte[] fourBytes = new byte[]{0x00, 0x00, 0x00, 0x00};
            for (int j = 0; j < withLeadingZeros.length() / 6; j++) {
                String byteStr = withLeadingZeros.substring(j * 6, (j + 1) * 6);
                fourBytes[j] = Byte.parseByte(byteStr, 2);
                fourBytes[j] += 0x20;
            }
            //3. append each 4bytes array to result string
            resultTrack1 += new String(fourBytes);
        }
        return resultTrack1;
    }
```

After decode, you can get the track 1 data:

> %B6225260006685453^MR.ZHOU CHENG HAO         ^10111061742600936000000? 

Using data key to decrypt track 2, will get: 

> 62252600 06685453 D1011106 17426936 FFFFFFFF FFFFFFFF 

Note：

​	“D” is stand for “=”

​	So **PAN**=6225260006685453；"**D**"=Separater; **Expiry Date**=1011; **Service Code**=106; **Random**=17426936 

### Decoding PIN 

The QPOS will also send the encryted PIN to the mobile application:
```
10-07 11:37:49.571: V/vahid(20753): ???? ????? ??:Format ID: 30
10-07 11:37:49.571: V/vahid(20753): Masked PAN: 621000XXXXXXXXX0004
10-07 11:37:49.571: V/vahid(20753): Expiry Date: 2900
10-07 11:37:49.571: V/vahid(20753): Cardholder Name:
...
01-21 04:46:26.766: D/POS_SDK(30241): pinKsn: 0C110AF0000001E00060
01-21 04:46:26.766: D/POS_SDK(30241): pinBlock: 371F3EE7E56AC550
...
```

Below python script demostrate how to decode PINBLOCK:

```python
def GetPINKeyVariant(ksn, ipek):
    key = GetDUKPTKey(ksn, ipek)
    key = bytearray(key)
    key[7] ^= 0xFF
    key[15] ^= 0xFF
    return str(key)

def TDES_Dec(data, key):
    t = triple_des(key, CBC, padmode=None)
    res = t.decrypt(data)
    return res

def decrypt_pinblock(ksn, data):
    BDK = unhexlify("0123456789ABCDEFFEDCBA9876543210")
    ksn = unhexlify(ksn)
    data = unhexlify(data)
    IPEK = GenerateIPEK(ksn, BDK)
    PIN_KEY = GetPINKeyVariant(ksn, IPEK)
    print hexlify(PIN_KEY)
    res = TDES_Dec(data, PIN_KEY)
    return hexlify(res)

if __name__ == "__main__":
    KSN = "0C110AF0000001E00060"
    DATA = "371F3EE7E56AC550"
    #DATA="1909568B7256B930EC0DFAB30061B640F24CD3CD0006D349"
    print decrypt_pinblock(KSN, DATA)

```

Decode the Track 2 data using the method descripted before: 

> 6210003652125010004D29000200000101412FFFFFFFFFFF

The decrypted PINBLOCK (formated Pin data) is: 041127ADEDAFEFFF
The real PIN value can be caculated using formated pin data and PAN as inputs, according to ANSI X9.8. Below is an example:

* 1) PAN: 6210003652125010004
* 2) 12 right most PAN digits without checksum: 365212501000
* 3) Add 0000 to the left: 0000365212501000
* 4) XOR (#3) and Formated PIN Data 

> XOR (0000365212501000, 041127ADEDAFEFFF) = 041111FFFFFFFFFF
> In our example, the plain PIN is 4 bytes in length with data "1111"

## Chip Card Transaction

EMV Chip card transaction is much more complicate than magnetic swipe card transaction. The EMV kernel inside the device may need a lot of information to process the transaction, including:

1. PIN from the card holder
2. Current time from the application
3. Preferred EMV application from card holder
4. The process result from the bank (card issuer) for the transaction

### Start Chip Card Transaction

The app start the EMV transaction by calling
```java
	pos.doEmvApp(EmvOption.START);
```
This is usually happens inside the call back of onDoTradeResult(), as below demo code shows:

```java
	@Override
	public void onDoTradeResult(DoTradeResult result, Hashtable<String, String> decodeData) {
		 if (result == DoTradeResult.ICC) {
			 statusEditText.setText(getString(R.string.icc_card_inserted));
			 TRACE.d("EMV ICC Start")
			 pos.doEmvApp(EmvOption.START);
		 }
	}	
```    

### Input PIN 

CR100：The PIN information can be sent to the EMV kernel by:
1. input the plaintext pin
```java
	@Override
	public void onRequestSetPin() {
		 pos.sendPin("123456"); 
		 //pos.bypassPin();    //Bypass PIN Entry
		 //pos.cancelPin();   //Cancel the transaction
	}
```
2. input the cipher pinblock on the client app side
```java
    String newPin = "";
    //this part is used to enctypt the plaintext pin with random seed
    if (pos.getCvmKeyList() != null && !("").equals.pos.getCvmKeyList()) {
        String keyList = Util.convertHexToString(getCvmKeyList());
        for (int i = 0; i < pin.length(); i++) {
            for (int j = 0; j < keyList.length(); j++) {
                 if (keyList.charAt(j) == pin.charAt(i)) {
                     newPin = newPin + Integer.toHexString(j) + "";
                     break;
                 }
            }
        }
    }
    String pinBlock = buildCvmPinBlock(pos.getEncryptData(), newPin);// build the ISO format4 pin block
    sendCvmPin(pinBlock, true);
```
The below method is used to build the ISO format-4 pinblock which meet the SPOC protocol
```java
    private String buildCvmPinBlock(Hashtable<String, String> value, String pin) {
        String randomData = value.get("RandomData") == null ? "" : value.get("RandomData");
        String pan = value.get("PAN") == null ? "" : value.get("PAN");
        String AESKey = value.get("AESKey") == null ? "" : value.get("AESKey");
        String isOnline = value.get("isOnlinePin") == null ? "" : value.get("isOnlinePin");
        String pinTryLimit = value.get("pinTryLimit") == null ? "" : value.get("pinTryLimit");
        //iso-format4 pinblock
        int pinLen = pin.length();
        pin = "4" + Integer.toHexString(pinLen) + pin;
        for (int i = 0; i < 14 - pinLen; i++) {
            pin = pin + "A";
        }
        pin += randomData.substring(0, 16);
        String panBlock = "";
        int panLen = pan.length();
        int m = 0;
        if (panLen < 12) {
            panBlock = "0";
            for (int i = 0; i < 12 - panLen; i++) {
                panBlock += "0";
            }
            panBlock = panBlock + pan + "0000000000000000000";
        } else {
            m = pan.length() - 12;
            panBlock = m + pan;
            for (int i = 0; i < 31 - panLen; i++) {
                panBlock += "0";
            }
        }
        String pinBlock1 = AESUtil.encrypt(AESKey, pin);
        pin = Util.xor16(HexStringToByteArray(pinBlock1), HexStringToByteArray(panBlock));
        String pinBlock2 = AESUtil.encrypt(AESKey, pin);
        return pinBlock2;
    }
```

Note, the kernel will not call the callback if PIN is not required for the transaction, or if the QPOS itself is with an embedded PINPAD.

If the user do not want to input PIN, the applicaiton can bypass PIN entry by calling 

```java
	pos.bypassPin();
```
if the user want to cancel the transaction, the app should call
```java
	pos.cancelPin();
```

D20/D30/D35/D50/D60/D80：
```java
    @Override
    public void onQposRequestPinResult(List<String> dataList, int offlinePinTimes) {
        //"dataList": the key list of the randomized PIN keypad, which is used to draw the PIN keypad for secure PIN entry.
        //"offlinePinTimes": the remaining number of offline PIN attempts, this value is returned only when an offline PIN verification is performed.

		//draw the pin input keyboard,after finish the keyboard,then call the below api
		pos.pinMapSync(value,30);//the value is the keyboard pin coordinate position and send it to device
    }
```

After sending the pin keyboard coordinate position to the device, then you can click the pin keyboard, and you can get the input pin count on the callback method onReturnGetPinInputResult

```java
    @Override
    public void onReturnGetPinInputResult(int num, QPOSService.PinError error, int minLen, int maxLen) {
        //"num": the number of PIN digits currently entered by the cardholder.
        //"error": indicates the validation result of the PIN entry, such as success or PIN length violations.
        //"minLen": the minimum required PIN length for the transaction.
        //"maxLen": the maximum allowed PIN length for the transaction.
    }
```

### Draw Keyboard

**1. Draw the pin keyboard according to dataList in the onQposRequestPinResult() callback.**

| KEY     | KEY VALUE |
| ------- | --------- |
| 0 - 9   | 0 - 9     |
| CANCEL  | 0D        |
| DELETE  | 0E        |
| CONFIRM | 0F        |

**2. Send the key coordinate postition. The position should contains number(0-9) and function keys(confirm,cancel,delete) and their corresponding top left and bottom right coordinates in the screen.And it should be hexadecimal.**

The format for each key is: 2 bytes keyvalue + 2 bytes x-coordinate of the upper left corner +  2 bytes y-coordinate of the upper left corner + 2 bytes x- coordinate of the lower right corner +  2 bytes y- coordinate of the lower right corner

For example：
```java
0001002901ce00a40207000200b101ce012c02070003013a01ce01b5020700040029021300a4024c000500b10213012c024c0006013a021301b5024c00070029025800a40291000800b10258012c02910009013a025801b50291000000b1029d012c02d6000F013a029d01b50318000E0029029d00a40318000D00b102de012c0317
```

It is complete parameter of position value, let's introduce with "1":
```java
0001 is key value;
0029 is x-coordinate of the upper left corner
01ce is y-coordinate of the upper left corner
00a4 is x- coordinate of the lower right corner
0207 is y- coordinate of the lower right corner
```

**3. refer [our demo](https://github.com/DspreadOrg/android/tree/master/pos_android_studio_demo/pos_android_app/src/main/java/com/dspread/pos/ui/payment/pinkeyboard) for details.**

### Set Time

The current time information can be sent to the EMV kernel by:

```java
    @Override
    public void onRequestTime() {
         String terminalTime = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
         pos.sendTime(terminalTime);
    }
```

### Select EMV Application

If there is multiple EMV applications inside one Chip card, the SDK will ask the user to choose one application from a list:

```java
    @Override
    public void onRequestSelectEmvApp(ArrayList<String> appList) {
         pos.selectEmvApp(position);   //position is the index of the chosen application
         //pos.cancelSelectEmvApp();   //Cancel the transaction
    }
```

The chosen application is sending to the EMV kernel by 
```java
    pos.selectEmvApp(position)
```

### Online Request

If the EMV kernel found the transaction need to go online, below call back will be called.


```java
    @Override
    public void onRequestOnlineProcess(String tlv) {
         //sending online message tlv data to backend server
         response=sendTlvToServer()
         ....
         //send the received online processing result to POS
         //response should contain tag 8A (Authorisation Response Code) and tag 91 (Issuer Authentication Data) and tag 71/72 (Issuer Script)
         pos.sendOnlineProcessResult(response);
    }
```

Below is an exmple of tlv data received by onRequestOnlineProcess:
```
2014-08-27 17:52:21.210 qpos-ios-demo[391:60b] alertView.title = Online process requested.
2014-08-27 17:52:21.211 qpos-ios-demo[391:60b] hideAlertView
2014-08-27 17:52:21.221 qpos-ios-demo[391:60b] onRequestOnlineProcess = {
    tlv = 5F200220204F08A0000003330101015F24032312319F160F4243544553542031323334353637389F21031752139A031408279F02060000000000019F03060000000000009F34034203009F120A50424F43204445424954C409623061FFFFFFFF5284C10A00000332100300E00003C708A68701E68CB34BDEC00A00000332100300E00003C2820150E84B5D0D2AA9F40A04127284B0BEF5BA7901E0914C3F71C6042C61AE9576615360A8B32507769EA9876CCAE0BD87CE43F729D4509E436C422B556E5E480F1309ACD278EF779911E799D5F8A7C28ABA26654E5A99623E507330446A0C0E8463361E53B6712E080C973EDC44DD09FAB019481DABA6C33933DCE66BB5D2846F3005A5A5A1573199C1FFFA483396D1EE8E5918BD13F761011186C58CF5F2E3A45B4C35508DFD1D28C27207C6D0D6FBFADF9038E97B51B6422F56CFE024B2F284572B2C7DCD7E107D5A1550481A1ADB277F8CA37753E8EFF7980DA392EFCF9D2473F7D37E84B608158FA87FB140701FA09CD2FCC2329CF5A8B92D70FD15010BAF751BC4A3C6FD6DBB3C7C90BB5286AFEC923FAE96C09A4FDB65256FE5D8606132B12A4853B609FB80C8E9172C01F7A152E715A5A75D5305165EDA939E4C51313A176691F55B35207C8857221793AB7C045E48;
}
```

The tlv data can be decoded using the online EMVlab tool:

http://www.emvlab.org/tlvutils/?data=5F200220204F08A0000003330101015F24032312319F160F4243544553542031323334353637389F21031752139A031408279F02060000000000019F03060000000000009F34034203009F120A50424F43204445424954C409623061FFFFFFFF5284C10A00000332100300E00003C708A68701E68CB34BDEC00A00000332100300E00003C2820150E84B5D0D2AA9F40A04127284B0BEF5BA7901E0914C3F71C6042C61AE9576615360A8B32507769EA9876CCAE0BD87CE43F729D4509E436C422B556E5E480F1309ACD278EF779911E799D5F8A7C28ABA26654E5A99623E507330446A0C0E8463361E53B6712E080C973EDC44DD09FAB019481DABA6C33933DCE66BB5D2846F3005A5A5A1573199C1FFFA483396D1EE8E5918BD13F761011186C58CF5F2E3A45B4C35508DFD1D28C27207C6D0D6FBFADF9038E97B51B6422F56CFE024B2F284572B2C7DCD7E107D5A1550481A1ADB277F8CA37753E8EFF7980DA392EFCF9D2473F7D37E84B608158FA87FB140701FA09CD2FCC2329CF5A8B92D70FD15010BAF751BC4A3C6FD6DBB3C7C90BB5286AFEC923FAE96C09A4FDB65256FE5D8606132B12A4853B609FB80C8E9172C01F7A152E715A5A75D5305165EDA939E4C51313A176691F55B35207C8857221793AB7C045E48%0D%0A

As we can see from the decoded table:

| Tag  | Tag Name            | Value                       |
| ---- | ------------------- | --------------------------- |
| 5F20 | Cardholder Name     |                             |
| 4F   | AID                 | A000000333010101            |
| 5F24 | App Expiration Date | 231231                      |
| 9F16 | Merchant ID         | B C T E S T 1 2 3 4 5 6 7 8 |
| 9F21 | Transaction Time    | 175213                      |
| ...  | ...                 | ...                         |
| C4   | Masked PAN          | 623061FFFFFFFF5284          |
| C1   | KSN(PIN)            | 00000332100300E00003        |
| C7   | PINBLOCK            | A68701E68CB34BDE            |
| C0   | KSN Online Msg      | 00000332100300E00003        |
| C2   | Online Message      | E84B5D0D2AA9F40A2EFC....    |

Inside the table, there are:
1. Some EMV TAGs (5F20,4F,5F24 ...) with plain text value. 
2. Some Proprietary tags starting with 0xC, in our case C4,C1,C7,C0 and C2.

The definition of proprietary tags can be found below:

| Tag  | Name                       | Length(Bytes) |
| ---- | -------------------------- | ------------- |
| C0   | KSN of Online Msg          | 10            |
| C1   | KSN of PIN                 | 10            |
| C2   | Online Message(E)          | var           |
| C3   | KSN of Batch/Reversal Data | 10            |
| C4   | Masked PAN                 | 0~10          |
| C5   | Batch Data                 | var           |
| C6   | Reversal Data              | var           |
| C7   | PINBLOCK                   | 8             |

It's the responsibility of the app to handle the online message string, sending them to the bank (the card issuer), and check the bank processing result.

The value of tag C2 is the encrypted Online Message, usually the app need to send it to the back end system, along with the tag C0 value. The backend system can derive the 3DES key from C0 value, and decrypt the C2 value and get the real online data in plain text format.

In case encrypted PIN is needed by the transaction, the app can also send the value of tag C7,C1 to back end system.

The example above is just a demostration. "8A023030" is a fake result from back end system.

As an exmple of decoding the online message, please find below some demo scripts:

```python

def decrypt_icc_info(ksn, data):
    BDK = unhexlify("0123456789ABCDEFFEDCBA9876543210")
    ksn = unhexlify(ksn)
    data = unhexlify(data)
    IPEK = GenerateIPEK(ksn, BDK)
    DATA_KEY = GetDataKey(ksn, IPEK)
    print hexlify(DATA_KEY)
    res = TDES_Dec(data, DATA_KEY)
    return hexlify(res)

if __name__ == "__main__":
    KSN = "00000332100300E00003"
    DATA = "E84B5D0D2AA9F40A04127284B0BEF5BA7901E0914C3F71C6042C61AE9576615360A8B32507769EA9876CCAE0BD87CE43F729D4509E436C422B556E5E480F1309ACD278EF779911E799D5F8A7C28ABA26654E5A99623E507330446A0C0E8463361E53B6712E080C973EDC44DD09FAB019481DABA6C33933DCE66BB5D2846F3005A5A5A1573199C1FFFA483396D1EE8E5918BD13F761011186C58CF5F2E3A45B4C35508DFD1D28C27207C6D0D6FBFADF9038E97B51B6422F56CFE024B2F284572B2C7DCD7E107D5A1550481A1ADB277F8CA37753E8EFF7980DA392EFCF9D2473F7D37E84B608158FA87FB140701FA09CD2FCC2329CF5A8B92D70FD15010BAF751BC4A3C6FD6DBB3C7C90BB5286AFEC923FAE96C09A4FDB65256FE5D8606132B12A4853B609FB80C8E9172C01F7A152E715A5A75D5305165EDA939E4C51313A176691F55B35207C8857221793AB7C045E48"
    print decrypt_icc_info(KSN, DATA)

```

The decoded icc online message looks like:

http://www.emvlab.org/tlvutils/?data=708201479f02060000000000015a096230615710101752845713623061571010175284d231222086038214069f9f101307010103a02000010a01000000000013f6c0429f160f4243544553542031323334353637389f4e0f61626364000000000000000000000082027c008e0e000000000000000042031e031f005f24032312315f25031307304f08a0000003330101019f0702ff009f0d05d8609ca8009f0e0500100000009f0f05d8689cf8009f2608059aae950d0b7a679f2701809f3602008d9c01009f3303e0f8c89f34034203009f3704c1cdd24a9f3901059f4005f000f0a0019505088004e0009b02e8008408a0000003330101019a031408275f2a0201565f3401019f03060000000000009f0902008c9f1a0206439f1e0838333230314943439f3501229f4104000000015f200220205f300202205f28020156500a50424f432044454249540000000000

All the online message in embedded inside tag 0x70, the ending 00 are paddings for 3DES encryption.

### Get Transaction Result 

The application will be notified by the SDK regarding the transaction result by:

```java
    @Override
    public void onRequestTransactionResult(
         TransactionResult transactionResult) {
         if (transactionResult == TransactionResult.APPROVED) {
         } else if (transactionResult == TransactionResult.TERMINATED) {
         } else if (transactionResult == TransactionResult.DECLINED) {
         } else if (transactionResult == TransactionResult.CANCEL) {
         }        
    }
```

### Batch Data Handling

When the transaction is finished. The batch data will be returned to the application by below callback.

```java
    @Override
    public void onRequestBatchData(String tlv) {
    }
```
Note, if there is issuer's script result inside the tlv, the mobile app need to feedback it to the bank.
Decoding the tlv inside onRequestBatchData is similar to decoding onRequestOnlineProcess. 

### Reversal Handling

If the EMV chip card refuse the transaction, but the transaction was approved by the issuer. A reversal procedure should be initiated by the mobile app. Below callback can get the required data for doing reversal:

```java
    @Override
    public void onReturnReversalData(String tlv) {
         ...
    }
```

## Error Notification

During the transaction, if there is anything abnormal happened, the onError callback will be called.

```java
    @Override
    public void onError(Error errorState) {
    }
```

|   Enum Value          |         Description         |        Applicability        |
| --------------------- | --------------------------- | --------------------------- | 
| TRY_ANOTHER_INTERFACE | A apdu 6984 returned by the card during the Visa contactless GPO process        |        All devices            |
| DEVICE_ERROR          | A high-impact drop or tampering triggers device self-destruction                |        All devices            |      
| BAD_SWIPE             | Damaged magnetic stripe data or improper swipe operation                        |        Smart POS only         |     
| FALLBACK              | Occurs if the card is inserted with the non-chip side toward the reader, or if the first GEN AC returns 6985 for contact |       All devices        |   
| NFC_TERMINATED        | Occurs when processing an Amex transaction and the terminal EMV configuration is missing the Amex AID or other cases     |       All devices        |    
| NONE                  | If a card swipe fails twice with BAD_SWIPE, a third failure will result in NONE |      Smart POS only         | 
| AID_MISSING           | Card AID not configured in the terminal                                         |          All devices        | 
| TRADE_LOG_FULL        | Occurs when performing over 185 consecutive transactions, filling the terminal's flash transaction log for specific configuration |    QPOS mini only    |
| CONTACTLESS_TRANSACTION_NOT_ALLOW | The terminal should prevent contactless transactions as required by Amex AXP EP094 for specific configuration     |        NA            |
| CARD_BLOCKED_APDU_ERROR_6A81      | When selecting ppse or selecting aid, card return 6A81 apdu                                                       |      All devices     |   
| MULTIPLE_CARDS                    | Multiple contactless cards were detected                            |       All devices        |   
| APP_BLOCKED_APDU_ERROR_6A83       | At emv application final select, card return 6A83 apdu              |       All devices        |   
| TRANSACTION_NOT_ALLOWED_AMOUNT_EXCEED | Transaction amount exceeds the contactless transaction limit for encryption mode 0007 |     QPOS mini only    |
| CARD_REMOVED                      | Occurs when the card is removed during a contact transaction for special configuration    |     QPOS mini only    |    
| NO_UPDATE_WORK_KEY                | Occurs when a production device attempts a transaction without updating the work key for encryption mode 0004     |     QPOS mini only    |
| TRANS_TOKEN_INVALID               | Occurs when a transaction is initiated before the token has been activated                |     CR100 only        |
| NO_RESPONSE             | No response was received from the device after the SDK sent a command          |  All devices     |  
| MAC_ERROR               | The device reported a MAC verification failure for the command sent by the SDK |  All devices     |  
| TIMEOUT                 | The device returned a timeout due to prolonged inactivity after receiving a command from the SDK  |  All devices     |  
| CMD_NOT_AVAILABLE       | The command sent by the SDK is not supported by the device                     |  All devices     |  
| DEVICE_RESET            | The device successfully reset after receiving a reset command from the SDK     |  All devices     |  
| UNKNOWN                 | An internal exception occurred during SDK processing                           |  All devices     |  
| DEVICE_BUSY             | A new command was sent by the SDK before the device responded to the previous command | All devices     |  
| DEVICE_IS_OCCUPIED      | The serial port is in use by another application and must be released before use |  Smart POS only   |
| APDU_ERROR              | An APDU communication error occurred between the device and the card           |  All devices     | 
| APP_SELECT_TIMEOUT      | A timeout occurred during multi-application selection on the app               |  All devices     | 
| ICC_ONLINE_TIMEOUT      | A timeout occurred while sending online request to bank for a contact transaction | All devices   | 
| DEVICE_IN_BOOT_STATE    | The firmware upgrade was interrupted, and the device entered BOOT mode         |  All devices     | 
| REMOTE_SERVICE_EXCEPTION            | An error occurred while the SDK was binding a remote service       |  Smart POS only  | 
| RECEIVE_PLAINT_IN_ENCRYPTION_MODE   | The device is in cipher mode, but the SDK sent plaintext data      |  CR100 only 
| RECEIVE_CIPHER_IN_NONENCRYPTION_MODE| The device is in plaintext mode, but the SDK sent encrypted data   |  CR100 only 
| DECRYPT_FAIL_IN_ENCRYPTION_MODE     | Decryption failed for encrypted data sent to the device while in cipher mode  | CR100 only |
| EXPIRED_CERT           | The server certificate has expired                                              |  All devices     | 
| INVALID_TRUSTED_CERT   | The server certificate is invalid                                               |  All devices     | 
