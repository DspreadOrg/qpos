If you want to implement firmware upgrade, please folow below code. 
For more details, please refer to [demo project](https://github.com/DspreadOrg/android/blob/master/pos_android_studio_demo/pos_android_studio_app/src/main/java/com/dspread/demoui/activity/MainActivity.java)



``` java
data = FileUtils.readAssetsLine("upgrader.asc", MainActivity.this);
int a = pos.updatePosFirmware(data, blueTootchAddress);
if (a == -1) {
    Toast.makeText(MainActivity.this, "please keep the device charging", Toast.LENGTH_LONG).show(); 
    return;
}

updateThread = new UpdateThread();
updateThread.start();
```

Note: please keep device charging with USB while firmware upgrade

<p align="center">
<iframe width="800" align height="450" src="https://www.youtube.com/embed/5ZTFwyKwPls" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>
