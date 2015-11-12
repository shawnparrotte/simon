var colors = ["green", "blue", "red", "yellow"];
var randomColor;
var selectedColor;
var canPlay = false;
var counter = 0;
var animateCounter = 0;
var randomArray = [];
var hitArray = [];

var red = "#BB3441"
var redLit = "#EB6471"
var blue = "#187186"
var blueLit = "#48A1B6"
var green = "#2C3B3C"
var greenLit = "#5C6B6C"
var yellow = "#CDB71D"
var yellowLit = "#FDE74C"



//displays the colors of randomArray in order
function runTheColors(arrry){

  //this renders the colors brighter
  function renderColor(blink){
    //***3***
    //render the correct color
    if (blink === "red"){
      $("#red").css("background-color", redLit);
    } else if (blink === "yellow"){
      $("#yellow").css("background-color", yellowLit);
    } else if (blink === "green"){
      $("#green").css("background-color", greenLit);
    } else if (blink === "blue"){
      $("#blue").css("background-color", blueLit);
    }

    //wait to perform the clearColors function
    setTimeout(function(){
      clearColors();
    }, 1000);

  }

  //***4***
  function clearColors(){
      //this clears the colors
      $("#red").css("background-color", red);
      $("#blue").css("background-color", blue);
      $("#yellow").css("background-color", yellow);
      $("#green").css("background-color", green);

      setTimeout(function(){
        //after 250 recurively call runTheColors
        runTheColors(arrry);
      }, 250)

  }

  //***2***
  //create a variable for the length of the incoming array
  var length = arrry.length

  //if the global counter variable is less than the length of the randomArray
  if (counter < length){
    //run the render color function
    renderColor(arrry[counter]);
    //add one to the counter
    counter += 1;
  } else {
    //if the global counter variable is equal then
    //reset counter
    counter = 0;
    //let play begin again
    canPlay = true;
    return console.log("go!");
  }
}


function simonRandomColor(){
  // **1**
  //clear hitArray
  hitArray = [];
  //create random selection from colors
  randomColor = Math.floor((Math.random() * 4));
  selectedColor = colors[randomColor];
  //push random color to randomArray
  randomArray.push(selectedColor);
  //animate the colors
  runTheColors(randomArray);
}


//***5*** listeners will fire the hitMe function

$("#red").mousedown(function(){
  if(canPlay === true){
  $("#red").css("background-color", redLit);
}
}).mouseup(function(){
  if(canPlay === true){
  $("#red").css("background-color", red);
  hitMe("red");
}
})

$("#green").mousedown(function(){
  if(canPlay === true){
  $("#green").css("background-color", greenLit);
}
}).mouseup(function(){
  if(canPlay === true){
  $("#green").css("background-color", green);
  hitMe("green");
}
})

$("#yellow").mousedown(function(){
  if(canPlay === true){
  $("#yellow").css("background-color", yellowLit);
}
}).mouseup(function(){
  if(canPlay === true){
  $("#yellow").css("background-color", yellow);
  hitMe("yellow");
}
})

$("#blue").mousedown(function(){
  if(canPlay === true){
  $("#blue").css("background-color", blueLit);
}
}).mouseup(function(){
  if(canPlay === true){
  $("#blue").css("background-color", blue);
  hitMe("blue");
}
})


//***6*** function will have 'this' color in order to register hit

function hitMe(hitColor){
  //push the color to the array that we just selected
  hitArray.push(hitColor)
  //var hal fixes the off by one error when checking the values of the last elements on the array
  var hal = hitArray.length - 1;
  //if the length of the hit array is less than the length of the random array
  if (hitArray.length < randomArray.length){
    //loop through both arrays until the length of the hit array
    //and see if each of them match
    for(var i = 0; i < hitArray.length; i++){
    //if they don't match
    if (hitArray[i] !== randomArray[i]){
      //perform animation
      animateSimon();
      //empty both arrays
      randomArray = [];
      hitArray = [];
      //stop play
      canPlay = false;
      return console.log("boo!")
      }
    } // if the lengths match, meaning we're on the last elelmets of the array
  } else if (hitArray.length === randomArray.length) {
    //if the last elements don't match (using the var hal)
    if (hitArray[hal] === randomArray[hal]){

      console.log("Let's run it again!");
      //after one second start the game again
      setTimeout(function(){
        canPlay = false;
        //empty hit array so it starts from zero
        hitArray = [];
        //call simonRandomColor which adds another color to the randomArray
        simonRandomColor();
      }, 1000)

    } else {

      //perform animation
      animateSimon();
      //empty both arrays
      randomArray = [];
      hitArray = [];
      //stop play
      canPlay = false;
      return console.log("boo!")

    }
  }
}



function animateSimon(){

  var animateArray = ["green", "blue", "yellow", "red", "green", "blue", "yellow", "red",
                      "red", "yellow", "blue", "green", "red", "yellow", "blue", "green",
                      "green", "blue", "yellow", "red", "green", "blue", "yellow", "red",
                      "red", "yellow", "blue", "green", "red", "yellow", "blue", "green"];

  if (animateArray[animateCounter] === "red"){
    $("#red").css("background-color", redLit);
  } else if (animateArray[animateCounter] === "yellow"){
    $("#yellow").css("background-color", yellowLit);
  } else if (animateArray[animateCounter] === "green"){
    $("#green").css("background-color", greenLit);
  } else if (animateArray[animateCounter] === "blue"){
    $("#blue").css("background-color", blueLit);
  }

  function clearAnimateColors(){
      $("#red").css("background-color", red);
      $("#blue").css("background-color", blue);
      $("#yellow").css("background-color", yellow);
      $("#green").css("background-color", green);

      //wait to resolve the deferred
      setTimeout(function(){
        //def.resolve();
        //after resolving recusively call runTheColors();
        animateSimon();
      }, 10)
  }

  setTimeout(function(){
    if(animateCounter < animateArray.length){
      animateCounter += 1;
      clearAnimateColors();
    } else {
      animateCounter = 0;
      return
    }
  }, 50)

}

$("#startButton").mousedown(function(){
  $("#startButton").css("background-color", "green");
}).mouseup(function(){
  $("#startButton").css("background-color", "lightgreen");
    if(randomArray.length === 0){
    simonRandomColor();
  }
});
