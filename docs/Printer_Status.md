### 1. Get Printer Status

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

### 2. Get Printer Density

| API           | public void  getPrinterDensity()                                               |
| --------      | --------------------------------------------------------------------           |
| Description   | get Printer Density                                                            |
| Callback      | void printResult(boolean isSuccess, String status,int type)                    |
| printer       | MP600/D60                                                                      |

**Callback method parameter Description:**
- status: 1 to 5,5 is the highest.

### 3. Get Printer Speed

| API           | public void  getPrinterSpeed()                                               |
| --------      | --------------------------------------------------------------------         |
| Description   | get printer speed                                                            |
| Callback      | void printResult(boolean isSuccess, String status,int type)                  |
| printer       | MP600/D60                                                                    |

**Callback method parameter Description:**
- status: 1 to 5,5 is the highest.

### 4. Get Printer Temperature

| API           | public void  getPrinterTemperature()                                         |
| --------      | --------------------------------------------------------------------         |
| Description   | get printer temperature value                                                |
| Callback      | void printResult(boolean isSuccess, String status,int type)                  |
| printer       | MP600/D60                                                                    |

**Callback method parameter Description:**
- statue: printer temperature value.



