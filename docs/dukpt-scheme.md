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
String encDemoTrackIpek = TDES.tdesECBEncrypt(tmk, demoTrackIpek)); 

 String demoEmvKsn ="09120200630001E0004C"
String demoEmvIpek="A5DBF2D67C6DAC23824D300990F99F35 "
String demoEmvIpekKcv = TDES.tdesECBEncrypt(demoEmvIpek, "0000000000000000"));
//encDemoEmvIpek = 2B7D562AFA3EAC7970664394CD19D3D3
String encDemoEmvIpek = TDES.tdesECBEncrypt(tmk, demoEmvIpek)); 

String demoPinKsn ="09120200630001E0004C"
String demoPinIpek="A5DBF2D67C6DAC23824D300990F99F35 "
String demoPinIpekKcv = TDES.tdesECBEncrypt(demoPinIpek, "0000000000000000"));
//encDemoIpek = 2B7D562AFA3EAC7970664394CD19D3D3
String encDemoPinIpek = TDES.tdesECBEncrypt(tmk, demoPinIpek)); 


//call api to inejct ipek, let keyIndex =0
pos.updateIPEKOperation(keyIndex,   
        demoTrackKsn,encDemoTrackIpek,demoIpekKcv,   
        demoEmvKsn,encDemoEmvIpek,demoEmvIpekKcv,   
        demoPinKsn,encDemoPinIpek,demoPinIpekKcv);
```

[Online Tool to 3des calculation demo](https://neapay.com/online-tools/des-calculator.html?data=A5DBF2D67C6DAC23824D300990F99F35&key=0123456789ABCDEFFEDCBA9876543210&algo=3DES&decr=false)

### update IPEK key by Key Type （Asymetrical）


### update IPEK key by RSA （Asymetrical）


