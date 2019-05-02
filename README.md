# MyWearCalendar

### Requirements

We assume you have [ionic cli](https://ionicframework.com/docs/installation/cli) and [npm](https://www.npmjs.com/get-npm) downloaded and installed on your computer. If you don't have these things, click on the links to install them. 

### Test in Web Browser

How to test in a web browser: (This is not the intended platform but could be used to test some device independent features)

**Note**: when viewing on a webpage the calendar will have static data. This is because the calendar usually would read the calendar info from the mobile device. Also the change location function doesnt work on the browser as this is also a mobile device dependent feature. To test these please follow instructions below and build on ios or android.
 
 
      $ git clone <repo name>

      $ cd into new repo
  
      $ npm install
  
      $ ionic serve
  

### Run on iOS Devices:
  
    $ git clone <repo name>
  
    $ cd into new repo
  
    $ npm install
  
    $ ionic cordova build ios
  
- Open project in Xcode (~/<repo>/platforms/ios select MyApp.xcodeproj)
  
- Plug iPhone into computer
      
- Select iPhone in the upper left dropdown (might say Generic iOS Device or some other emulator)
  
- Build project (play button)

    
### Run on Android Devices:
  
    $ git clone <repo name>
  
    $ cd into new repo
  
    $ npm install
    
**\*Make sure you have your android device plugged in before running the next command**

    $ ionic cordova run android
    
If you have your computer set up correctly, the app will be automatically installed on your android device. 

Make sure [Java](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Gradle](https://gradle.org/install/) are installed and added to your PATH for this command to work.
You’ll also need to install [Android Studio](https://developer.android.com/studio) if you don’t have it already (to download and locate the SDK).
