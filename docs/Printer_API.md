### 1. Set Print Text Align

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

### 2. Set Print Text Font Size

| API           | void setFontSize(int fontSize)                            |
| --------      | ----------------------------------------------------------|
| Description   | please new a PrintLineStyle object and set print text font size.|
| Callback      | N/A                                                       | 
| printer       | D30/D60/MP600                                             |

**Parameter Description:** 
- fontSize: custom text size (recommended 14 ~ 18)

### 3. Set Print Text Font Style

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

### 4. Print Text

| API           | public void printText(String text)                         |
| --------      | ---------------------------------------------------------- |
| Description   | Print text.                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              |

**Parameter Description:** 

- text: specify printing text content

### 5. Print BarCode

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

### 6. Print QRCode

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

### 7. Print Bitmap

| API           | public void printBitmap(Context context, Bitmap bitmap)    |
| --------      | ---------------------------------------------------------- |
| Description   | Print Bitmap                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)| 
| printer       | D30/D60/MP600                                              | 

**Parameter Description:** 
- cotext: Context.
- bitmap: Image bitmap data (Format: PNG/JPG convert to bitmap, Size: width within 384 px, height undefined). 

### 8. Print Multiple Columns

| API           | public void addTexts(String[] texts, int[] colsWidthArrs, int[] styles)      |
| --------      | --------------------------------------------------------------------         |
| Description   |Send print content to the printer in a row with fixed size fixed style content|
| Callback      | void printResult(boolean isSuccess, String status,int type)                  | 
| printer       | D30/D60/MP600                                                                |

**Parameter Description:** 
- texts: Each column to print, the array size is the number of columns.
- colsWidthArrs: The proportion of each column in a row, such as int[] {1,1}, will print each column by 1:1.
- styles: Set Text Position.

### 9. Print All Types Display

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

### 10. Print CallBack Method

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




