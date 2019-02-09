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
  var runningCounter=0
  $("#runningTotal").text(runningCounter);
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



// save items added to list to firebase 
var list= [];
// database.ref().on('value',function(dataSnapshot){
//     list=dataSnapshot.val().food;
//       $("#runningTotal").text(dataSnapshot.val().goal)
//  var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=fc3a55ab&app_key=48f6858d58b2229fdcaf0e765ac5b721&ingr=1%20" + food;
// var food= $('#randomFood').val().trim();
// $("#foodList").text(list);

// database.ref().on('value',function(dataSnapshot){
// list=dataSnapshot.val().food;
// $("#yourList").append(list)

// // open Search EDAMAM API 
$("#openSearch").on('click',function(){
   event.preventDefault();
var food= $('#randomFood').val().trim();
   var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=fc3a55ab&app_key=48f6858d58b2229fdcaf0e765ac5b721&ingr=1%20"+food;
   
//   console.log(queryURL);
            $.ajax({
            url:queryURL,
            method:"GET",
          }).then(function(response) {
            // window.location.href="05-description-page.html";
        
            console.log(food)

            var calories=0;
            if (response.calories != undefined){
                calories = response.calories
            }

            console.log(calories)
        //  console.log(response.totalNutrients.NA.quantity);
        //  console.log(response.totalNutrients.PROCNT.quantity);
        //  console.log(response.totalNutrients.CHOCDF.quantity);
        //  console.log(response.totalNutrients.SUGAR.quantity);
         
   
            $("#foodName").text(food)
            $("#calories").text(calories)
            
            if(response.totalNutrients.NA != undefined){
                $("#sodium").text(response.totalNutrients.NA.quantity)
            }
            if (response.totalNutrients.PROCNT!= undefined){
                $('#protein').text(response.totalNutrients.PROCNT.quantity)
            }
            console.log(response.totalNutrients.CHOCDF)
            if (response.totalNutrients.CHOCDF != undefined){
                $("#carbs").text(response.totalNutrients.CHOCDF.quantity)
            }

            $('#openSearchContent').removeClass('hide')
            
            $("#addItem").on('click',function(){
                console.log(food)
                console.log("[addItem_Click]->"+calories)
                
                runningCounter += calories;
                $('#runningTotal').text(runningCounter);

                //$('#openSearchContent').toggleClass('hide');
            })
           
  },
            function(x,error){
                console.log(error)

          });
        
        });

        // $("#addItem").on('click',function(){
        //     // runningCounter + 
        //     $('#openSearchContent').addClass('hide');
        // })
//Add button and cancel button. 
// $("#addItem").on('click',function(){
//       counter + (response.calories)
// })

        //Barcode API 
$("#barcodeButton").on("click",function(){
    event.preventDefault();
    var barcode= $("#barcodeSearch").val()
    // debugger
    console.log(barcode)
    // var queryURL= "https://world.openfoodfacts.org/api/v0/product/044000025298"
    var queryURL= "https://world.openfoodfacts.org/api/v0/product/"+ barcode;

console.log(queryURL);

$.ajax({
    url:queryURL,
    method:"GET",
}).then(function(response){
    console.log(response);

})

})
 




// save items added to list to firebase 
var list= [];
// database.ref().on('value',function(dataSnapshot){
//     list=dataSnapshot.val().food;
//       $("#runningTotal").text(dataSnapshot.val().goal)
//  var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=fc3a55ab&app_key=48f6858d58b2229fdcaf0e765ac5b721&ingr=1%20" + food;
// var food= $('#randomFood').val().trim();
// $("#foodList").text(list);

// database.ref().on('value',function(dataSnapshot){
// list=dataSnapshot.val().food;
// $("#yourList").append(list)
