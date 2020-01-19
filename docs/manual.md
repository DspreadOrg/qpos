## Introduction

QPOS is a serial of mobile payment devices. It can communicate with the mobile device through audio jack, UART or USB cable. 

QPOS standard, QPOS mini, QPOS Plus, EMV06, EMV08, GEA and GES are all QPOS products, some of them are with PINPAD embedded and some of them are only card readers without PINPAD.

This document aims to help readers for using the Android SDK of QPOS.

## QPOS Programming Guide
You can download to install our [android-demo-app][android-app]
 and [ios-demo-app][ios-app] .
 
    Note: You will need accept "Dsprad Technology Co., Ltd" in "Setting->General->Device Management" 

[logo]: androidDemo.png
[android-app]: https://fir.im/AndroidDemo
[ios-app]: https://fir.im/iOSDemo
 



## Change List

Version | Author        | Date       | Description
--------|---------------|------------|----------------
0.1     | Austin Wang   | 2016-05-01 | Initially Added
1.0     | Austin Wang   | 2016-09-01 | Added EMV related function
1.1     | Ausitn Wang   | 2017-03-01 | Merge QPOS standard and EMV Card reader together
1.2     | Austin Wang   | 2017-10-20 | Added UART interface support for GES device
