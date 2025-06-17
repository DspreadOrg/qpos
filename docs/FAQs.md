## Frequently Asked Questions

### 1、Where is the path for “Android OS version” ?

- D20&D60&D70：Settings > About device > Device Version Information
- D30&D50：Settings > About device > Build number

### 2、How to pay attention to the daily maintenance of batteries ?

- Please use the product at an ambient temperature of -5~45℃. -20 to 55 degrees Celsius environment storage products
- Please use the product in an environment where the humidity is not more than 85%RH and there is no condensation
- Avoid contact with corrosive liquids (e.g.: strong acids, alkalis, gasoline, etc.)
- For products that are not used for a long time, it is necessary to charge the product to 70% power every 6 months to avoid battery damage caused by 
overdischarge
- Avoid water damage to the product
- Avoid damage from falling

### 3、How to process "M/Chip Fast" case for mastercard L3 certification ?
 M/Chip Fast is the Mastercard implementation of the EMV transaction flow specifically designed for environments where faster transaction times are particularly important. It performs a standard EMV transaction up to and including the processing of the first GENERATE AC command, where terminals must be configured to request an Authorization Request Cryptogram (ARQC) from the card. This can be achieved through the configuration of a zero floor limit. Application selection, offline card authentication, and CVM processing are all part of an M/Chip Fast transaction. The EMV flow is completed by the terminal through a second GENERATE AC command with an Authorization Response Code "Z3 Unable to go online, offline declined"

#### Please follow the below steps to pass this case.
- Please enter the amount according to the case requirements and initiate a contactless transaction
- Insert card and received transaction data in the **onRequestOnlineProcess()** callback function
- Your app don't request online and call **pos.sendOnlineProcessResult("8A025A33")** to quickly complete the transaction in the **onRequestOnlineProcess()** callback function(5A33 is Z3 "Unable to go online, offline declined")
- Received transaction data from **onReturnReversalData()** callback and transform transaction data into ISO 8583 financial messages and send them to the issuer

### 4、How to process "Single Tap and PIN Request" case for mastercard L3 certification ?
 Once exemption counter or accumulator reaches its limit during a contactless low value transactions (LVT), issuers require an SCA(Strong Customer Authentication) and send Response Code "65 Exceeds Withdrawal Count Limit" to you, the cardholder only needs to subsequently enter an Online PIN at the terminal PIN pad without the need to tap again or perform a Chip and PIN transaction.

#### Please follow the below steps to pass this case.
- Please enter the amount according to the case requirements and initiate a contactless transaction
- Tap card and received transaction data in the onDoTradeResult() callback function
- Transform transaction data into **first ISO 8583 financial messages** and send them to the issuer
- When your app received Response Code "65 Exceeds Withdrawal Count Limit" from issuer，your app call **pos.getPin(1, 4, 6, "please input pin", maskedPAN, "", 20)** function to request the cardholder to enter the PIN without the need to tap again or perform a Chip and PIN transaction
- Transform transaction data into **second ISO 8583 financial messages** and send them to the issuer  
