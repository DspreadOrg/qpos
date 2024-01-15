Currently we provide the QR/Bar code payment function in the form of a service for customers to use. You can call the following method to start the code scanning service.

```java
 Intent intent = new Intent();
 ComponentName comp = new ComponentName("com.dspread.components.scan.service", "com.dspread.components.scan.service.ScanActivity");
 intent.putExtra("amount", "CHARGE ￥1");
 intent.setComponent(comp);
 launcher.launch(intent);
```
 