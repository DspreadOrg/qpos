## update emv config file

Download emv config template xml file for [QPOS mini](https://drive.google.com/file/d/1W3bgT9MXwN40WlaYviEqDxHu21DMlXu4/view?usp=sharing) and [CR100,QPOS Cute and D20](https://drive.google.com/file/d/126dWWzGdwwRupAX8Y0b0gc1eKr871BD4/view?usp=sharing), then put it into **Assets** folder, call below function to upgrade the config to terminal

``` java
Overloaded function
pos.updateEMVConfigByXml(String xmlStr);

//callback
onReturnCustomConfigResult(boolean isSuccess,String result)

```


## update specific emv tag
|   AID           |              Description           |  
|      :--:       |            ---:                    |
|A0000000031010   |   VISA Debit/Credit (Classic)      | 
|A0000000041010   |   MasterCard Credit/Debit (Global) |

9F06: AID
9F33: terminal capabilities
DF21: CVM execute limit

**example 1:**
update the terminal capabilities for only VISA Debit/Credit (Classic). 

``` java

//9F33 = E0F8C8 (len =3), means terminal support pin/signature 
pos.updateEmvAPPByTlv(EMVDataOperation.Update,"9F0607A00000000310109F3303E0F8C8");

//callback function
onReturnUpdateEmvResult(boolean isSuccess)

```
**example 2:**
update terminal capabilities and cvm execute limit for only MasterCard Credit/Debit (Global)
``` java
//9F33 = E028C8 (len : 3bytes), means terminal support only support signature, disable pin
//DF21 = 000000000010 (len : 6bytes), means terminal will execute cvm above amount = 10
//                                    below amount = 10 it will be no cvm , which is no pin, no signature 
pos.updateEmvAPPByTlv(EMVDataOperation.Update,"9F0607A00000000410109F3303E028C8DF2106000000000010");

//callback function
onReturnUpdateEmvResult(boolean isSuccess)

```
**example 3:**
update terminal capabilities and cvm execute limit for all AID list, if AID is not specified, then the config will be effective for all AIDs inside terminal
``` java
//9F33 = E0F8C8 (len : 3bytes), means terminal support pin and signature
//DF21 = 000000000010 (len : 6bytes), means terminal will execute cvm above amount = 10
//                                    below amount = 10 it will be no cvm , which is no pin, no signature 
pos.updateEmvAPPByTlv(EMVDataOperation.Update,"9F3303E0F8C8DF2106000000000010");

//callback function
onReturnUpdateEmvResult(boolean isSuccess)

```

