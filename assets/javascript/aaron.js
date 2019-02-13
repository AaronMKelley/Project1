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
  var runningCounter=0;
  $("#runningTotal").text(runningCounter)
    database.ref().on('value',function(dataSnapshot){
      counter=dataSnapshot.val().goal;
        $("#yourGoal").text(dataSnapshot.val().goal)
});
// reset your goal.
$('#reset').on('click', function(){
    // alert('Please choose a new goal');
    database.ref().set({
    counter: 0 
       })
       $('#yourGoal').text(0)
    });
// add your goal. 
$("#addGoal").on('click',function(){
    event.preventDefault();
    var goal= $('#statedGoal').val().trim();
    $('#yourGoal').text(goal)
    database.ref().update({
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
var calories=0;
var food;
var foodCals = [];
var foodArry =[];
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
           
            if (response.calories != undefined){
                calories = response.calories
            }
                $("#foodName").text(food)
                $("#calories").text(calories)
            
            if(response.totalNutrients.NA != undefined){
                $("#sodium").text(response.totalNutrients.NA.quantity)
            }
            if (response.totalNutrients.PROCNT!= undefined){
                $('#protein').text(response.totalNutrients.PROCNT.quantity)
            }
            if (response.totalNutrients.CHOCDF != undefined){
                $("#carbs").text(response.totalNutrients.CHOCDF.quantity)
            }
                $('#openSearchContent').removeClass('hide')
            
            
           
  },
            function(x,error){
                console.log(error)
          });
          
        
        });

        database.ref().on('value',function(dataSnapshot){
            calories=dataSnapshot.val().runningCounter;
              $("#runningTotal").text(dataSnapshot.val().runningCounter)
        });
        $("#addItem").on('click',function(){
            event.preventDefault();
            food=$('#randomFood').val().trim();
             runningCounter += calories;
            $('#runningTotal').text(runningCounter);
            var listItem= $('<li><button>'+food +'</button>&nbsp;&nbsp;Click to remove</li>');
            listItem.addClass('remove')
            $('#listDiv').append(listItem);
            foodCals.push(calories);
            foodArry.push(food);
            
           
            if (runningCounter>counter){
                $("#warning").text("WARNING: YOU ARE GOING OVER GOAL")
            }
            $('#openSearchContent').addClass('hide');
            database.ref().update({
                runningCounter:runningCounter
            })
        }) 
  
        $('#resetRunning').on('click', function(){
            // alert('Please choose a new goal');
            database.ref().update({
            runningCounter: 0 
               })
               $('#runningTotal').text(0)
            });

    // on click to remove item from list. 
        $(".remove").on("click",function(){
            alert("working")
        })
  
  
  
  // saving list and displaying them on final list page. 
  database.ref().on('value',function(dataSnapshot){
    counter=dataSnapshot.val().listName;
      $("#lists").text(dataSnapshot.val().listName)
});
  var listName= [];
  $('#save').on('click',function(){
    event.preventDefault();
    var listName= $('#saveList').val();
    var listHeader=('<ul></ul>');
    savedList= $('<li><button>'+listName+'</button>&nbsp;&nbsp;Click to remove</li>')
    // listHeader.append(savedList);
    $('#lists').append(listName);
    database.ref().update({
        listName: listName
  })
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        //Barcode API 
$("#barcodeButton").on("click",function(){
    event.preventDefault();
    var barcode= $("#barcodeSearch").val().trim()
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



