### 1. Dspread Printing SDK Overview

Please follow the below printer sdk document to integrate printer functions
- [Printer SDK Guide](https://drive.google.com/file/d/1whNFrWa69OddbrFQi6FCu6zOjlxvFTsk/view?usp=sharing)

### 2. How to integrate SDK

Dspread printing SDK can be obtained through remote repository, and you only need to add the dependency to the build.gradle of the module.
``` java

Gradle Groovy DSL install command.

implementation 'com.dspread.print:dspread_print_sdk:1.2.3'

Add Gradle Groovy DSL repository command.

maven {

url 'https://gitlab.com/api/v4/projects/4128550/packages/maven'

}

``` 
You can click the links below to download the printer demo.

<div style='color: blue'>

- [x] [Android Printer Demo](https://github.com/DspreadOrg/android) 
    
</div>

### 3. How to use the SDK

After integrating the SDK, firstly you can use the getPrinter() method to get the printer,The initialization code is as follows:

 1. If D60/MP600 device integration SDK. Please refer to the below code to initialize.
``` java
   PrinterManager instance = PrinterManager.getInstance();
   mPrinter = instance.getPrinter();
   mPrinter.initPrinter(context);
   MyPrinterListener myPrinterListener = new MyPrinterListener();
   mPrinter.setPrintListener(myPrinterListener);
   class MyPrinterListener implements PrinterListener{

    @Override
    public void printResult(boolean b, String status, int type){

     }
   }
```
 2. If D30 device integration SDK. Please refer to the below code to initialize.
```java
   PrinterManager instance = PrinterManager.getInstance();
   mPrinter = instance.getPrinter();
   mPrinter.initPrinter(context, new PrinterInitListener() {

    @Override
    public void connected() { 

   mPrinter.setPrinterTerminatedState(PrinterDevice.PrintTerminationState.PRINT_STOP); 

  //PrinterDevice.PrintTerminationState.PRINT_STOP    When no paper, the printer terminates printing and cancels the printing task.
  //PrinterDevice.PrintTerminationState. PRINT_NORMAL  When no paper, the printer will prompt that no paper. After loading the paper, the printer will continue to restart printing.

            } 
    @Override
    public void disconnected() {

            }
        });
    MyPrinterListener myPrinterListener = new MyPrinterListener();

    mPrinter.setPrintListener(myPrinterListener);

    class MyPrinterListener implements PrinterListener{

           @Override
    public void printResult(boolean b, String status, int type){

    }
}
```
 3. SDK exceptions

 > Dspread printing SDK basically is applicable to all Dspread devices. For some models, the APIs may not be supported since the system version is too old. In this case, please contact Dspread technical support to upgrade the device to the latest version.
