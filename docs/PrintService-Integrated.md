Please follow the below printer sdk document to integrate printer functions
- [Printer SDK Guide](https://drive.google.com/file/d/1Dj5ATBWgj7eZPmXPmF_WVgHQCXrPLLxw/view?usp=sharing)

## DSPREAD Printing SDK Overview

 1. How to integrate SDK

DSPREAD printing SDK can be obtained through remote repository, and you only need to add the dependency to the build.gradle of the module.
``` java

Gradle Groovy DSL install command.

implementation 'com.dspread.print:dspread_print_sdk:1.2.0'

Add Gradle Groovy DSL repository command.

maven {

url 'https://gitlab.com/api/v4/projects/4128550/packages/maven'

}
``` 
 2. Demo Example

Click the links below to download the Demos.

<div style='color: blue'>

- [x] [Android Printer Demo](https://gitlab.com/dspread/android) 
    
</div>

 3. How to use the SDK

After integrating the SDK, firstly you can use the getPrinter() method to get the printer,The initialization code is as follows:

``` java

PrinterManager instance = PrinterManager.getInstance();
mPrinter = instance.getPrinter();
mPrinter.initPrinter(this);
MyPrinterListener myPrinterListener = new MyPrinterListener();
mPrinter.setPrintListener(myPrinterListener);
class MyPrinterListener implements PrinterListener{
@Override
public void printResult(boolean b, String status, int type){

}

}
```
 4. SDK exceptions

 ?>Dspread printing SDK basically is applicable to all Dspread devices. For some models, the APIs may not be supported since the system version is too old. In this case, please contact Dspread technical support to upgrade the device to the latest version.

## Print Text


## Print BarCode

## Print QRCode

## Print Bitmap

## Print Multiple Columns


## Print

## Stop Print

