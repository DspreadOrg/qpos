
## Dspread Printing SDK Overview

Please follow the below printer sdk document to integrate printer functions
- [Printer SDK Guide](https://drive.google.com/file/d/1whNFrWa69OddbrFQi6FCu6zOjlxvFTsk/view?usp=sharing)

 1. How to integrate SDK

Dspread printing SDK can be obtained through remote repository, and you only need to add the dependency to the build.gradle of the module.
``` java

Gradle Groovy DSL install command.

implementation 'com.dspread.print:dspread_print_sdk:1.2.3'

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

 1、If D60/MP600 device integration SDK. Please refer to the below code to initialize.
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
 2、If D30 device integration SDK. Please refer to the below code to initialize.
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
 4. SDK exceptions

 > Dspread printing SDK basically is applicable to all Dspread devices. For some models, the APIs may not be supported since the system version is too old. In this case, please contact Dspread technical support to upgrade the device to the latest version.

## APIs for printing text

**public void printText(String text)**


| API           | public void printText(String text)                         |
| --------      | ---------------------------------------------------------- |
| Description   | Print text.                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              |


**Parameter Description:** 

String text: Specify the printed text content 


## APIs for printing BarCode

**public void printBarCode(Context context,String symbology, int width, int height, String content,int position)**

| API           | public void printBarCode(Context context,String symbology,int width,int height,String content,int position)|
| --------      | ---------------------------------------------------------- |
| Description   |Print BarCode.                                              |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              |


**Parameter Description:** 

context: Context. 

symbology: 
          Barcode1D.CODE_128.name(); 
          Barcode1D.CODABAR.name(); 
          Barcode1D.CODE_39.name(); 
          Barcode1D.EAN_8.name(); 
          Barcode1D.EAN_13.name(); 
          Barcode1D.UPC_A.name(); 
          Barcode1D.UPC_E.name(); 

width: Set the block width.
          
height: Set barcode height. 

content: Set barcode content. 

position: Set barcode alignment.

## APIs for printing QRCode

**public void printQRCode(Context context,String errorLevel,int width,String content,int position)** 

| API           | public void printQRCode(Context context,String errorLevel,int width,String content,int position)|
| --------      | ---------------------------------------------------------- |
| Description   |Print QRCode.                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              | 

**Parameter Description:** 

context: Context. 

errorLevel: Error correction level. 
Barcode2D.ErrorLevel.L.name(),
Barcode2D.ErrorLevel.H.name(),
Barcode2D.ErrorLevel.M.name(),
Barcode2D.ErrorLevel.Q.name() 

width: Set the size of the QR code block. 

content: Set up the QR code block content. 

position: Set up the QR code block alignment. 


## APIs for printing Bitmap

**public void printBitmap(Context context, Bitmap bitmap)**

| API           | public void printBitmap(Context context, Bitmap bitmap)    |
| --------      | ---------------------------------------------------------- |
| Description   |Print Bitmap                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              | 

**Parameter Description:** 

cotext: Context.

bitmap: Image bitmap data. 

## APIs for printing Multiple Columns

**public void addTexts(String[] texts, int[] colsWidthArrs, int[] styles)** 

| API           | public void addTexts(String[] texts, int[] colsWidthArrs, int[] styles)      |
| --------      | --------------------------------------------------------------------         |
| Description   |Send print content to the printer in a row with fixed size fixed style content|
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | D30/D60/MP600                                                                |

**Parameter Description:** 

texts: Each column to print, the array size is the number of columns. 

colsWidthArrs: The proportion of each column in a row, such as int[] {1,1}, will print each column by 1:1. 

styles: Set Text Position.


## APIs for Printing all types display

**public void print(Context context)**

Before calling the method, you can call the following method to add content: 
addText(),addTexts(),addBarCode(),addQRCode(),addBitmap(). 

| API           | public void print(Context context)                                           |
| --------      | --------------------------------------------------------------------         |
| Description   |Print composite type files,First add the different types of files. Then call this interface to print|
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | D30/D60/MP600                                                                |

**Parameter Description:** 

context: Context. 
                                                        |
## APIs for Print CallBack

**public void printResult(boolean isSuccess, String status,int type)**

| API           | public void printResult(boolean isSuccess, String status,int type) |
| --------      | ------------------------------------------------------------       |
| Description   |Callback interface                                                  |
| printer       | D30/D60/MP600                                                      |

**Parameter Description:** 

isSuccess: true/false. 

statue: Returns the printer status value. 

type: 1 PRINT_RESULT;3 GET_DESITY;5 GET_SPEED;6 GET_TEMPERATURE;7 GET_VOLTAGE;8 GET_STATUS 


## Printer Setting

### Set Printer Density

**public void setPrinterDensity(int printerDensityLevel)** 

| API           | public void setPrinterDensity(int printerDensityLevel)             |
| --------      | ------------------------------------------------------------   |
| Description   | Set printer Density.                                             |
| Callback      | void printResult(boolean isSuccess, String status,int type)    | 
| printer       | MP600/D60                                                          |

**Parameter Description:** 

printerDensityLevel: Printer concentration levels. 

Concentration level: 1 to 5 (5 is the highest). 

### Set Printer Speed

**public void setPrinterSpeed(int printerSpeedLevel)** 

| API           | public void setPrinterSpeed(int printerSpeedLevel)               |
| --------      | ------------------------------------------------------------   |
| Description   | Set printer Speed.                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)    | 
| printer       | MP600/D60                                                         |

**Parameter Description:** 

printerSpeedLevel: Printer speed levels. 

Speed level: 1 to 5 (5 is the highest). 

### Set Text Print Style

**public void setPrintStyle(PrintLineStyle style)** 

| API           | public void setPrintStyle(PrintLineStyle style)                |
| --------      | ------------------------------------------------------------   |
| Description   | Set the text alignment and font effect.                                              |
| Callback      | null                                                           | 
| printer       | D30/MP600/D60                                                     |

**Parameter Description:** 

 1、PrintLineStyle: 
  void setAlign(int align); 
  void setFontSize(int fontSize); 
  void setFontStyle (int bold);

 2、setAlign(int align): PrintLine.LEFT、PrintLine.CENTER、PrintLine.RIGHT 

 3、setFontStyle(int bold): PrintStyle.FontStyle.NORMAL、PrintStyle.FontStyle.BOLD、PrintStyle.FontStyle.ITALIC、PrintStyle.FontStyle.BOLD_ITALIC 
 
 4、setFontSize(int fontsize): Custom Text Size. 


## Printer Status Getting Function

### Get Printer Status

Call the API getPrinterStatus() to get the status of the printer.

**public void getPrinterStatus()** 

status: Normal; Printing; NoPaper; Overheated; Undefined

| API           | public void getPrinterStatus()                                               |
| --------      | --------------------------------------------------------------------         |
| Description   | get printer status                                                              |
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | MP600/D60                                                                        |

### Get Printer Density

Call the API getPrinterDensity() to get the density of the printer. 

**public void getPrinterDensity()** 

status: 1 to 5,5 is the highest. 

| API           | public void  getPrinterDensity()                                               |
| --------      | --------------------------------------------------------------------         |
| Description   | get Printer Density                                                            |
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | MP600/D60                                                                       |

### Get Printer Speed

Call the API getPrinterSpeed() to get the speed of the printer. 

**public void getPrinterSpeed()** 

statue: 1 to 5,5 is the highest.

| API           | public void  getPrinterSpeed()                                               |
| --------      | --------------------------------------------------------------------       |
| Description   | get Printer Speed                                                            |
| Callback      | void printResult(boolean isSuccess, String status,int type)                | 
| printer       | MP600/D60                                                                      |

### Get Printer Temperature

Call the API getPrinterTemperature() to get the temperature of the printer. 

**public void getTemperature()**  

statue: Printer temperature value.

| API           | public void  getPrinterTemperature()                                         |
| --------      | --------------------------------------------------------------------       |
| Description   | get Printer temperature value                                              |
| Callback      | void printResult(boolean isSuccess, String status,int type)                | 
| printer       | MP600/D60                                                                      |

### Get Print Voltage

Call the API getPrinterVoltage() to get the voltage of the printer. 

**public void getPrinterVoltage()** 

statue: Printer Voltage value.

| API           | public void  getPrinterVoltage()                                         |
| --------      | --------------------------------------------------------------------   |
| Description   | get Printer Voltage value                                              |
| Callback      | void printResult(boolean isSuccess, String status,int type)            | 
| printer       | MP600/D60                                                                  |

