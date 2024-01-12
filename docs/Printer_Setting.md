### 1. Set Printer Density

| API           | public void setPrinterDensity(int printerDensityLevel)             |
| --------      | ------------------------------------------------------------       |
| Description   | Set printer Density.                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)        | 
| printer       | MP600/D60                                                          |

**Parameter Description:** 
- printerDensityLevel: Printer concentration levels (1 to 5 5 is the highest).

### 2. Set Printer Speed

| API           | public void setPrinterSpeed(int printerSpeedLevel)               |
| --------      | ------------------------------------------------------------     |
| Description   | Set printer Speed.                                               |
| Callback      | void printResult(boolean isSuccess, String status,int type)      | 
| printer       | MP600/D60                                                        |

**Parameter Description:** 
- printerSpeedLevel: Printer speed levels (1 to 5，5 is the highest).

### 3. Set Text Print Style

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