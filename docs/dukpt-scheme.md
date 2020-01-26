## Overview

According to PCI security, there is no any keys allowed to be injected into device in plaintext. So every key that inject into device must be encrypted. QPOS support 2 different key management scheme: DUKPT and MKSK(Master/Session). Each key scheme working keys can be updated/injected under TMK or RSA key. The original TMK or RSA key are injected in dspread factory secure room by following procedures compliant with PCI PIN security.


### update IPEK key by TMK (symetrical)
By default, QPOS is injected TMK in factory. default TMK: **0123456789ABCDEFFEDCBA9876543210**. 

?>server side should use same TMK as inside terminal to encrypt IPEK keys to get encryptedIPEK and calculate its Key Check Value, then call API pos.updateIPEKOperation() to inject into terminal
``` java
String trackIpek="11111111111111111111111111111111"

String encTrackIpek = envelope.bytes2hex(TDES.tdesECBDecrypt(tmk, trackIpek)); //encTrackIpek = 1A4D672DCA6CB3351FD1B02B237AF9AE
s
```

<div style='color: red'>
- Step 1: calculate encryptedIPEK under TMK（[demo encryptedIPEK](http://extranet.cryptomathic.com/descalc/index?key=0123456789ABCDEFFEDCBA9876543210&iv=0000000000000000&input=11111111111111111111111111111111&mode=ecb&action=Encrypt&output=1A4D672DCA6CB3351FD1B02B237AF9AE)）


- Step 2: calculate key check value ([demo KCV](http://extranet.cryptomathic.com/descalc/index?key=11111111111111111111111111111111&iv=0000000000000000&input=0000000000000000&mode=ecb&action=Encrypt&output=9B3A7B883A100F739B3A7B883A100F73)）



### update IPEK key by RSA （Asymetrical）
