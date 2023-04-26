## emv tag book

Download the below **emv tag book** document, it contain the meaning of each EMV tag in emv config xml file. 
- [EMV TAG BOOK](https://drive.google.com/file/d/1Ui4O2dQFKf_zzxfGzZWxqSmJCJHhSoxC/view?usp=share_link)

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


|     Country     |        QPOS mini         |            QPOS cute,CR100,D20,D30              |       TPP File       |
|      :--:       |          :---:           |               :---:                             |        :---:         |
|     MEXICO      |       [MEXICO-QPOS mini.xml](https://drive.google.com/file/d/1CaksVjo6EfCHO9NGBX2dcC1GIrrG1_Wm/view?usp=sharing)   |            [MEXICO-QPOS cute,CR100,D20,D30.xml](https://drive.google.com/file/d/1C-E0qPG8JrElrAl4yuxn387zmJJTObGI/view?usp=sharing)       |         [MEXICO-Certification.tpp](https://drive.google.com/file/d/14MZeyZb298URLTjtI229hgjps_61iovx/view?usp=sharing)            |
|    NIGERIA      |       [NIGERIA-QPOS mini.xml](https://drive.google.com/file/d/1keRw5dZqOm7qc56K-dIyf1EGqFvF7lqR/view?usp=sharing)  |            [NIGERIA-QPOS cute,CR100,D20,D30.xml](https://drive.google.com/file/d/1LEAOYdOTg6SoVMcxb6vhwjtXrZt0nDT-/view?usp=sharing)      |       [NIGERIA-Certification.tpp](https://drive.google.com/file/d/14MZeyZb298URLTjtI229hgjps_61iovx/view?usp=sharing)          |
|    USA      |       [USA-QPOS mini.xml](https://drive.google.com/file/d/1J_aEnQIDyaeGGv7Ql3jCVxv811p_9ID2/view?usp=sharing)  |            [USA-QPOS cute,CR100,D20,D30.xml](https://drive.google.com/file/d/16sKNysCJEuhP7tstGKK48mmVZ-1XSJFT/view?usp=sharing)      |       [USA-Certification.tpp](https://drive.google.com/file/d/14MZeyZb298URLTjtI229hgjps_61iovx/view?usp=sharing)          |