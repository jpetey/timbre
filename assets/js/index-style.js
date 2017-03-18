// Initialize Firebase
var config = {
   apiKey: "AIzaSyCWd9bfk2Z2wvy4nU3o3ahdJpO9KLTvayo",
   authDomain: "timbre-ee3e8.firebaseapp.com",
   databaseURL: "https://timbre-ee3e8.firebaseio.com",
    storageBucket: "timbre-ee3e8.appspot.com",
   messagingSenderId: "457573350640"
 };

firebase.initializeApp(config);


// Create a variable to reference the database
var database = firebase.database();

// Create variable for current user data
var currentUser = {};

// Created variable to store current user's unique ID#
var userId = currentUser.uid;

console.log(currentUser.uid);
console.log(firebase.auth().currentUser);

firebase.auth().signOut().then(function() {

// Sign-out successful.
        }).catch(function(error) {
    // An error happened.
    });

//-----------DISABLED FX-----------------
//function checkEmail() {

  // var email = $("#Email").val();
  // var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  // if (!filter.test(email.value)) {
  // $("#errorMsg").show().text('Please provide a valid email address');
 
  // return false;
  // }
//} ------- END DISABLED FX ------------


// A function for logging out the user
function logOutUser() {

  event.preventDefault();
    
  firebase.auth().signOut().then(function() {
    
    // Sign-out successful.

    $("#user-options").hide();
    $("#pageload-buttons").show()
    $("#errorMsg").show().text('You Have Logged Out! Sign in Again above.');
    $("#regional-dropdown").hide();

    });
  }

//moving this to the firebase storage
$(document).ready(function() {
  
  $("#area-of-interest").on("click", function () {
   
    var userRegion = $('#area-of-interest option:selected').attr("value");
    console.log(userRegion);

    var currentUser = firebase.auth().currentUser.uid;

    if (userRegion !== "") {

      window.location.href = 'results.html' + '#' + userRegion + '#' + currentUser;

    }

  });

  //login information
  $("#validate-user-btn").on("click", function (event) {
       
    //var userName= $("#name").val();
      
    event.preventDefault();

    var email = $("#email-login").val();

    var password = $("#password-login").val();


      
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

      // Handle Errors here.  

      if (error) {

        var errorCode = error.code;
        console.log(errorCode);

        var errorMessage = error.message;
        console.log(errorMessage);
      
        $("#errorMsg").show().text('User Not Found! Please Sign Up or Try Again');
      }

    }).then(function(user) {
  
      if (user) {
        // user authenticated with Firebase
        currentUser = user;
        console.log(currentUser);

        $("#user-options").show();
        $("#login-form").hide();
        $("#random-lyric").hide();
        $("#regional-dropdown").show();
        $('#area-of-interest').html(
            '<option value="" disabled selected>Select Region<option>' +
            '<option value="92101">San Diego Metro</option>' +                
            '<option value="92011">North Coastal</option>' +
            '<option value="92070">North Inland</option>' +
            '<option value="91901">East County</option>' +
            '<option value="92154">South Bay</option>)')

      } else {
        // user is logged out
      }

    });

  });

  $("#log-out").on("click", logOutUser);

  //Create User

  $("#create-user").on("click", function (event) {
    
    event.preventDefault();

    userData = {};
    
    var email = $("#email-new").val();
    var password = $("#password-new").val();
       
    var areaInt = $("#area-of-interest").val();
    var name =  $("#name").val();

    //userData.interest = $("#area-of-interest").val();
    userData.name = $("#name").val();
    userData.list = "";
    userData.password = password;

    setData = {};

    var userId =  currentUser.uid;

    console.log(userId);
    console.log(userData);
    
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  
      // Handle Errors here.
  
      if (error) {

        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        if (errorMessage === "The email address is badly formatted.") {
          
          $("#email-validate").text("Please provide a valid e-mail address.");

        } else if (errorMessage === "The email address is already in use by another account.") {

          $("#email-validate").text("The email address is already in use.");
          
        } else if (errorMessage === "Password should be at least 6 characters") {
          
          $("#password-validate").text('Try again. Password must be at least 6 characters long.').css("color","#ff0000");
        }
      }

  }).then(function(user) {

    if (user) {
      // user authenticated with Firebase
      currentUser = user;
      console.log(currentUser);
      var currentKey = currentUser.uid;

      var fbPath = "users/" + currentKey + "/";

      $("#user-options").show();
      $("#pageload-buttons").hide();
      
      $("#regional-dropdown").show();

      // $('#create-user').submit(function(e) {
      //   e.preventDefault();

      //   // Hide Modal after signup (@TODO: Prevent for hiding if fields generate errors)
      //   // $('#myModal').modal('toggle'); //or  $('#IDModal').modal('hide');
      //   // return false;
      // });

      $('#myModal').modal('hide');

      database.ref(fbPath).update(userData);
      
    } else {

    // user is logged out
    }


  });


});


});
