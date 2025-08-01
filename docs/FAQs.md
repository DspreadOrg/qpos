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
 M/Chip Fast is the Mastercard implementation of the EMV transaction flow specifically designed for environments where faster transaction times are particularly important. It allows consumers to remove cards in advance without waiting for online results and processing a second GEN AC.

**Please follow the below steps to pass this case.**
- Please add a "QUICK CHIP" button in your app to execute the "M/Chip Fast" case.
- When you click "QUICK CHIP" button, please call **pos.setQuickEmv(true)** function before **pos.doTrade()/pos.doCheckCard()** function to start transaction in your app.
- When your app received REMOVE_CARD from **onRequestDisplay()** callback, please remind the customer to remove the card.
- When your app received transaction data from **onRequestOnlineProcess()** callback, please transform transaction data into ISO 8583 financial messages and send them to the issuer

### 4、How to process "Single Tap and PIN Request" case for mastercard L3 certification ?
 Once exemption counter or accumulator reaches its limit during a contactless low value transactions (LVT), issuers require an SCA(Strong Customer Authentication) and send Response Code "65 Exceeds Withdrawal Count Limit" to you, the cardholder only needs to subsequently enter an Online PIN at the terminal PIN pad without the need to tap again or perform a Chip and PIN transaction.

**Please follow the below steps to pass this case.**
- Please enter the amount according to the case requirements and initiate a contactless transaction
- Tap card and received transaction data in the onDoTradeResult() callback function
- Transform transaction data into **first ISO 8583 financial messages** and send them to the issuer
- When your app received Response Code "65 Exceeds Withdrawal Count Limit" from issuer，your app call **pos.getPin(1, 4, 6, "please input pin", maskedPAN, "", 20)** function to request the cardholder to enter the PIN without the need to tap again or perform a Chip and PIN transaction
- Transform transaction data into **second ISO 8583 financial messages** and send them to the issuer

### 5、How to detect "Phone Wallet" or "Physical Card" and distinguish between Apple Pay, Samsung Pay, and Google Pay?
- For Visa and Mastercard, you can use **9F6E** tag to detect "Phone Wallet" or "Physical Card", please check the below screenshot for details
- For Amex, you can use **5F30** tag to detect "Phone Wallet" or "Physical Card". If 5F30 value is 0702, it is physical card, if 5F30 value is 0701, it is Phone Wallet
- For Apple Pay, Samsung Pay, and Google Pay, you can use **9F19** tag to distinguish them and get more details by [this link](https://stackoverflow.com/questions/51826215/contactless-payments-detect-mobile-device-or-card)
![9F6ETAG](./_images/9F6ETag.png)

### 6、How to share keys in secure way?
- There are two ways to share keys that including express delivery and PGP keys, details please refer the document of [this link](https://github.com/DspreadOrg/FAQs_Document/blob/master/documents/Share%20Key%20.pdf)
