// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6p3dOXyEWZDIwMSUOTEej-6cSaPlE8LI",
    authDomain: "awesomeness-a47d9.firebaseapp.com",
    databaseURL: "https://awesomeness-a47d9.firebaseio.com",
    projectId: "awesomeness-a47d9",
    storageBucket: "awesomeness-a47d9.appspot.com",
    messagingSenderId: "154832084236"
  };
  firebase.initializeApp(config);

  //create a local database
  var database = firebase.database();


  console.log("HI");

  var name = "";
  var destination = "";
  var time = "";
  var frequency = "";

  //add click even to submit button in html
  $("#add-user").on("click", function (event){
  		//prevent blank auto form
  		event.preventDefault();

  		//save submitted data to local variables
  		name = $("#name-input").val().trim();
      	destination = $("#destination-input").val().trim();
      	time = parseInt($("#time-input").val().trim());
      	frequency = parseInt($("#frequency-input").val().trim());

        //push data to firebase as a JSON object 
      	database.ref().push({

      		name: name,
      		destination: destination,
      		time: time,
      		frequency: frequency,
      		dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
        
  });

  

