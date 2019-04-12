window.snapKitInit = function () {
 var loginButtonIconId = 'my-login-button-target';
 var endData;
 // Mount Login Button
 snap.loginkit.mountButton(loginButtonIconId, {
   clientId: 'd0106cc3-484e-4634-9e09-491fe6e198c2',
   redirectURI: 'wearcalendar://settings-set/',
   scopeList: [
     'user.display_name',
     'user.bitmoji.avatar',
   ],
   handleResponseCallback: function() {
     snap.loginkit.fetchUserInfo()
       .then(data => {
         console.log('User info:', data)
         endData = data;
         return endData;
       }).catch(err => console.log(err.message));

   },
 });
 return endData;
};

// Load the SDK asynchronously
(function (d, s, id) {
 var js, sjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) return;
 js = d.createElement(s); js.id = id;
 js.src = "https://sdk.snapkit.com/js/v1/login.js";
 sjs.parentNode.insertBefore(js, sjs);
}(document, 'script', 'loginkit-sdk'));
