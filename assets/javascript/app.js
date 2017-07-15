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
  var firstTrainTime = "";
  var frequency = "";
  var current = "";

  //add click even to submit button in html
  $("#add-user").on("click", function (event){
  		//prevent blank auto form
  		event.preventDefault(); 

  		//save submitted data to local variables
  		name = $("#name-input").val().trim();
      	destination = $("#destination-input").val().trim();
      	firstTrainTime = $("#time-input").val().trim();
      	frequency = parseInt($("#frequency-input").val().trim());

        //create local object to hold train data
        var train = {
          name: name,
          destination: destination,
          time: firstTrainTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        }
        //push data to firebase as a JSON object 
      	database.ref().push(train);

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");        
  });

//firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

   // Store everything into a variable.
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;
  var current = childSnapshot.val().dateAdded;

  current = moment().format('LT');

  console.log (firstTrainTime);
  console.log(frequency);
  console.log(current);

  //push back time 1 yr to come before current time
  var firstTime = moment(firstTrainTime, "hh:mm").subtract(1,"years");
  console.log(firstTime);

  //current time
  var currentTime = moment();
  console.log(currentTime);

  //difference between times
  var diffTime = moment().diff(moment(firstTime), "minutes");
  console.log("difference in time " + diffTime);

  //Time apart
  var tRemain = diffTime % frequency;

  console.log(tRemain);

  //minutes until train
  var untilTrain  = frequency - tRemain;

  console.log("Minutes until train: " + untilTrain);

      // Next Train
    var nextTrain = moment().add(untilTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +  frequency + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + untilTrain + "</td></tr>");

});



  

