## Signing your App

1. Add the “app.keystore” file to your app project. ([The link ](https://github.com/DspreadOrg/android/blob/master/pos_android_studio_demo/pos_android_studio_app/app.keystore))

   ![](./_images/sign1.jpg)

2. Add the debug sign code in your app “build.gradle” file

   ![](./_images/sign2.jpg)

3. Open “File->project structure -> Modules”, to check the Signing Config

   ![sign3](./_images/sign3.jpg)

4. Install your app in D20 device.

## Sign the third-party App

1. Open your local Android SDK folder -> bulid-tools, select one version (in my instance, I choose 30.0.2); it has apksigner.bat in there. 

   ![](./_images/signApp1.jpg)

2. Put the app.keystore and the app you want to sign into this folder

![](./_images/signApp2.jpg)

3. Open cmd(windows)/Terminal(mac);  input

   ```
    apksigner sign --ks app.keystore QRscan.apk
   ```

    When you will see a new generated file (.idsig), it shows success. And the signed apk is the original name.

![](./_images/signApp3.jpg)

