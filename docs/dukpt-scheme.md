## Overview

According to PCI security, there is no any keys allowed to be injected into device in plaintext. So every key that inject into device must be encrypted. QPOS support 2 different key management scheme: DUKPT and MKSK(Master/Session). Each key scheme working keys can be updated/injected under TMK or RSA key. The original TMK or RSA key are injected in dspread factory secure room by following procedures compliant with PCI PIN security.


### update IPEK key by TMK (symetrical)
By default, QPOS is injected TMK in factory. default tmk: **0123456789ABCDEFFEDCBA9876543210**. 

?>server side should use same tmk as inside terminal to encrypt IPEK keys to get encryptedIPEK and calculate its Key Check Value, then call API pos.updateIPEKOperation() to inject into terminal
``` java
String demoIpek="11111111111111111111111111111111"
String encDemoIpek = TDES.tdesECBEncrypt(tmk, demoIpek)); 

//encDemoIpek = 9B3A7B883A100F739B3A7B883A100F73
String demoIpekKcv = TDES.tdesECBEncrypt(demoIpek, "0000000000000000")); 

//call api to inejct ipek, let keyIndex =0
pos.updateIPEKOperation(keyIndex,encDemoIpek,demoIpekKcv);
```

[Online Tool to 3des calculation demo](https://neapay.com/online-tools/des-calculator.html?data=11111111111111111111111111111111&key=0123456789ABCDEFFEDCBA9876543210&algo=3DES&decr=false)


### update IPEK key by RSA （Asymetrical）


