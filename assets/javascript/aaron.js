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

  var firebaseKeyToFireBaseObject = {};


  database.ref().on("child_added", function(childSnapshot) {
    var cs = childSnapshot.val();

    console.log(cs);
    console.log(childSnapshot.key);
    console.log('----------------------')

    firebaseKeyToFireBaseObject[childSnapshot.key] = cs;
    
  
    //this is where you make an element with a custom attribute of data-fireabsekey=childCsnapshot.key and you put that o the page
  });
 
// Your Goal
// VAriables 
  var counter=0;
  var  goal=0;
  var runningCounter=0;
  var list=[];
  var calories=0;
  var calories2=0;
  var food;
  var foodCals = [];
  var foodArry=[];


$("#mealPrep").on('click',function(){
    event.preventDefault();
     window.location.href="04-main-page.html"
})


  $("#runningTotal").text(runningCounter)
    database.ref().on('value',function(childSnapshot){
      counter=childSnapshot.val().goal;
        $("#yourGoal").text(childSnapshot.val().goal)
});

// add your goal. 
$("#addGoal").on('click',function(){
    event.preventDefault();
    var goalText= $('#statedGoal').val().trim();
    goal =+ goalText;
    $('#yourGoal').text(goalText)
    database.ref().update({
    goal:goal
   })
        
   
   
    database.ref().update({
        goal:goal
});
});
// reset your goal.
$('#reset').on('click', function(){
    database.ref().update({
    goal:0,
       })
       $('#yourGoal').text(0)
    });

// // open Search EDAMAM API 
$("#openSearch").on('click',function(){
   event.preventDefault();
var food= $('#randomFood').val().trim();
   var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=fc3a55ab&app_key=48f6858d58b2229fdcaf0e765ac5b721&ingr=1%20"+food;
   
  console.log(queryURL);
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
                sodium= response.totalNutrients.NA.quantity
                $("#sodium").text(sodium)
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

        database.ref().on('value',function(dataSnapshot){
            (list)=dataSnapshot.val().food;
            $('#yourList').text(dataSnapshot.val().food)
                 })

        
    //    database.ref().on('value',function(dataSnapshot){
    //        foodCals=dataSnapshot.val().calories;
    //    })
    // foodCals=[];
        $("#addItem").on('click',function(){
            list=[];
            // Calfoods=[];
            event.preventDefault();
            food=$('#randomFood').val().trim();
            // Calfoods.push(calories)
            foodCals.push(calories);
            foodArry.push(food);
            list.push(foodArry);
            $('#yourList').append("<li>"+food+"</li>")
            runningCounter += calories
            $('#runningTotal').text(runningCounter);
            $('#openSearchContent').addClass('hide');
           database.ref().update({
           foodCals:foodCals,
           runningCounter:runningCounter,
           food: list,
            })

        })
        $('#resetRunning').on('click', function(){
            alert('Please choose new foods');
            var listItem= $('<li id"foodRemove"><button>'+food +" "+ calories +'</button>');
            $("#yourList").empty();
            foodArry=[]
            database.ref().update({
            runningCounter: 0,
            food: (" "),
               })
               $('#runningTotal').text(0)
            });
            

// // Open Food Search Database
// $("#barcodeButton").on("click",function(){
//     event.preventDefault();
//     var barcode= $("#barcodeSearch").val().trim();
//     var queryURL= "https://world.openfoodfacts.org/api/v0/product/"+ barcode;
// console.log(queryURL);
// $.ajax({
//     url:queryURL,
//     method:"GET",
// }).then(function(response){
   
//  var calories2 = response.product.nutriments.energy_value;
//  var name = response.product.product_name; 
// console.log(response.product.product_name)
//  if (response.product.nutriments.energy_value != undefined){
//   calories2= response.product.nutriments.energy_value;
//  }
//    $("#product").text(name)
//    $("#calories-b").text(calories2);
//    $("#sodium-b").text(response.product.nutriments.sodium)
//    $("#protein-b").text(response.product.nutriments.proteins_value)
//    $("#carbs-b").text(response.product.nutriments.carbohydrates_value)
// })
// $('#barcodeContent').removeClass('hide')
// })

// database.ref().on('value',function(dataSnapshot){
//   calories2 =dataSnapshot.val().runningCounter;
//       $("#runningTotal").text(dataSnapshot.val().runningCounter)
// });

// $("#addItem-b").on('click',function(){
//     event.preventDefault();
//     name= $("#product").val()
//     var listItem= $('<li><button>'+ name +'</button>&nbsp;&nbsp;Click to remove</li>');
//     $('#listDiv').append(listItem);
//     $('#runningTotal').text(runningCounter);
//     runningCounter += calories2
//     foodCals.push(calories2);
// })
  
  // saving list and displaying them on final list page. 
  database.ref().on('value',function(dataSnapshot){
    listName=dataSnapshot.val().listName;
    //   $("#lists").text(dataSnapshot.val().listName)
});
//   var listName= [];
var listName= $('#savedList').val()
  $('#create').on('click',function(){
    event.preventDefault();
    var listName= $('#savedList').val();
    // var listHeader=('<ul></ul>');
    // savedList= $('<li><button>'+listName+'</button>&nbsp;&nbsp;Click to remove</li>')
    // $(listHeader).append(savedList);
    $('#lists').append(list);
      window.location.href="07-saved-list.html"
    database.ref().on('value',function(dataSnapshot){
        calories=dataSnapshot.val().runningCounter;
    database.ref().on('value',function(childSnapshot){
            counter=childSnapshot.val().goal;  
    var ref = database.ref()
     ref.set({
         list:listName,
         runningCounter:calories,
         goal:counter,
         food: list,
     })
  })
})
});

// $("#save").on("click",function(){
//     listName= $('#saveList').val();
//     var ref = database.ref()
//     database.ref().on('value',function(dataSnapshot){
//         calories=dataSnapshot.val().runningCounter;
//     database.ref().on('value',function(childSnapshot){
//             counter=childSnapshot.val().goal; 
//     database.ref().on('value',function(dataSnapshot){
//                 counter=dataSnapshot.val().listName;
//      ref.push({
//          list:listName,
//          runningCounter:calories,
//          goal:counter
// })
// })
// })
// })
// });




$("#newList").on("click",function(){
    $("#yourList").empty();
    window.location.href="04-main-page.html"
    database.ref().update({
        goal:0,
        runningCounter:0,
        list:0,
        food:0
           })
           $('#yourGoal').text(0);
           $("#runningTotal").text(0);
})
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  






