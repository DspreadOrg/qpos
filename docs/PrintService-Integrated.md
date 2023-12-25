## 1. Dspread Printing SDK Overview

Please follow the below printer sdk document to integrate printer functions
- [Printer SDK Guide](https://drive.google.com/file/d/1whNFrWa69OddbrFQi6FCu6zOjlxvFTsk/view?usp=sharing)

### 1.1 How to integrate SDK

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

- [x] [Android Printer Demo](https://gitlab.com/dspread/android) 
    
</div>

### 1.2 How to use the SDK

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
 3. SDK exceptions

 > Dspread printing SDK basically is applicable to all Dspread devices. For some models, the APIs may not be supported since the system version is too old. In this case, please contact Dspread technical support to upgrade the device to the latest version.

## 2. Printer SDK API

### 2.1 Set Print Text Align

| API           | public void setAlign(int align)                            |
| --------      | ---------------------------------------------------------- |
| Description   | please new a PrintLineStyle object and set print text align.  |
| Callback      | N/A                                                        | 
| printer       | D30/D60/MP600                                              |

**Parameter Description:** 
- align: 
   - PrintLine.LEFT
   - PrintLine.CENTER
   - PrintLine.RIGHT

### 2.2 Set Print Text Font Size

| API           | void setFontSize(int fontSize)                            |
| --------      | ----------------------------------------------------------|
| Description   | please new a PrintLineStyle object and set print text font size.|
| Callback      | N/A                                                       | 
| printer       | D30/D60/MP600                                             |

**Parameter Description:** 
- fontSize: custom text size (recommended 14 ~ 18)

### 2.3 Set Print Text Font Style

| API           | void setFontStyle(int bold)                               |
| --------      | ----------------------------------------------------------|
| Description   | please new a PrintLineStyle object and set print text font style.|
| Callback      | N/A                                                       | 
| printer       | D30/D60/MP600                                             |

**Parameter Description:** 
- bold:
   - PrintStyle.FontStyle.NORMAL
   - PrintStyle.FontStyle.BOLD
   - PrintStyle.FontStyle.ITALIC 
   - PrintStyle.FontStyle.BOLD_ITALIC 

### 2.4 Print Text

| API           | public void printText(String text)                         |
| --------      | ---------------------------------------------------------- |
| Description   | Print text.                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              |

**Parameter Description:** 

- text: specify printing text content

### 2.5 Print BarCode

| API           | public void printBarCode(Context context,String symbology,int width,int height,String content,int position)|
| --------      | ---------------------------------------------------------- |
| Description   | Print BarCode.                                             |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              |

**Parameter Description:** 
- context: Context. 
- symbology: 
   -  Barcode1D.CODE_128.name(); 
   -  Barcode1D.CODABAR.name(); 
   -  Barcode1D.CODE_39.name(); 
   -  Barcode1D.EAN_8.name(); 
   -  Barcode1D.EAN_13.name(); 
   -  Barcode1D.UPC_A.name(); 
   -  Barcode1D.UPC_E.name(); 
- width: Set the block width.    
- height: Set barcode height. 
- content: Set barcode content. 
- position: Set barcode alignment.

### 2.6 Print QRCode

| API           | public void printQRCode(Context context,String errorLevel,int width,String content,int position)|
| --------      | ---------------------------------------------------------- |
| Description   | Print QRCode.                                              |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              | 

**Parameter Description:** 
- context: Context.
- errorLevel: Error correction level.
   - Barcode2D.ErrorLevel.L.name()
   - Barcode2D.ErrorLevel.H.name()
   - Barcode2D.ErrorLevel.M.name()
   - Barcode2D.ErrorLevel.Q.name() 
- width: Set the size of the QR code block.
- content: Set up the QR code block content.
- position: Set up the QR code block alignment.

### 2.7 Print Bitmap

| API           | public void printBitmap(Context context, Bitmap bitmap)    |
| --------      | ---------------------------------------------------------- |
| Description   | Print Bitmap                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              | 

**Parameter Description:** 
- cotext: Context.
- bitmap: Image bitmap data. 

### 2.8 Print Multiple Columns

| API           | public void addTexts(String[] texts, int[] colsWidthArrs, int[] styles)      |
| --------      | --------------------------------------------------------------------         |
| Description   |Send print content to the printer in a row with fixed size fixed style content|
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | D30/D60/MP600                                                                |

**Parameter Description:** 
- texts: Each column to print, the array size is the number of columns.
- colsWidthArrs: The proportion of each column in a row, such as int[] {1,1}, will print each column by 1:1.
- styles: Set Text Position.

### 2.9 Print All Types Display

Before calling the method, you can call the following method to add content: 
- addText()
- addTexts()
- addBarCode()
- addQRCode()
- addBitmap()

| API           | public void print(Context context)                                           |
| --------      | --------------------------------------------------------------------         |
| Description   | Print composite type files,First add the different types of files. Then call this interface to print|
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | D30/D60/MP600                                                                |

**Parameter Description:** 
- context: Context.

### 2.10 Print CallBack Method

| API           | public void printResult(boolean isSuccess, String status,int type) |
| --------      | ------------------------------------------------------------       |
| Description   | Callback interface                                                 |
| printer       | D30/D60/MP600                                                      |

**Parameter Description:** 
- isSuccess: true/false. 
- statue: Returns the printer status value. 
- type: 
    - 1 mean PRINT_RESULT;
    - 3 mean GET_DESITY;
    - 5 mean GET_SPEED;
    - 6 mean GET_TEMPERATURE;
    - 7 mean GET_VOLTAGE;
    - 8 mean GET_STATUS; 

## 3. Printer Setting

### 3.1 Set Printer Density

| API           | public void setPrinterDensity(int printerDensityLevel)             |
| --------      | ------------------------------------------------------------       |
| Description   | Set printer Density.                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)        | 
| printer       | MP600/D60                                                          |

**Parameter Description:** 
- printerDensityLevel: Printer concentration levels (1 to 5 5 is the highest).

### 3.2 Set Printer Speed

| API           | public void setPrinterSpeed(int printerSpeedLevel)               |
| --------      | ------------------------------------------------------------     |
| Description   | Set printer Speed.                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)      | 
| printer       | MP600/D60                                                        |

