/*
VARIABLES
*/

//Anagramica API
var API_URL = 'http://www.anagramica.com/';
//Resets the randomWord global var
var randomWord = "";
var randomWordDisplay = "";

//var RapidAPI = new require('rapidapi-connect');


$.ajax({
    type: "GET",
    url: "https://danielthepope-countdown-v1.p.mashape.com/solve/pimgatner?variance=1",
    //data: {lookup: 'hello'},
    //jsonp: true,
    //crossDomain: true,
    //dataType: 'json',
    //headers: { 'Access-Control-Allow-Origin': '*' },
    headers: { "X-Mashape-Key": "6h4HSyEW7Pmshj4Lkwi1MNgaJsuep1dmtN4jsnfWWuxhKLwt1e" },
    headers: { "X-Mashape-Host": "https://danielthepope-countdown-v1.p.mashape.com/solve/pimgatner?variance=1"},
    headers: { "Accept": "applciation/json" },
    success: function() { console.log('Success!!!!!'); },
    error: function(sagot) { console.log('Error!!!!!!'); },
    complete: function (results) {console.log('Complete!!!!!!')}
    });

/*
FUNCTIONS
*/

//Add a consonant letter to randomWord var
function addConsonant() {
  if (randomWord.length < 9) {
    var consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
    var randomNumber = Math.floor(Math.random() * consonants.length);
    randomWord = randomWord + consonants[randomNumber];
    randomWordDisplay = randomWordDisplay + consonants[randomNumber] + " ";
    $('#Word').html(randomWordDisplay);
    if (randomWord.length >= 9) {
      showTimerAndSubmission()
    };
  };
}

//Add a vowel to randomWord var
function addVowel() {
  if (randomWord.length < 9) {
    var vowels = ['A', 'E', 'I', 'O', 'U'];
    var randomNumber = Math.floor(Math.random() * vowels.length);
    randomWord = randomWord + vowels[randomNumber];
    randomWordDisplay = randomWordDisplay + vowels[randomNumber] + " ";
    $('#Word').html(randomWordDisplay);
    if (randomWord.length >= 9) {
      showTimerAndSubmission()
    };
  }
}

function resetGame() {
  document.location.reload();
}

function showTimerAndSubmission() {

  $('#Timer').removeClass('hide');
  $('#Submission').removeClass('hide');
  //hide control and submission section
  $('#Letter').addClass('hide');
  startCountdown(1);
}

function checkAnswer() {
  var word = $('#txtAnswer').val();
  word = word.toLowerCase();
  if (word.length != 0) {
    var url = API_URL + 'lookup/' + word;

    $.ajax({
    type: 'GET',
    url: 'https://services.aonaware.com/CountCheatService/CountCheatService.asmx/LetterSolutions?anagram=string',
    //data: {lookup: 'hello'},
    //jsonp: true,
    //crossDomain: true,
    dataType: 'xml',
    //headers: { 'Access-Control-Allow-Origin': '*' },
    success: function() { console.log('Success!'); },
    error: function(sagot) { console.log('Error!'); },
    complete: function (results) {
console.log(results);

      if (results.found == 1) {
        $('#msgResult').html(word + ' is Valid!');
      } else {
        $('#msgResult').html(word + ' is Invalid!');
      };

    }
    });
    

    /*$.get(url, function(results) {
      if (results.found == 1) {
        $('#msgResult').html(word + ' is Valid!');
      } else {
        $('#msgResult').html(word + ' is Invalid!');
      };
    },'jsonp');*/


  } else {
    $('#msgResult').html('Invalid!');
  };
  showAnswerandHistory();
}

function showAnswerandHistory() {
  $('#answerAndHistory').removeClass('hide');
  showTopAnswer();
  $('input').prop( "disabled", true );
}

function showTopAnswer () {
  var url = "https://services.aonaware.com/CountCheatService/CountCheatService.asmx/LetterSolutions?anagram=string";
  //API_URL + 'all/' + randomWord;

    /*$.ajax({
    url: url,
    jsonp: true,
    crossDomain: true,
    dataType: 'jsonp',
    type: 'GET',
    headers: { 'Access-Control-Allow-Origin': '*' },
    success: function() { console.log("Success!"); },
    error: function() { console.log('Failed!'); }
    });

*/

  $.get(url, function(results) {
    if (results.all[0].length<=2) {
      $('#msgTopAnswer').html('No results found');
    } else {
      for (var i = 0; i < results.all.length; i++) {
        if (results.all[i].length == results.all[0].length) {
          $('#topAnswer').append('<p>' + results.all[i] + '</p>');
        };
      };
    };
  },'xml' );
}


function startCountdown(duration) {
    var timer = duration, minutes, seconds;
    myVar = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display = $('#Clock');
        //display MM:SS format
        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
          display.text("Time's up!");
          checkAnswer();
          clearInterval(myVar);
        }
    }, 1000);
}


/*
JQUERIES
*/

//Hides other section when loaded
$(document).ready(function(){
    $('#Timer').addClass('hide');
    $('#Submission').addClass('hide');
    $('#answerAndHistory').addClass('hide');
});

//add consonant when button is clicked
$('#btnConsonant').on('click', function() {
  addConsonant();
});

//add vowel when button is clicked
$('#btnVowel').on('click', function() {
  addVowel();
});

//resets game
$('#btnReset').on('click', function() {
  resetGame();
});

$('#btnSubmit').on('click', function() {
  checkAnswer();
});
