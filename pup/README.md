# Pupper Mobile App

#### Running The Application From the Command Line

1. Navigate to the ```pup/``` directory

2. To start the application running locally in a web browser with multiple mobile platforms:

 ```ionic serve --lab```
3. To build for iOS platform (running in Xcode):

 ```ionic cordova build iOS```
4. To build for Android platform (running in Android Studio):

 ```ionic build Android```

#### Build Prerequisites

For cordova camera to work, run the following commands prior to running the application:

- ```ionic cordova plugin add cordova-plugin-camera```

- ```ionic cordova plugin add cordova-plugin-ios-camera-permissions```
