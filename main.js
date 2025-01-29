function onSignIn(googleUser) {
  // User is signed in.
  var profile = googleUser.getBasicProfile();
  // Access user information (e.g., ID, name, email)
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  // Send user data to your server for further processing (e.g., account creation)
  // ...
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function init() {
  gapi.load('auth2', function() {
    // Retrieve the deferred authorization object.
    gapi.auth2.init({
      client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual Client ID
      scope: 'profile email' // Request necessary user information
    }).then(function() {
      // Listen for sign-in events.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      auth2 = gapi.auth2.getAuthInstance();
    });
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    // User is already signed in, display an appropriate UI element
  } else {
    // User is signed out, display a "Sign In" button
    var button = document.createElement('div');
    button.id = 'my-signin2';

    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
  }
}

init();
