To run application: 
1. Change directory into the pupper/pup folder
2. Run: ionic serve --lab
   2a) This will open a browser window with mutliple instances of the app running on different platforms

To compile for iOS (to run in Xcode): ionic cordova build iOS

To compile for Android (to run in Android Studio): ionic build Android


For cordova camera to work, run the following in terminal: 
ionic cordova plugin add cordova-plugin-camera
ionic cordova plugin add cordova-plugin-ios-camera-permissions