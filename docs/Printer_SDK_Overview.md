### 1. Dspread Printing SDK Overview

Please follow the below printer sdk document to integrate printer functions
- [Printer SDK Guide](https://drive.google.com/file/d/1YBazNrtAoo5b_dZIu_UNelvgUPjas96J/view?usp=sharing)

### 2. How to integrate SDK

The Dspread print SDK can be obtained through a remote repository. You only need to add the dependency in the build.gradle of the calling module.
``` java
Gradle Groovy DSL install command.

implementation 'com.dspread.print:dspread_print_sdk:1.5.5-beta'

Add Gradle Groovy DSL repository command.

maven {

url 'https://gitlab.com/api/v4/projects/4128550/packages/maven'

}
``` 
### 3. Demo Example
You can click the links below to download the printer demo.

<div style='color: blue'>

- [x] [Android Printer Demo](https://github.com/DspreadOrg/android) 
    
</div>

### 4. How to use the SDK

After integrating the SDK, firstly you can use the getPrinter() method to get the printer.
``` java
   PrinterDevice mPrinter = PrinterManager.getInstance().getPrinter();
```
 1. D60、D70 device integration SDK.
``` java
   mPrinter.initPrinter(context);
```
 2. D30 device integration SDK..
```java
  mPrinter.initPrinter(context, new PrinterInitListener() {
            @Override
            public void connected() { 
            }
@Override
            public void disconnected() {
            }
        });
```
 3. Initialize callback API
``` java
   MyPrinterListener myPrinterListener = new MyPrinterListener();
   mPrinter.setPrintListener(myPrinterListener);
   class MyPrinterListener implements PrintListener{
    @Override
    public void printResult(boolean b, String status, int type)
}
```
### 5. SDK exceptions

 > Dspread printing SDK basically is applicable to all Dspread devices. For some models, the APIs may not be supported since the system version is too old. In this case, please contact Dspread technical support to upgrade the device to the latest version.
