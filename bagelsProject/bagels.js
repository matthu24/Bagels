//fill an array from 1-10
for (var i = 0, ar = []; i < 10; i++) {
    ar[i] = i;
}

//shuffle the array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
ar = shuffle(ar);
//Choose only the first three elements of the array to be the correct answer
var array_answer = [ar[1],ar[2],ar[3]];

//create holder function
var holder ='';
function createHolder(guess,hint){
  holder += "<tr>";
  holder += "<td>" + guess + "</td>";
  holder += "<td>" + hint + "</td>";
  holder += "<tr>";
  return holder;
}

var moveCounter = 0;

//reload event listener
var reloadButton = document.getElementById("reloadButton");
reloadButton.addEventListener('click',function(e){
  location.reload();
});

//guess event listener
var guessButton = document.getElementById("guessButton");
guessButton.addEventListener("click",function(e){
  var guess = document.getElementById('guess').value;
  var array_guess = [guess[0],guess[1],guess[2]];
  //boolean variables to prevent guesses with repeating digits or the wrong length
  var boolean_a = array_guess[0] == array_guess[1];
  var boolean_b = array_guess[1] == array_guess[2];
  var boolean_c = array_guess[0] == array_guess[2];
  var boolean_d = guess.length !=3;
  var output = "";

  if ( boolean_a || boolean_b || boolean_c || boolean_d) {
    alert("Must enter three different digits");
    output = "Error";
    document.getElementById("guess").value = "";
  }else {
    //nested loop to loop through guess digits and answer digits
    for (var i = 0; i < array_guess.length; i++) {
      for (var j = 0; j < array_answer.length; j++) {
          if (array_guess[i] == array_answer[j]) {
            if (i == j) {
              output += "fermi ";
            }
            else {
                output += "pico ";
            }
          }
        }
      }
    if (output == "") {
      output = "bagels";
    }
    if(output == "fermi fermi fermi "){
      output = "You win!";
    }
    if(moveCounter==20){
      output = "You lose! Exceeded 20 moves!";
    }
    //clear the input field after the turn
    document.getElementById("guess").value = "";
    }

    //fill table
    //var newMove = {};
    //newMove.guess = guess;
    //newMove.hint = output;
    //make sure move count is less than 20
    function fillTable(){
      var table = document.getElementById('table');
      table.innerHTML = holder;
    }
    if (moveCounter <= 20) {
      createHolder(guess,output)
      //var table = document.getElementById('table');
      //table.innerHTML = holder;
      fillTable()
    }
    //else {
    //  createHolder(guess,"You lose! Exceeded 20 moves!")
    //  fillTable()
    //}

    moveCounter += 1;
});
