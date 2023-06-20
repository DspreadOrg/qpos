Please follow the below printer sdk document to integrate printer functions
- [Printer SDK Guide](https://drive.google.com/file/d/1Dj5ATBWgj7eZPmXPmF_WVgHQCXrPLLxw/view?usp=sharing)

## Dspread Printing SDK Overview

 1. How to integrate SDK

Dspread printing SDK can be obtained through remote repository, and you only need to add the dependency to the build.gradle of the module.
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

## APIs for printing text

public void printText(String text)


| API           | public void printText(String text)                         |
| --------      | ---------------------------------------------------------- |
| Description   | Print text.                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/MP600                                                  |


**Parameter Description:** 

String text:Specify the printed text content 


## APIs for printing BarCode

public void printBarCode(Context context,String symbology, int width, int height, String content,int position)

| API           | public void printBarCode(Context context,String symbology,int width,int height,String content,int position)|
| --------      | ---------------------------------------------------------- |
| Description   |Print BarCode.                                              |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/MP600                                                  |


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

public void printQRCode(Context context,String errorLevel,int width,String content,int position) 

| API           | public void printQRCode(Context context,String errorLevel,int width,String content,int position)|
| --------      | ---------------------------------------------------------- |
| Description   |Print QRCode.                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/MP600                                                  | 

**Parameter Description:** 

context: Context. 

errorLevel:Error correction level. 
Barcode2D.ErrorLevel.L.name(),
Barcode2D.ErrorLevel.H.name(),
Barcode2D.ErrorLevel.M.name(),
Barcode2D.ErrorLevel.Q.name() 

width:Set the size of the QR code block. 

content:Set up the QR code block content. 

position:Set up the QR code block alignment. 


## APIs for printing Bitmap

public void printBitmap(Context context, Bitmap bitmap)

| API           | public void printBitmap(Context context, Bitmap bitmap)    |
| --------      | ---------------------------------------------------------- |
| Description   |Print Bitmap                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/MP600                                                  | 

**Parameter Description:** 

cotext: Context.

bitmap: Image bitmap data. 

## APIs for printing Multiple Columns

public void addTexts(String[] texts, int[] colsWidthArrs, int[] styles) 

| API           | public void addTexts(String[] texts, int[] colsWidthArrs, int[] styles)      |
| --------      | --------------------------------------------------------------------         |
| Description   |Send print content to the printer in a row with fixed size fixed style content|
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | D30/MP600                                                                    |

**Parameter Description:** 

texts:Each column to print, the array size is the number of columns. 

colsWidthArrs:The proportion of each column in a row, such as int[] {1,1}, will print each column by 1:1. 

styles:Set Text Position.


## APIs for Print

public void print(Context context)

Before calling the method, you can call the following method to add content: 
addText(),addTexts(),addBarCode(),addQRCode(),addBitmap(). 

| API           | public void print(Context context)                                           |
| --------      | --------------------------------------------------------------------         |
| Description   |Print composite type files,First add the different types of files. Then call this interface to print|
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | D30/MP600                                                                    |

**Parameter Description:** 

context:Context. 


## Stop Print
public void stopPrint()

| API           | public void stopPrint()                                        |
| --------      | ------------------------------------------------------------   |
| Description   |Stop Print                                                      |
| Callback      | void printResult(boolean isSuccess, String status,int type)    | 
| printer       | MP600                                                          |


