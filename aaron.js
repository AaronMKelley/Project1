//Intialize Firebase
var config = {
    apiKey: "AIzaSyDms4GgyzLLQaCcAzeBixSq_LcmzsUw1E8",
    authDomain: "project-1-assignment.firebaseapp.com",
    databaseURL: "https://project-1-assignment.firebaseio.com",
    projectId: "project-1-assignment",
    storageBucket: "project-1-assignment.appspot.com",
    messagingSenderId: "697790128427"
  };
  firebase.initializeApp(config);

  var database= firebase.database();

  // Variables 
// Your Goal
  var counter=0;
  $("#runningTotal").text(counter);
    database.ref().on('value',function(dataSnapshot){
      counter=dataSnapshot.val().goal;
        $("#yourGoal").text(dataSnapshot.val().goal)
});
// reset your goal.
$('#reset').on('click', function(){
    event.preventDefault();
    database.ref().set({
        counter: 0 // 100 or clickCounter would work here
      })
    });
// add your goal. 
$("#addGoal").on('click',function(){
    event.preventDefault();
    var goal= $('#statedGoal').val().trim();
    $('#yourGoal').text(goal)

    database.ref().set({
        goal: goal
});
});

//-------------------------------------------------------------

// // open Search EDAMAM API 
// // variables 
// var list= [];
// database.ref().on('value',function(dataSnapshot){
//     list=dataSnapshot.val().food;
//     //   $("#yourGoal").text(dataSnapshot.val().goal)
// // var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=fc3a55ab&app_key=48f6858d58b2229fdcaf0e765ac5b721&ingr=1%20" + food;
// var food= $('#randomFood').val().trim();
// // $("#foodList").text(list);
// // database.ref().on('value',function(dataSnapshot){
// // list=dataSnapshot.val().food;
// // $("#yourList").append(list)

// $("#openSearch").on('click',function(){
//    event.preventDefault();
// var food= $('#randomFood').val().trim();
//    var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=fc3a55ab&app_key=48f6858d58b2229fdcaf0e765ac5b721&ingr=1%20"+food;
   
// //   console.log(queryURL);
//             $.ajax({
//             url:queryURL,
//             method:"GET",
//           }).then(function(response) {
//             // window.location.href="05-description-page.html";
//          console.log(response.calories)


        
//         //  console.log(response.totalNutrients.NA.quantity);
//         //  console.log(response.totalNutrients.PROCNT.quantity);
//         //  console.log(response.totalNutrients.CHOCDF.quantity);
//         //  console.log(response.totalNutrients.SUGAR.quantity);
         
//             },
//             function(x,error){
//                 console.log(error)
  
    
//           database.ref().set({
//             goal: food
//           });
        
//         });
//     });
$("#barcode").on("click",function(){
    event.preventDefault();
    var barcode= $("#barcodeSearch").val();
    var queryURL= "https://world.openfoodfacts.org/api/v0/product/016000275287"

console.log(queryURL);

$.ajax({
    url:queryURL,
    method:"GET",
}).then(function(response){
    console.log(response);

})

})
    
//     $("#barcode").on("click",function(){
//         event.preventDefault();
//         var barcode= $("#barcodeSearch").val();
//         var queryURL= "https://world.openfoodfacts.org/api/v0/product/" + barcode 
   
//    console.log(queryURL);
   
//     })