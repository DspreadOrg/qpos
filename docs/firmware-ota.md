If you want to implement firmware upgrade, please folow below code. 
For more details, please refer to [demo project](https://drive.google.com/file/d/1J96jJSse7pbJN_DRDqxiW62ZBXjesSiA/view?usp=sharing)

``` java
     int a = pos.updatePosFirmware(data, (String) preferencesUtil.get(Constants.BluetoothAddress,""));
     if (a == -1) {
         tv_pos_result.setText(getString(R.string.charging_warning));
     }else {
         updateThread = new UpdateThread();
         updateThread.start();
     }
```

Note: please keep device charging with USB while firmware upgrade

<p align="center">
<iframe width="800" align height="450" src="https://www.youtube.com/embed/TyYApTfQ970?si=qFjip42M9PpSm_Tn" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>
