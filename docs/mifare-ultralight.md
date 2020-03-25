mifare-ultralight

**Mifare Ultralight**

  	The Ultralight card most operate is same with the classic card, except some part is different.

	1).It don't need to use key A/B to verify, just verify the data.
 	2).It don't have the Add/Reduce/Restore operation,but can read and write data.
 	3).It have a special method to read data.
 	
```java
	pos.faseReadMifareCardData(String startBlock,String endBlock,int timeout)
```