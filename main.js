x = 0;
y = 0;

screenwidth = window.innerWidth;
screenheight = window.innerHeight;

apple = "";

speak_data = "";
to_number = "";

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();


function preload() {
  apple.loadImage(apple.png);
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
  console.log(event); 
  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
  to_number = Number(content);

  if(Number.isInteger(to_number)) {
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML = "There are no recognised numbers withen speech";
  }
}

function setup() {
  createCanvas(screenwidth, screenheight - 150);
  background("#B8DEEC");
}

function draw() {
  if(draw_apple == "set")
  {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";

    for (let index = 0; index <= to_number; index++) {
      x = Math.floor(Math.random() * screenwidth - 30);
      y = Math.floor(Math.random() * screenheight - 150);
      image(apple, x, y, 10, 10);
    }
    
    draw_apple = "";
  }
}

function speak(){
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
  speak_data = to_number + "apples drawn";
}
