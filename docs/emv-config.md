## emv tag book

Download the below **emv tag book** document, it contain the meaning of each EMV tag in emv config xml file. 
- [EMV TAG BOOK](https://drive.google.com/file/d/1Ui4O2dQFKf_zzxfGzZWxqSmJCJHhSoxC/view?usp=share_link)

## update emv config file

Download the below emv config template xml file,then put it into **Assets** folder, call below function to upgrade the config to terminal
- [QPOS mini](https://drive.google.com/file/d/1Osicc8ta-RiveneFA0xBigxyt9c_EhuX/view?usp=sharing) 
- [CR100, QPOS Cute, D20, D30](https://drive.google.com/file/d/10JRdrtES4nC1MvcGxa3FXWaRSt3KoXRc/view?usp=sharing)

``` java
Overloaded function
pos.updateEMVConfigByXml(String xmlStr);

//callback
onReturnCustomConfigResult(boolean isSuccess,String result)

```
## L3 certification

The following is the emv configuration we generated based on the test cases of each country, it will help you pass L3 certification successfully, please use it.


|     Country     |        QPOS mini         |            QPOS cute,CR100,D20,D30,D60              |       TPP File       |
|      :--:       |          :---:           |               :---:                             |        :---:         |
|    COLUMBIA      |       [COLUMBIA-QPOS mini.xml](https://drive.google.com/file/d/1J_aEnQIDyaeGGv7Ql3jCVxv811p_9ID2/view?usp=sharing)  |            [COLUMBIA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1jTnsSF-6bDEa4DaQUGfFDFIk81RoLj96/view?usp=sharing)      |       [COLUMBIA-Certification.tpp](https://drive.google.com/file/d/1hckep5SLOcBM2y3Gr0xG74wDv3uBIqgz/view?usp=sharing)          |
|    INDIA      |       [INDIA-QPOS mini.xml](https://drive.google.com/file/d/1wK-lsDrR6Czl4Et6jKFp-zoJEK_ogtsH/view?usp=sharing)  |            [INDIA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1X6G8qjv3Yfxdid31SgV4MKt-PyhlssRq/view?usp=sharing)      |       [INDIA-Certification.tpp](https://drive.google.com/file/d/1PDvUkz2KIzj2lZPBNSHF6NodpLZCdlfX/view?usp=sharing)          |
|    JAPAN      |       [JAPAN-QPOS mini.xml](https://drive.google.com/file/d/1yqH8Yw1IewfuzoV3B_tjc7OqCLW_di7y/view?usp=sharing)  |            [JAPAN-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1ue9RNMKHhOgYMbUeiPrkNgQ1VGINMV8e/view?usp=sharing)      |       [JAPAN-Certification.tpp](https://drive.google.com/file/d/1ZW_6LqFkFkX4XDjSwavGrJTEHFKfwJir/view?usp=sharing)          |
|     MEXICO      |       [MEXICO-QPOS mini.xml](https://drive.google.com/file/d/1CaksVjo6EfCHO9NGBX2dcC1GIrrG1_Wm/view?usp=sharing)   |            [MEXICO-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1C-E0qPG8JrElrAl4yuxn387zmJJTObGI/view?usp=sharing)       |         [MEXICO-Certification.tpp](https://drive.google.com/file/d/1DFF99eeCqj-X8OQoIXU-Tb1PYXNJ8BAS/view?usp=sharing)            |
|    NIGERIA      |       [NIGERIA-QPOS mini.xml](https://drive.google.com/file/d/1CCkr10VhdsxJIKXdGeI2ZNhOU3wyouZx/view?usp=sharing)  |            [NIGERIA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/17ICePh4n4nKlvQv4vfIdtCDIvuZ8TpMX/view?usp=sharing)      |       [NIGERIA-Certification.tpp](https://drive.google.com/file/d/1vuCC6YxdqM2Xf4uNsNMauQiZGkdlGRSX/view?usp=sharing)          |
|    RUSSIA      |       [RUSSIA-QPOS mini.xml](https://drive.google.com/file/d/1BO4GJin5FbRmAeP1gXQYwKLjmetNxZVm/view?usp=sharing)  |            [RUSSIA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1DnqLptWGwl7MZwQd-ha8po-7zjNuOMoX/view?usp=sharing)      |       [RUSSIA-Certification.tpp](https://drive.google.com/file/d/1NxL2CkdQxlV2SSj9CjdhkgwaO6MsKVA0/view?usp=sharing)          |
|    USA      |       [USA-QPOS mini.xml](https://drive.google.com/file/d/1J_aEnQIDyaeGGv7Ql3jCVxv811p_9ID2/view?usp=sharing)  |            [USA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/16sKNysCJEuhP7tstGKK48mmVZ-1XSJFT/view?usp=sharing)      |       [USA-Certification.tpp](https://drive.google.com/file/d/1LwN3uAK8Tp67qBApLNgZRqg50-lzhdJO/view?usp=sharing)          |
