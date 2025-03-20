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
|  MEXICO  | [MEXICO-QPOS mini.xml](https://drive.google.com/file/d/1pYeE2yHs-67nTJKPergXZlZweBz3Mhmb/view?usp=sharing) | [MEXICO-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1ErlMSghZBJASHXwQq5ah9GMfn4p5k-HG/view?usp=sharing) | [MEXICO-Certification.tpp](https://drive.google.com/file/d/1DFF99eeCqj-X8OQoIXU-Tb1PYXNJ8BAS/view?usp=sharing) |[MEXICO-Firmware](https://drive.google.com/drive/folders/1dATHQbkTj1fIsMjeE6TfNvowkWS5L9NL?usp=sharing)|
|  INDIA   | [INDIA-QPOS mini.xml](https://drive.google.com/file/d/1wK-lsDrR6Czl4Et6jKFp-zoJEK_ogtsH/view?usp=sharing) | [INDIA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1X6G8qjv3Yfxdid31SgV4MKt-PyhlssRq/view?usp=sharing) | [INDIA-Certification.tpp](https://drive.google.com/file/d/1PDvUkz2KIzj2lZPBNSHF6NodpLZCdlfX/view?usp=sharing) |[INDIA-Firmware](https://drive.google.com/drive/folders/1CYvnOAqmVaa9yIcSm5HKz9p-vjbq32nm?usp=sharing)|
| NIGERIA  | [NIGERIA-QPOS mini.xml](https://drive.google.com/file/d/1CCkr10VhdsxJIKXdGeI2ZNhOU3wyouZx/view?usp=sharing) | [NIGERIA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/17ICePh4n4nKlvQv4vfIdtCDIvuZ8TpMX/view?usp=sharing) | [NIGERIA-Certification.tpp](https://drive.google.com/file/d/1vuCC6YxdqM2Xf4uNsNMauQiZGkdlGRSX/view?usp=sharing) |[NIGERIA-Firmware](https://drive.google.com/drive/folders/157xxR8Xhr__IS6JM-pUGUCZXQR5ZBwC7?usp=sharing)|
|   USA    | [USA-QPOS mini.xml](https://drive.google.com/file/d/1J_aEnQIDyaeGGv7Ql3jCVxv811p_9ID2/view?usp=sharing) | [USA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/16sKNysCJEuhP7tstGKK48mmVZ-1XSJFT/view?usp=sharing) | [USA-Certification.tpp](https://drive.google.com/file/d/1LwN3uAK8Tp67qBApLNgZRqg50-lzhdJO/view?usp=sharing) |[USA-Firmware](https://drive.google.com/drive/folders/19c-7yxkBWSNLZBfnkIDrqaJkiVsDp64f?usp=sharing)|
|  RUSSIA  | [RUSSIA-QPOS mini.xml](https://drive.google.com/file/d/1BO4GJin5FbRmAeP1gXQYwKLjmetNxZVm/view?usp=sharing) | [RUSSIA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1DnqLptWGwl7MZwQd-ha8po-7zjNuOMoX/view?usp=sharing) | [RUSSIA-Certification.tpp](https://drive.google.com/file/d/1NxL2CkdQxlV2SSj9CjdhkgwaO6MsKVA0/view?usp=sharing) |[RUSSIA-Firmware](https://drive.google.com/drive/folders/15vodLXwsEYPpyuW7VpGdNmn9wQYWPsxz?usp=sharing)|
|  JAPAN   | [JAPAN-QPOS mini.xml](https://drive.google.com/file/d/1yqH8Yw1IewfuzoV3B_tjc7OqCLW_di7y/view?usp=sharing) | [JAPAN-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1ue9RNMKHhOgYMbUeiPrkNgQ1VGINMV8e/view?usp=sharing) | [JAPAN-Certification.tpp](https://drive.google.com/file/d/1ZW_6LqFkFkX4XDjSwavGrJTEHFKfwJir/view?usp=sharing) |[JAPAN-Firmware](https://drive.google.com/drive/folders/1qPLobdOOjJ-FcgT3SUiVs7lq86VKZxxI?usp=sharing)|
| COLUMBIA | [COLUMBIA-QPOS mini.xml](https://drive.google.com/file/d/10BE7KojYN8xr1mpENrCY4QSKHFE3BHbN/view?usp=sharing) | [COLUMBIA-QPOS cute,CR100,D20,D30,D60.xml](https://drive.google.com/file/d/1jTnsSF-6bDEa4DaQUGfFDFIk81RoLj96/view?usp=sharing) | [COLUMBIA-Certification.tpp](https://drive.google.com/file/d/1hckep5SLOcBM2y3Gr0xG74wDv3uBIqgz/view?usp=sharing) |[COLUMBIA-Firmware](https://drive.google.com/drive/folders/1NG9WfmWptle3CsaEIvVOa_OVwvdZmBDO?usp=sharing)|

