## Login TMS SE

URL: https://www.dspreadser.net/#/login

*If you want to test the functionality of TMS, please contact us. We will provide you with a TMS account and password.*

![1-1](./_images/1-1.png)

## Add Devices
If you want to push files to a device, you first need to register the device on TMS.  

#### Set Devices Model
Configure the model of the device you purchased.
![2-0](./_images/2-0.png)

#### Add Devices
There are two ways: 
1. Add a single device;
2. Import a batch of devices. download the import template and fill in the information according to the template format;

Fir**1. Add a single device**  
Please fill in the blanks as below(DSN, Model and System Version are mandatory), then click the button “OK”.  
> Note:   
> After adding the device, turn on the power to start TMS normally. If the device is already turned on, a reboot is required.  

![2-1](./_images/2-1.png)

**2. Import a batch of devices**  
Firstly, you need to download the "[Import Template](https://docs.google.com/spreadsheets/d/1qqHzk0OK0GWtzOoSS5DS2NAH0pKn2rhh/edit?usp=sharing&ouid=113176383357556413114&rtpof=true&sd=true)" and fill in the information according to the template format.  
Secondly, click the button and select the file of Import Templete.
![2-2](./_images/2-2.png)

## Upload ROM/Firmware Files

As the first step to start pushing, you need to upload the file you want to push to the device to TMS. This part is about how to upload the files of firmware and ROM.

#### Add File
Click the OTA Upgrade Management menu on the left and click the Add button.  
Fill in the information as below(File, Type, Visual Range and Visual Object are mandatory).  
> Note: About the “Type” option.  
If the file is firmware(.asc file), select “Firmware”;  
If the file is ROM(.zip file), select “System”. 

![3-1](./_images/3-1.png)

#### Hit the shelves
After all of the file information has been confirmed, click the button “Publish” to put the file on the app store.  
![3-2-1](./_images/3-2-1.png)  

You can see the status change from “Unpublished” to “Published”.  
![3-2-2](./_images/3-2-2.png)

## Upload APP Files
Similar as the previous part, this part is about how to upload files of APP.

#### Upload APP
Click the Application menu on the left and click the Add button.
Fill in the information as below(APK, Icon, App Name, App Category are mandatory).  

![4-1-1](./_images/4-1-1.png)  
![4-1-2](./_images/4-1-2.png)

#### Hit the shelves
After all of the file information has been confirmed, click the button “Publish” to put the app on the app store.  
![4-2-1](./_images/4-2-1.png)  
You can see the status change from “Unpublished” to “Published”.  
![4-2-2](./_images/4-2-2.png)
#### App version upgrade
If your app have new version,please click this button for "Upgrade" as below.It is worth noting that you must change the version then can finish it or you will have to delete this and upload again.
![4-3](./_images/4-3.png)

## File Push

This part is about how to push the files that already uploaded on TMS to the devices.

#### Add file
Click the “Push task” menu on the left and click the Add button.
![5-1](./_images/5-1.png)

#### Select file to push
> Note: “Message Type”  
If the file is firmware(.asc file), select “Firmware Update”;  
If the file is ROM(.zip file), select “Firmware Update”;  
If the file is APP(.apk file), select “App Install”.

![5-2](./_images/5-2.png)

#### Pop up
After clicking confirm button, the device will pop up a prompt about optional downloading the upgrade package.

<img src="./_images/5-3.png" width = "400" />

#### Download
You can see the download progress from the drop-down menu bar, see as below.

<img src="./_images/5-4.png" width = "400" />

#### Sub account correlation

This part mainly for describe how to open sub accounts and add devices.

#### Add sub account
Find Account information > Organization then click add button fill in the blank which marked by asterisk (*).
Pay attention that code can be same with account.
![6.1](./_images/6.1.png)

#### Distribution Devices
Find the corresponding subaccount,click "Devices" as below shown.
![6.2.1](./_images/6.2.1.png)
Click "Distribution Devices" button.
![6.2.2](./_images/6.2.2.png)
Next you can input the POSID then search it and click "add" button as below shown,this device will be added successfully.
![6.2.3](./_images/6.2.3.png)

#### Other supplement
For OTA package and appliction,uploading and pushing are same with primary account.Details can refer to part 4 and 5.

#### Check Device Information
After adding the device successfully, click the DSN to view the device information.  

![6-1](./_images/6-1.png)

#### Off the Shelves
Click the “Unpbulished” button to remove the file from the app store. After being removed from the shelves, the file information can be edited as mentioned above, or the file can be publish again.

![6-2](./_images/6-2.png)

#### Download
Click the button “Version History” and download the file, see as below.

![6-3-1](./_images/6-3-1.png)
![6-3-2](./_images/6-3-2.png)

#### Edit
Click the “Edit” option to change Remark.

![6-4](./_images/6-4.png)

#### Delete
Click the Delete Button to remove file.

![6-5](./_images/6-5.png)

#### Upgrade
If there is an update to the APP version, you can update the original version to the new version without adding the file on the main menu again. Click the button “Upgrade” and upload the new version of APP.  
![4-3](./_images/4-3.png)

The same situation can also be applied to firmware upgrades.
![3-3](./_images/3-3.png)

**We have provided you with a push operation video for your reference.**
#### Register Devices
<iframe width="800" height="450" src="./_video/registerDeviceVideo.html" frameborder="0"  scrolling="no" allowfullscreen></iframe>

#### APP Upgrade
<iframe width="800" height="450" src="./_video/appUpdateVideo.html" frameborder="0"  scrolling="no" allowfullscreen></iframe>

#### Firmware Upgrade
<iframe width="800" height="450" src="./_video/firmwareUpdateVideo.html" frameborder="0"  scrolling="no" allowfullscreen></iframe>

#### ROM Upgrade
<iframe width="800" height="450" src="./_video/romUpdateVideo.html" frameborder="0"  scrolling="no" allowfullscreen></iframe>

