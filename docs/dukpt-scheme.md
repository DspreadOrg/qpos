## Overview

According to PCI security, there is no any keys allowed to be injected into device in plaintext. So every key that inject into device must be encrypted. QPOS support 2 different key management scheme: DUKPT and MKSK(Master/Session). Each key scheme working keys can be updated/injected under TMK or RSA key. The original TMK or RSA key are injected in dspread factory secure room by following procedures compliant with PCI PIN security.


### update IPEK key by TMK (symetrical)
By default, QPOS is injected TMK in factory. default tmk: **0123456789ABCDEFFEDCBA9876543210**. 

?>server side should use same tmk as inside terminal to encrypt IPEK keys to get encryptedIPEK and calculate its Key Check Value, then call API pos.updateIPEKOperation() to inject into terminal
``` java
String demoTrackKsn ="09120200630001E0004C"
String demoTrackIpek="A5DBF2D67C6DAC23824D300990F99F35 "
String demoIpekKcv = TDES.tdesECBEncrypt(demoTrackIpek, "0000000000000000"));
//encDemoTrackIpek = 2B7D562AFA3EAC7970664394CD19D3D3
//demoIpekKcv = B62AA0959DD665C1
String encDemoTrackIpek = TDES.tdesECBEncrypt(tmk, demoTrackIpek)); 

String demoEmvKsn ="09220200630001E0004C"
String demoEmvIpek="91B075704A9470B08F49F20E07E6EF9B "
String demoEmvIpekKcv = TDES.tdesECBEncrypt(demoEmvIpek, "0000000000000000"));
//encDemoEmvIpek = 03F686995B0BD20F9E738AFE05AFBB71
//demoIpekKcv = 321C1F0712CF5F1D
String encDemoEmvIpek = TDES.tdesECBEncrypt(tmk, demoEmvIpek)); 

String demoPinKsn ="09320200630001E0004C"
String demoPinIpek="2B7D562AFA3EAC7970664394CD19D3D3 "
String demoPinIpekKcv = TDES.tdesECBEncrypt(demoPinIpek, "0000000000000000"));
//encDemoIpek = A7B8EDBEED5A71AFDB6763F5A1169F96
//demoIpekKcv = 6988C7294F5809F9
String encDemoPinIpek = TDES.tdesECBEncrypt(tmk, demoPinIpek)); 


//call api to inejct ipek, let keyIndex =0
/* pos.doUpdateIPEKOperation(0,   
        09120200630001E0004C,2B7D562AFA3EAC7970664394CD19D3D3,B62AA0959DD665C1,   
        09220200630001E0004C,03F686995B0BD20F9E738AFE05AFBB71,321C1F0712CF5F1D,   
         09320200630001E0004C,A7B8EDBEED5A71AFDB6763F5A1169F96,6988C7294F5809F9);*/

pos.doUpdateIPEKOperation(keyIndex,   
        demoTrackKsn,encDemoTrackIpek,demoIpekKcv,   
        demoEmvKsn,encDemoEmvIpek,demoEmvIpekKcv,   
        demoPinKsn,encDemoPinIpek,demoPinIpekKcv);
```

[Online Tool to 3des calculation demo](https://neapay.com/online-tools/des-calculator.html?data=A5DBF2D67C6DAC23824D300990F99F35&key=0123456789ABCDEFFEDCBA9876543210&algo=3DES&decr=false)


### update IPEK key by RSA （Asymetrical）


