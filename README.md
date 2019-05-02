# MyWearCalendar

Test in a web browser: (This is not the intended platform but should be used to test some device independent features)

*notice: when viewing on a webpage the calendar will have static data. This is because the calendar usually would read the calendar       info from the mobile device. Also the change location function doesnt work on the browser as this is also a mobile device dependent       feature. To test these please foloow instructions below and build on ios or android.
 
 
      $ git clone <repo name>

      $ cd into new repo
  
      $ npm install
  
      $ ionic serve (assuming you have ionic cli downloaded)
  

Test for IOS device:
  
    $ git clone <repo name>
  
    $ cd into new repo
  
    $ npm install
  
    $ ionic cordova build ios
  
    open project in Xcode (~/<repo>/platforms/ios select MyApp.xcodeproj)
  
    select emulator *some features dont work on emulator* To test all features build on physical device
    
      to build on physical device, plugin Iphone to computer
      
      select iphone in the upper left dropdown (might say Generic iOS Device or some other emulator)
  
    build project (play button)
  
