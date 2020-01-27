## update emv config file

Download emv config template xml file, then put it into **Assets** folder, call below function to upgrade the config to terminal

``` java
pos.updateEmvConfig(InputStream is)

callback
/* 
onReturnCustomConfigResult(boolean isSuccess,String result)

```


## update specific emv tag
|   AID           |              Description           |  
|      :--:       |            ---:                    |
|A0000000031010   |   VISA Debit/Credit (Classic)      | 
|A0000000041010   |   MasterCard Credit/Debit (Global) |

9F06: AID   9F33: terminal capabilities  DF21: cvm execute limit

**example 1:**
update the terminal capabilities for only VISA Debit/Credit (Classic). 

``` java

//9F33 = E0F8C8 (len =3), means terminal support pin/signature 
pos.updateEmvCAPKByTlv(EMVDataOperation.Update,"9F0607A00000000310109F3303E0F8C8");

//callback function
onReturnUpdateEmvResult(boolean isSuccess)

```
**example 2:**
update terminal capabilities and cvm execute limit for only MasterCard Credit/Debit (Global)
``` java
//9F33 = E028C8 (len : 3bytes), means terminal support only support signature, disable pin
//DF21 = 000000000010 (len : 6bytes), means terminal will execute cvm above amount = 10
//                                    below amount =10 no cvm , that's is no pin, no signature 
pos.updateEmvCAPKByTlv(EMVDataOperation.Update,"9F0607A00000000410109F3303E028C8DF2106000000000010");

//callback function
onReturnUpdateEmvResult(boolean isSuccess)

```
**example 2:**
update terminal capabilities and cvm execute limit for all AID list, if not specify AID, then the config will be effective for AIDs inside terminal
``` java
//9F33 = E0F8C8 (len : 3bytes), means terminal support only support signature, disable pin
//DF21 = 000000000010 (len : 6bytes), means terminal will execute cvm above amount = 10
//                                    below amount =10 no cvm , that's is no pin, no signature 
pos.updateEmvCAPKByTlv(EMVDataOperation.Update,"9F3303E0F8C8DF2106000000000010");

//callback function
onReturnUpdateEmvResult(boolean isSuccess)

```

