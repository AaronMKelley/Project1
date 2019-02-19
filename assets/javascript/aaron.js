// Global Variables 
var counter=0;
var  goal=0;
var runningCounter=0;
var list=[];
var calories=0;
var calories2=0;
var food;
var foodCals = [];
var foodArry=[];

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
    
});
 
// go from homepage to mainpage 
$("#mealPrep").on('click',function(){
    event.preventDefault();
     window.location.href="04-main-page.html"
})
// set intial snapshot of running total. 
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
     // save snapshot of running toal
        database.ref().on('value',function(dataSnapshot){
            calories=dataSnapshot.val().runningCounter;
            $("#runningTotal").text(dataSnapshot.val().runningCounter)
        });

    // save snapshot of the running list 
        database.ref().on('value',function(dataSnapshot){
            (list)=dataSnapshot.val().food;
            $('#yourList').text(dataSnapshot.val().food)
                 })

    // Add item and it's caloric intake to your list 
        $("#addItem").on('click',function(){
            list=[];
            event.preventDefault();
            food=$('#randomFood').val().trim();
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

        // reset the list and running caloric intake. 
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
    
  
  // saving list and displaying them on final list page. 
  database.ref().on('value',function(dataSnapshot){
    title=dataSnapshot.val().listName;
    $('#listName').text(dataSnapshot.val().title)
});

// save list with name. 
var listName= $('#savedList').val()
  $("#create").on("click",function(){
    event.preventDefault();
    var title= $("#savedList").val();
  $('#listName').append(title);
      window.location.href="07-saved-list.html"
    database.ref().on('value',function(dataSnapshot){
        calories=dataSnapshot.val().runningCounter;
    database.ref().on('value',function(childSnapshot){
            counter=childSnapshot.val().goal;  
    var ref = database.ref()
     ref.set({
         title:title,
         runningCounter:calories,
         goal:counter,
         food: list,
     })
  })
})
});



//On click to reset values and allow you to create a new list. 
$("#newList").on("click",function(){
    $("#yourList").empty();
    window.location.href="04-main-page.html"
    database.ref().update({
        goal:0,
        runningCounter:0,
        list:0,
        food:0,
        foodCals:0,
           })
           $('#yourGoal').text(0);
           $("#runningTotal").text(0);
})
  
 // pushing data to pie chart 
 var foodNames=[];
 var label= [];

 database = firebase.database()

 database.ref().on('value',function(dataSnapshot){
   foodNames.push(dataSnapshot.val().foodCals);
   label.push(dataSnapshot.val().food[0]);
  })

 // display pie chart 
var ctx = document.getElementById("myChart");
var myChart =new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["one","two","three"],
        datasets: [{
            label: '# of Votes',
            data: [1,2,3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  
// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }
 
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  






