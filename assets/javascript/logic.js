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

  var name1;
  var name2;
  var choices =["rock","paper","scissors"]
  var hasPlayer1;
  var hasPlayer2;
  var childKey;
  var turns;

//function to render names based on db values
database.ref("players").on("value",function(snapshot){
  turns=snapshot.child("turns/turns").val();
  hasPlayer1=snapshot.child("1").val();
  hasPlayer2=snapshot.child("2").val();
  name1=snapshot.child("1/name").val();
  name2=snapshot.child("2/name").val();
  console.log("name1: "+name1 +" name2 :"+name2);
  console.log("hasPlayer1: "+hasPlayer1)
  $("#name1-display").text(name1);
  $("#name2-display").text(name2);
  if(name1===null){
    $("#name1-display").empty();
  }
  if(name2===null){
    $("#name2-display").empty();
  }
});


//function to add player names to db
 $("#add-player").on("click",function(){
    name=$("#name-input").val().trim();
    if (hasPlayer1){
       database.ref("players").child("2").set({
          name:name,
          wins:0,
          losses:0,
        
    })
     }
  
  if (!hasPlayer1){
    database.ref("players").child("1").set({
            name:name,
            wins:0,
            losses:0
        
      }) 
  }
  if(hasPlayer1&&hasPlayer2){
    database.ref("players").child("turns").set({
      turns:1
    })
    displayChoices1();
}
});

// function to remove player1 name from html and update db
$("#remove-player1").on("click",function(){
 firebase.database().ref("players/1").remove();
 $("#choices1-display").empty();
 $("#name1-display").empty();
});

//function to remove player2 name from html and update db
  $("#remove-player2").on("click",function(){
    firebase.database().ref("players/2").remove();
    $("#choices2-display").empty();
    $("#name2-display").empty();

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
    losses:0,
    wins:1
  })
   $("#choices1-display").empty();
   $("choices1-display").text(choiceSelect);
  database.ref("players/turns").set({
    turns:2,
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

