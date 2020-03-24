## Mifare Card Operation

Blow introduce how to transmit datas on the different mifare cards and pos.There are three typr mifare card - Mifare Classic, Mifare Ultralight, Mifare Desfire.

**1.Mifare Classic**

![](./mifare card.jpg)

As the above image, we can know the work flow for the Mifare Classic.

1).poll on Card
```java
	pos.pollOnMifareCard(int timeout)
```
2).Verify Key A/B
```java
	pos.authenticateMifareCard(MifareCardType cardType,String keyType,String block,String keyValue,int timeout)
```
3).Operate Card
   - Add/Reduce/Restore
```java
	pos.operateMifareCardData(MifareCardOperationType type,String block,String data,int timeout)
```
- Read
```java
	pos.readMifareCard(MifareCardType cardType,String block,int timeout)
```
- Write
```java
	pos.writeMifareCard(MifareCardType cardType,String block,String data,int timeout)
```
4)Finish
```java
	pos.finishMifareCard(int timeout)
```

**2.Mifare Ultralight**

  	The Ultralight card most operate is same with the classic card, except some part is different.
	 1).It don't need to use key A/B to verify, just verify the data.
 	2).It don't have the Add/Reduce/Restore operation,but can read and write data.
 	3).It have a special method to read data.
```java
	pos.faseReadMifareCardData(String startBlock,String endBlock,int timeout)
```
**3.Mifare Desfire**

	Desfire card is different from the above two cards. It has easy method to transfer data.
	
	1).Power on card
```java
	pos.powerOnNFC(int isEncrypt, int timeout)
```
	2).Send apdu data
```java
	pos.sendApduByNFC(String apduString, int timeout)
```
	3).Power off card
```java
	pos.powerOffNFC(int timeout)
```

