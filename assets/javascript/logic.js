// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB9Ndv70uMHS3YcQPqXQgbxesmLZlFWWpo",
    authDomain: "rps-multiplayer-ef743.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-ef743.firebaseio.com",
    projectId: "rps-multiplayer-ef743",
    storageBucket: "rps-multiplayer-ef743.appspot.com",
    messagingSenderId: "779872981194"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name1=1;
  var name2=2;
  var choices =["rock","paper","scissors"]

//function to render names based on db values
database.ref("players").on("value",function(snapshot){
  name1=snapshot.child("1/name").val();
  name2=snapshot.child("2/name").val();
  $("#name1-display").text(name1);
  $("#name2-display").text(name2);
  if(name1===1){
    $("#name1-display").empty();
  }
  if(name2===2){
    $("#name2-display").empty();
  }
});

//function to add player name to db
 $("#add-player").on("click",function(){
  if(name1===1){
    //collect name info in name1 variable
    name1=$("#name-input").val().trim();
    //display choices buttons
    displayChoices1();
    //save name to db
    database.ref("players/1").set({
      name:name1,
      choice:"blank",
    })
  }
else if(name2===2){
    //collect name info in name2 variable
    name2=$("#name-input").val().trim();
    //display choices buttons
    displayChoices2();
    //save name to db
    database.ref("players/2").set({
      name:name2,
      choice:"blank",
    })
  };
 	console.log(name1);
  console.log(name2);
 });

//function to remove player1 name from html and update db
 $("#remove-player1").on("click",function(){
  $("#choices1-display").empty();
  database.ref("players/1").set({
      name:1,
      choice:"blank",
    })
    });

//function to remove player2 name from html and update db
  $("#remove-player2").on("click",function(){
    $("#choices2-display").empty();
  database.ref("players/2").set({
      name:2,
      choice:"blank",
    })
});

//functions to display rps buttons
function displayChoices1(){
  for (var i = 0; i < choices.length; i++) {

          var choiceBtn = $("<button>");
          
          choiceBtn.addClass("choice1 btn btn-primary");
         
          choiceBtn.attr("data-name", choices[i]);
         
          choiceBtn.text(choices[i]);
          
          $("#choices1-display").append(choiceBtn);
        }
      };
function displayChoices2(){
  for (var i = 0; i < choices.length; i++) {

          var choiceBtn = $("<button>");
          
          choiceBtn.addClass("choice2 btn btn-primary");
         
          choiceBtn.attr("data-name", choices[i]);
         
          choiceBtn.text(choices[i]);
          
          $("#choices2-display").append(choiceBtn);
        }
};

//functions to save choice to db
$(document).on("click",".choice1",function(){
  var choiceSelect = $(this).attr("data-name");
  database.ref("players/1").set({
    name:name1,
    choice:choiceSelect,
  })
  console.log(choiceSelect);
})

$(document).on("click",".choice2",function(){
  var choiceSelect = $(this).attr("data-name");
  database.ref("players/2").set({
    name:name2,
    choice:choiceSelect,
  })
  console.log(choiceSelect);
})
