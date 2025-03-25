## EMV tag book

Download the below **emv tag book** document, it contain the meaning of each EMV tag in emv config xml file. 
- [EMV TAG BOOK](https://github.com/DspreadOrg/FAQs_Document/blob/master/documents/EMV_TAG_BOOK.pdf)

## Update emv config

Download the below emv config template xml file,then put it into **Assets** folder, call below function to upgrade the config to terminal
- [QPOS mini](https://drive.google.com/file/d/1Osicc8ta-RiveneFA0xBigxyt9c_EhuX/view?usp=sharing) 
- [CR100, QPOS Cute, D20, D30](https://drive.google.com/file/d/1YIxPjA0FWg3czaxRuqb9djkXlYPD1lBO/view?usp=sharing)

``` java
Overloaded function
pos.updateEMVConfigByXml(String xmlStr);

//callback
onReturnCustomConfigResult(boolean isSuccess,String result)

```
## L3 certification
       
- The following are the emv configuration and firmware we generated based on the test cases of each country for L3 certification.

| Country  |                QPOS mini                 |       QPOS cute,CR100,D20,D30,D60        |                 TPP File                 |          Firmware                 |
| :------: | :--------------------------------------: | :--------------------------------------: | :--------------------------------------: |:--------------------------------------: |
|  MEXICO  | [MEXICO-QPOS mini.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/MEXICO/EMV%20file/MEXICO-QPOS%20mini.xml) | [MEXICO-QPOS cute,CR100,D20,D30,D60.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/MEXICO/EMV%20file/MEXICO-QPOS%20cute%2CCR100%2CD20%2CD30%2CD50%2CD70.xml) | [MEXICO-Certification.tpp](https://drive.google.com/file/d/1DFF99eeCqj-X8OQoIXU-Tb1PYXNJ8BAS/view?usp=sharing) |[MEXICO-Firmware](https://drive.google.com/drive/folders/1dATHQbkTj1fIsMjeE6TfNvowkWS5L9NL?usp=sharing)|
|  INDIA   | [INDIA-QPOS mini.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/INDIA/EMV%20file/INDIA-QPOS%20mini.xml) | [INDIA-QPOS cute,CR100,D20,D30,D60.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/INDIA/EMV%20file/INDIA-QPOS%20cute%2C%20CR100%2C%20D20%2C%20D30.xml) | [INDIA-Certification.tpp](https://drive.google.com/file/d/1PDvUkz2KIzj2lZPBNSHF6NodpLZCdlfX/view?usp=sharing) |[INDIA-Firmware](https://drive.google.com/drive/folders/1CYvnOAqmVaa9yIcSm5HKz9p-vjbq32nm?usp=sharing)|
| NIGERIA  | [NIGERIA-QPOS mini.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/NIGERIA/EMV%20file/NIGERIA-QPOS%20mini.xml) | [NIGERIA-QPOS cute,CR100,D20,D30,D60.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/NIGERIA/EMV%20file/NIGERIA-QPOS%20cute%2CCR100%2CD20%2CD30%2CD60%2CD50%2CD70.xml) | [NIGERIA-Certification.tpp](https://drive.google.com/file/d/1vuCC6YxdqM2Xf4uNsNMauQiZGkdlGRSX/view?usp=sharing) |[NIGERIA-Firmware](https://drive.google.com/drive/folders/157xxR8Xhr__IS6JM-pUGUCZXQR5ZBwC7?usp=sharing)|
|   USA    | [USA-QPOS mini.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/USA/EMV%20file/USA-QPOS%20mini.xml) | [USA-QPOS cute,CR100,D20,D30,D60.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/USA/EMV%20file/USA-QPOS%20cute%2CCR100%2CD20%2CD30%2CD50%2CD70.xml) | [USA-Certification.tpp](https://drive.google.com/file/d/1LwN3uAK8Tp67qBApLNgZRqg50-lzhdJO/view?usp=sharing) |[USA-Firmware](https://drive.google.com/drive/folders/19c-7yxkBWSNLZBfnkIDrqaJkiVsDp64f?usp=sharing)|
|  RUSSIA  | [RUSSIA-QPOS mini.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/RUSSIA/EMV%20file/RUSSIA-QPOS%20mini.xml) | [RUSSIA-QPOS cute,CR100,D20,D30,D60.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/RUSSIA/EMV%20file/RUSSIA-QPOS%20cute%2CCR100%2CD20%2CD30%2CD60%2CD50%2CD70.xml) | [RUSSIA-Certification.tpp](https://drive.google.com/file/d/1NxL2CkdQxlV2SSj9CjdhkgwaO6MsKVA0/view?usp=sharing) |[RUSSIA-Firmware](https://drive.google.com/drive/folders/15vodLXwsEYPpyuW7VpGdNmn9wQYWPsxz?usp=sharing)|
|  JAPAN   | [JAPAN-QPOS mini.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/JAPAN/EMV%20file/JAPAN-QPOS%20mini.xml) | [JAPAN-QPOS cute,CR100,D20,D30,D60.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/JAPAN/EMV%20file/JAPAN-QPOS%20cute%2CCR100%2CD20%2CD30%2CD60%2CD50%2CD70.xml) | [JAPAN-Certification.tpp](https://drive.google.com/file/d/1ZW_6LqFkFkX4XDjSwavGrJTEHFKfwJir/view?usp=sharing) |[JAPAN-Firmware](https://drive.google.com/drive/folders/1qPLobdOOjJ-FcgT3SUiVs7lq86VKZxxI?usp=sharing)|
| COLUMBIA | [COLUMBIA-QPOS mini.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/COLUMBIA/EMV%20file/COLUMBIA-QPOS%20mini.xml) | [COLUMBIA-QPOS cute,CR100,D20,D30,D60.xml](https://github.com/DspreadOrg/FAQs_Document/blob/master/L3%20Certification/COLUMBIA/EMV%20file/COLUMBIA-QPOS%20cute%2CCR100%2CD20%2CD30%2CD60%2CD50%2CD70.xml) | [COLUMBIA-Certification.tpp](https://drive.google.com/file/d/1hckep5SLOcBM2y3Gr0xG74wDv3uBIqgz/view?usp=sharing) |[COLUMBIA-Firmware](https://drive.google.com/drive/folders/1NG9WfmWptle3CsaEIvVOa_OVwvdZmBDO?usp=sharing)|

