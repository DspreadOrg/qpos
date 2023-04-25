## MPOS Business Model

When user choose *card present payment*, the transaction process will involve merchants, terminals, card networks and acquiring banks. First, the merchant confirms the user's purchase amount and initiates a card reading transaction on the POS terminal. The POS terminal reads the user's bank card information and sends the card information acquirer bank and confirmed the authenticity of the transaction by issuer bank

![transaction Flow](./_images/transaction-flow.svg ':size=80%')


## Initialization
All methods the SDK provided can be devided into three types:
1. Init methods；
2. Interactive methods；
3. Listener methods.

The application use the init method to init the EMV card reader hardware and get an instance of the Card Reader. It then can use the interactive methods to start the communication with the card reader. During the communication process, if any message returned from the Card reader, a listener method will be invoked by the SDK package.

To avoid the application block and improve the speed of  data interaction between the smart terminal and QPOS, the SDK framework is designed to work under asynchronous mode.

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
In addition, the below code shows initializing the SDK while binding the serial port service.

```java
	private void open(CommunicationMode mode) {
		listener = new MyPosListener();
		pos = QPOSService.getInstance(OtherActivity.this, mode);
		if (pos == null) {
			statusEditText.setText("CommunicationMode unknow");
			return;
		}
		Handler handler = new Handler(Looper.myLooper());
		pos.initListener(handler, listener);
	}
```


The CommunicaitonMode can be 

```java
	public static enum CommunicationMode{
		AUDIO,
		BLUETOOTH,
		BLUETOOTH_BLE,
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
			open(CommunicationMode.BLUETOOTH);
			posType = POS_TYPE.BLUETOOTH;
            //...
		}
```
In addition, the below code shows how to use the open() method described above to open the communication bridge and use the serial port service.
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
				pos.openUartService();
			}
			
		} else {   //We will use Bluetooth
			open(CommunicationMode.BLUETOOTH);
			posType = POS_TYPE.BLUETOOTH;
            //...
		}
```


## Start Transaction

Before initiating a transaction, you can set the card trade mode to set the card reading mode allowed by the device, by below method:
```java
		pos.setCardTradeMode(QPOSService.CardTradeMode.SWIPE_TAP_INSERT_CARD);
```  
Below table describes the meaning of each enumerate variables of CardTradeMode:  

| Card Trade Mode| Description                              |
| ---------------| ---------------------------------------- |
| SWIPE_TAP_INSERT_CARD (default)                | Allow MAG/ICC/NFC transactions, press the UP button "▲" to start NFC mode. |
| ONLY_SWIPE_CARD                                | Only allow MAG transactions. |
| ONLY_INSERT_CARD                               | Only allow ICC transactions.|
| ONLY_TAP_CARD                                  | Only allow NFC transactions.   |
| SWIPE_INSERT_CARD                              | Allow MAG and ICC transactions.               |
| SWIPE_INSERT_CARD_UNALLOWED_LOW_TRADE          | Allow MAG/ICC transactions, press the UP button "▲" to start NFC mode. Downgrading transactions not allowed. (Downgrading transactions not allowed: If the card support ICC transaction, the MAG transaction is not allow.)|
| TAP_INSERT_CARD_NOTUP                          | Allow ICC and NFC transactions.             |
| TAP_INSERT_CARD                                | Allow ICC and NFC transactions, press the UP button "▲" to start NFC mode.|
| SWIPE_TAP_INSERT_CARD_NOTUP                    | Allow MAG/ICC/NFC transactions. |
| SWIPE_TAP_INSERT_CARD_NOTUP_UNALLOWED_LOW_TRADE| Allow MAG/ICC/NFC transactions. Downgrading transactions not allowed. |
  
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

The transaction icon can be set by:

```java
        	pos.setAmountIcon(AmountType.MONEY_TYPE_CUSTOM_STR, amountIcon);

			public static enum AmountType {
        		MONEY_TYPE_NONE,
        		MONEY_TYPE_RMB,
        		MONEY_TYPE_DOLLAR,
        		MONEY_TYPE_CUSTOM_STR
    }
```

the setAmount method and setAmountIcon method can be called before starting a transaction. If setAmount was not called, a call back will be invoked by the SDK, giving app another chance to enter the transaction amount.

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
3. currency code : US Dollar, CNY, etc
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