**Parameter Description:** 
- printerSpeedLevel: Printer speed levels (1 to 5，5 is the highest).

### 3.3 Set Text Print Style

| API           | public void setPrintStyle(PrintLineStyle style)                |
| --------      | ------------------------------------------------------------   |
| Description   | Set the text alignment and font effect.                        |
| Callback      | N/A                                                            | 
| printer       | D30/MP600/D60                                                  |

**Parameter Description:** 
 - style: Please call the below methods to set print line style.
    - void setAlign(int align); 
    - void setFontSize(int fontSize); 
    - void setFontStyle (int bold);


## 4. Printer Status Getting Function

### 4.1 Get Printer Status
| API           | public void getPrinterStatus()                                               |
| --------      | --------------------------------------------------------------------         |
| Description   | get printer status                                                           |
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | MP600/D60                                                                    |

**Callback method parameter Description:** 
- status: 
   - Normal
   - Printing
   - NoPaper
   - Overheated
   - Undefined

### 4.2 Get Printer Density
| API           | public void  getPrinterDensity()                                               |
| --------      | --------------------------------------------------------------------           |
| Description   | get Printer Density                                                            |
| Callback      | void printResult(boolean isSuccess, String status,int type)                    | 
| printer       | MP600/D60                                                                      |

**Callback method parameter Description:** 
- status: 1 to 5,5 is the highest. 

### 4.3 Get Printer Speed
| API           | public void  getPrinterSpeed()                                               |
| --------      | --------------------------------------------------------------------         |
| Description   | get printer speed                                                            |
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | MP600/D60                                                                    |

**Callback method parameter Description:** 
- status: 1 to 5,5 is the highest.

### 4.4 Get Printer Temperature
| API           | public void  getPrinterTemperature()                                         |
| --------      | --------------------------------------------------------------------         |
| Description   | get printer temperature value                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | MP600/D60                                                                    |

**Callback method parameter Description:** 
- statue: printer temperature value.

### 4.5 Get Print Voltage
| API           | public void  getPrinterVoltage()                                         |
| --------      | --------------------------------------------------------------------     |
| Description   | get Printer Voltage value                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)              | 
| printer       | MP600/D60                                                                |

**Callback method parameter Description:**                                                              
- statue: printer voltage value.
