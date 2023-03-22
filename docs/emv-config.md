## emv tag book

Download the below **emv tag book** document, it contain the meaning of each EMV tag in emv config xml file. 
- [EMV TAG BOOK](https://drive.google.com/file/d/181_DZb561_U8Buq8Bn3wiaFzgE3rYgjg/view?usp=sharing)

## update emv config file

Download the below emv config template xml file,then put it into **Assets** folder, call below function to upgrade the config to terminal
- [QPOS mini](https://drive.google.com/file/d/1CaksVjo6EfCHO9NGBX2dcC1GIrrG1_Wm/view?usp=sharing) 
- [CR100, QPOS Cute, D20, D30](https://drive.google.com/file/d/1C-E0qPG8JrElrAl4yuxn387zmJJTObGI/view?usp=sharing)

``` java
Overloaded function
pos.updateEMVConfigByXml(String xmlStr);

//callback
onReturnCustomConfigResult(boolean isSuccess,String result)

```
## L3 certification

The following is the emv configuration we generated based on the test cases of each country, it will help you pass L3 certification successfully, please use it.


|     Country     |        QPOS mini         |            QPOS cute,CR100,D20,D30              |  
|      :--:       |          :---:           |               :---:                             |
|     MEXICO      |       [MEXICO-QPOS mini](https://drive.google.com/file/d/1CaksVjo6EfCHO9NGBX2dcC1GIrrG1_Wm/view?usp=sharing)   |            [MEXICO-QPOS cute,CR100,D20,D30](https://drive.google.com/file/d/1C-E0qPG8JrElrAl4yuxn387zmJJTObGI/view?usp=sharing)       |
|    NIGERIA      |       NIGERIA-QPOS mini  |            NIGERIA-QPOS cute,CR100,D20,D30      |