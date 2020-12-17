## mifare desfire

**Mifare Desfire**

	Desfire card is different from the above Clasic cards. It has easy method to transfer data.
	
	1. Power on card
```java
	pos.powerOnNFC(int isEncrypt, int timeout)
```
	2. Send apdu data
```java
	pos.sendApduByNFC(String apduString, int timeout)
```
	3. Power off card
```java
	pos.powerOffNFC(int timeout)
```

Mifare Desfire Reading Card Demo
https://www.linkedin.com/pulse/mifare-desfire-introduction-david-coelho/
