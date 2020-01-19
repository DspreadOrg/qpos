## DUKPT 

According to PCI security, there is no any keys allowed to be injected into device in plaintext. So every key that inject into device must be encrypted. QPOS support 2 different key management scheme: DUKPT and MKSK(Master/Session). Each key scheme working keys can be updated/injected under TMK or RSA key. The original TMK or RSA key are injected in dspread factory secure room by following procedures compliant with PCI PIN security.


### update IPEK key by TMK
By default, QPOS is injected TMK(0123456789ABCDEFFEDCBA9876543210 ) in factory. so IPEK must be encrypted by default TMK(0123456789ABCDEFFEDCBA9876543210). 



### update IPEK key by RSA


## MKSK

### update session key

### update master key
