The printer object can use the following APIs to manage printers and meet different printing needs, including:
- printText()：Text printing API
- printBitmap()：Picture printing API
- printBarCode(): BarCode printing API
- printQRCode(): QRCode printing API
- print(): composite content printing API


### 1. Set Text Print Style

| API           | setPrintStyle(PrintLineStyle style)                           |
| --------      | ---------------------------------------------------------- |
| Description   | please new a PrintLineStyle object and set print text align.  |
| Callback      | N/A                                                        | 
| printer       | D30/D60/D70                                             |

**Parameter Description:** 
- style:
    - void setAlign(int align);
       - align：
         - PrintLine.LEFT
         - PrintLine.CENTER
         - PrintLine.RIGHT
    -  setFontStyle(int bold):
       - bold
         - PrintStyle.FontStyle.NORMAL
         - PrintStyle.FontStyle.BOLD
         - PrintStyle.FontStyle.ITALIC
         - PrintStyle.FontStyle.BOLD_ITALIC
    - setFontSize(int fontsize):
       - fontSize: custom text size (recommended 14 ~ 18)


### 2. Print Text

| API           | public void printText(String text)                         |
| --------      | ---------------------------------------------------------- |
| Description   | Print text.                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/D70                                             |

**Parameter Description:** 

- text: specify printing text content

### 3. Print BarCode

| API           | public void printBarCode(Context context,String symbology,int width,int height,String content,int position)|
| --------      | ---------------------------------------------------------- |
| Description   | Print BarCode.                                             |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/D70                                             |

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

### 4. Print QRCode

| API           | public void printQRCode(Context context,String errorLevel,int width,String content,int position)|
| --------      | ---------------------------------------------------------- |
| Description   | Print QRCode.                                              |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/D70                                              | 

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

### 5. Print Bitmap

| API           | public void printBitmap(Context context, Bitmap bitmap)    |
| --------      | ---------------------------------------------------------- |
| Description   | Print Bitmap                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/D70                                              | 

**Parameter Description:** 
- cotext: Context.
- bitmap: Image bitmap data (Format: PNG/JPG convert to bitmap, Size: width within 384 px, height undefined). 

### 6. add multiple columns text 

| API           | public void addTexts(String[] texts, int[] colsWidthArrs, int[] styles)      |
| --------      | --------------------------------------------------------------------         |
| Description   |Send print content to the printer in a row with fixed size fixed style content|
| Callback      | N/A                 | 
| printer       | D30/D60/D70                                                               |

**Parameter Description:** 
- texts: Each column to print, the array size is the number of columns.
- colsWidthArrs: The proportion of each column in a row, such as int[] {1,1}, will print each column by 1:1.
- styles: Set Text Position.

### 7. add text 

| API           | public void addText (String text)      |
| --------      | --------------------------------------------------------------------         |
| Description   |Add printed text|
| Callback      | N/A                 | 
| printer       | D30/D60/D70                                                               |

**Parameter Description:** 
- text: printed text content

### 8. add BarCode 

| API           | public void addBarCode(Context context, String Symbology, int width, int height, String content, int position)   |
| --------      | --------------------------------------------------------------------         |
| Description   |Add printed BarCode|
| Callback      | N/A                 | 
| printer       | D30/D60/D70     |

**Parameter Description:** 
 -	Context
 - Symbology: Barcode1D.CODE_128.name()
 - Width: BarCode width
 - Height: BarCode height
 - Content: BarCode Content
 - Position: PrintLine.CENTER, PrintLine.RIGHT,PrintLine.LEFT


### 9. add addQRCode 

| API           |public void addQRCode(int width, String qrCodeName, String content, int position)  |
| --------      | --------------------------------------------------------------------         |
| Description   |Add printed QRCode|
| Callback      | N/A              | 
| printer       | D30/D60/D70     |

**Parameter Description:** 
  - width: QRcode width
  - qrCodeName: Barcode2D.QR_CODE.name()
  - content: QRCode Content
  - position: PrintLine.CENTER, PrintLine.RIGHT,PrintLine.LEFT


### 10. add Bitmap 

| API           |public void addBitmao(Bitmap bitmap, int positio) |
| --------      | --------------------------------------------------------------------         |
| Description   |Add printed QRCode|
| Callback      | N/A              | 
| printer       | D30/D60/D70     |

**Parameter Description:** 
  
 - bitmap: printed bitmap
 - position: PrintLine.CENTER, PrintLine.RIGHT,PrintLine.LEFT


 ### 11. add PrintLintStyle

| API           |public void addPrintLintStyle (PrintLineStyle style) |
| --------      | --------------------------------------------------------------------         |
| Description   |the API sets the text font size, position, and font style for api addText|
| Callback      | N/A              | 
| printer       | D30/D60/D70     |

**Parameter Description:**  
 - style: PrintLineStyle (need new PrintLineStyle object ) 
          example code: mPrinter.addPrintLintStyle(new PrintLineStyle(PrintStyle.FontStyle.NORMAL,PrintLine.CENTER, 14));

 ### 12. Set text line space

| API           |public void setLineSpace(int mlineSpace) |
| --------      | --------------------------------------------------------------------         |
| Description   |Set text line spacing|
| Callback      | N/A              | 
| printer       | D30/D60/D70     |

**Parameter Description:**  
 - mlineSpace: setting value 2.3.4.5.6...

 ### 13. Set image space

| API           |public void setBitmapSpace (int bitmapSpace)|
| --------      | --------------------------------------------------------------------         |
| Description   |Set bitmap line spacing|
| Callback      | N/A              | 
| printer       | D30/D60/D70     |

**Parameter Description:**  
 - bitmapSpace: setting value 2.3.4.5.6...


### 14. Print composite content

before calling the method, you can call the following method to add content: 
- addTexts()
- addText()
- addBarCode()
- addQRCode()
- addBitmap()
- addPrintLintStyle()

| API           | public void print(Context context)                                           |
| --------      | --------------------------------------------------------------------         |
| Description   | Print composite type files,First add the different types of files. Then call this interface to print|
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | D30/D60/D70                                                               |

**Parameter Description:** 
- context: Context.

 
### 15. close printer

| API           | public void close()                                           |
| --------      | --------------------------------------------------------------------         |
| Description   | Close the printer after printing is complete|
| Callback      | N/A                  | 
| printer       | D30/D60/D70                                                               |

### 16. Print CallBack Method

| API           | public void printResult(boolean isSuccess, String status,int type) |
| --------      | ------------------------------------------------------------       |
| Description   | Callback interface                                                 |
| printer       | D30/D60/D70                                                     |

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
