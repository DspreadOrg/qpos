## Overview

### update session key
By default, QPOS is injected TMK in factory. default TMK: **0123456789ABCDEFFEDCBA9876543210**. 

?>server side should use same TMK as inside terminal to encrypt session keys to get encrypted session keys and calculate its Key Check Value, then call API pos.updateWorkKey() to inject into terminal
``` java
String demoPINKey="11111111111111111111111111111111"
String encDemoPINKey = TDES.tdesECBEncrypt(tmk, demoPINKey)); 
//encDemoPINKey = 9B3A7B883A100F739B3A7B883A100F73
String demoPINKeyKcv = TDES.tdesECBEncrypt(demoPINKey, "0000000000000000")); 

String demoTRACKKey="11111111111111111111111111111111"
String encDemoTRACKKey = TDES.tdesECBEncrypt(tmk, demoTRACKKey)); 
//encDemoTRACKKey = 9B3A7B883A100F739B3A7B883A100F73
String demoTRACKKeyKcv = TDES.tdesECBEncrypt(demoTRACKKey, "0000000000000000")); 

String demoMACKey="11111111111111111111111111111111"
String encDemoMACKey = TDES.tdesECBEncrypt(tmk, demoMACKey)); 
//encDemoMACKey = 9B3A7B883A100F739B3A7B883A100F73
String demoMACKeyKcv = TDES.tdesECBEncrypt(demoMACKey, "0000000000000000")); 

//call api to inject session keys, let keyIndex =0
pos.udpateWorkKey(
                    encDemoPINKey, demoPINKeyKcv,//PIN KEY
                    encDemoTRACKKey, demoTRACKKeyKcv,  //TRACK KEY
                    encDemoMACKey, demoMACKeyKcv, //MAC KEY
                    keyIndex);

```

[Online Tool to 3des calculation demo](https://neapay.com/online-tools/des-calculator.html?data=11111111111111111111111111111111&key=0123456789ABCDEFFEDCBA9876543210&algo=3DES&decr=false)


### update master key

By default, QPOS is injected TMK in factory. default TMK: **0123456789ABCDEFFEDCBA9876543210**. 

?>server side should use default TMK to encrypt new TMK to get encrypted new TMK key and calculate its Key Check Value, then call API pos.updateMasterKey() to inject into terminal
``` java
String demoNewMasterKey="22222222222222222222222222222222"
String encDemoNewMasterKey = TDES.tdesECBEncrypt(tmk, demoNewMasterKey)); 

//encDemoNewMasterKey = B4ABA2BB791C50E7B4ABA2BB791C50E7
String demoNewMasterKeyKcv = TDES.tdesECBEncrypt(demoNewMasterKey, "0000000000000000")); 

//call api to inject new master key, let keyIndex =0
pos.setMasterKey(encDemoNewMasterKey, demoNewMasterKeyKcv, //new master key
                    keyIndex);

```

[Online Tool to 3des calculation demo](https://neapay.com/online-tools/des-calculator.html?data=22222222222222222222222222222222&key=0123456789ABCDEFFEDCBA9876543210&algo=3DES&decr=false)


