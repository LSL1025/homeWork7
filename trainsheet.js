console.log("hellooo");

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAQ9BMw-BiGr4OKwNCFh68K4vwsABtRoV0",
    authDomain: "luis-project-ce7e3.firebaseapp.com",
    databaseURL: "https://luis-project-ce7e3.firebaseio.com",
    projectId: "luis-project-ce7e3",
    storageBucket: "luis-project-ce7e3.appspot.com",
    messagingSenderId: "683088600753"
  };

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").click(function(event) {
  console.log("click")
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDesti = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "hh/mm/ss").format("X");
  var trainFrequen = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding trains data
  var newTrain = {
    name: trainName,
    desti: trainDesti,
    time: trainTime,
    frequen: trainFrequen
  };

  // Uploads trains data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.desti);
  console.log(newTrain.time);
  console.log(newTrain.frequen);

  

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDesti = childSnapshot.val().desti;
  var trainTime = childSnapshot.val().time;
  var trainFrequen= childSnapshot.val().frequen;

  // Employee Info
  console.log(trainName);
  console.log(trainDesti);
  console.log(trainTime);
  console.log(trainFrequen);

  // // Prettify the employee start
  // var empStartPretty = moment.unix(trainTime).format("hh/mm/ss");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empHours = moment().diff(moment(trainTime, "X"), "hh");
  // console.log(empHours);

  // // Calculate the total billed rate
  // var empBilled = empHours * trainTime;
  // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDesti),
    $("<td>").text(trainTime),
    $("<td>").text(trainFrequen)
   
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
