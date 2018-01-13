// database.ref("players").on("value",function(snapshot){
//   key1=snapshot.child("1").exists();
//   key2=snapshot.child("2").exists();
//   console.log("key1 :"+key1+" key2 : "+key2);
// })


// function createTurns(){
//   if(key1&&key2){
//     database.ref().push({
//       turns:1
//     })
//   }
// }
// createTurns();

database.ref("players").orderByKey().on("child_added",function(snapshot, prevChildKey){
   var hasPlayer2=snapshot.key;
  console.log(" hasPlayer2: "+ hasPlayer2)
   if (hasPlayer2===2){
    database.ref().set({
      turns:1
    })
    }
})


database.ref("players").on("value",function(snapshot){
  snapshot.forEach(function(childSnapshot){
  childKey=childSnapshot.key;
  var childData=childSnapshot.val();
  console.log("childkey : "+childKey+ " childData : "+childData)

  })

})