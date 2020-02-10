## Overview

### update session key
By default, QPOS is injected TMK in factory. default TMK: **0123456789ABCDEFFEDCBA9876543210**. 

?>server side should use same TMK as inside terminal to encrypt session keys to get encrypted session keys and calculate its Key Check Value, then call API pos.updateWorkKey() to inject into terminal
``` java
String demoPINKey="11111111111111111111111111111111"
//encDemoPINKey = 1A4D672DCA6CB3351FD1B02B237AF9AE
String encDemoPINKey = TDES.tdesECBEncrypt(tmk, demoPINKey)); 
String demoPINKeyKcv = TDES.tdesECBEncrypt(demoPINKey, "0000000000000000")); 

String demoTRACKKey="11111111111111111111111111111111"
//encDemoIpek = 1A4D672DCA6CB3351FD1B02B237AF9AE
String encDemoTRACKKey = TDES.tdesECBEncrypt(tmk, demoTRACKKey)); 
String demoTRACKKeyKcv = TDES.tdesECBEncrypt(demoTRACKKey, "0000000000000000")); 

String demoMACKey="11111111111111111111111111111111"
//encDemoMACkey = 1A4D672DCA6CB3351FD1B02B237AF9AE
String encDemoMACKey = TDES.tdesECBEncrypt(tmk, demoMACKey)); 
String demoMACKeyKcv = TDES.tdesECBEncrypt(demoMACKey, "0000000000000000")); 

//call api to inejct session keys, let keyIndex =0
pos.udpateWorkKey(
                    encDemoPINKey, demoPINKeyKcv,//PIN KEY
                    encDemoTRACKKey, demoTRACKKeyKcv,  //TRACK KEY
                    encDemoMACKey, demoMACKeyKcv, //MAC KEY
                    keyIndex);

```

[Online Tool to 3des calculation demo](http://extranet.cryptomathic.com/descalc/index?key=0123456789ABCDEFFEDCBA9876543210&iv=0000000000000000&input=11111111111111111111111111111111&mode=ecb&action=Encrypt&output=1A4D672DCA6CB3351FD1B02B237AF9AE)


### update master key

By default, QPOS is injected TMK in factory. default TMK: **0123456789ABCDEFFEDCBA9876543210**. 

?>server side should use default TMK to encrypt new TMK to get encrypted new TMK key and calculate its Key Check Value, then call API pos.updateMasterKey() to inject into terminal
``` java
String demoNewMasterKey="11111111111111111111111111111111"
//encDemoNewMasterKey = 1A4D672DCA6CB3351FD1B02B237AF9AE
String encDemoNewMasterKey = TDES.tdesECBEncrypt(tmk, demoNewMasterKey)); 
String demoNewMasterKeyKcv = TDES.tdesECBEncrypt(demoNewMasterKey, "0000000000000000")); 

//call api to inejct new master key, let keyIndex =0
pos.udpdateMasterKey(encDemoNewMasterKey, demoNewMasterKeyKcv, //new master key
                    keyIndex);

```

[Online Tool to 3des calculation demo](http://extranet.cryptomathic.com/descalc/index?key=0123456789ABCDEFFEDCBA9876543210&iv=0000000000000000&input=11111111111111111111111111111111&mode=ecb&action=Encrypt&output=1A4D672DCA6CB3351FD1B02B237AF9AE)


