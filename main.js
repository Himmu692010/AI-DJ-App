var song="";
var X=0;
var Y=0;
var ScoreLeftWrist=0;
var LeftWX=0;
var RightWX=0; 
var LeftWY=0;
var RightWY=0;
function setup(){
     canvas=createCanvas(500,400);
    // canvas.position(500,300);\
    canvas.center();

     video=createCapture(VIDEO);
     video.hide();
     poseNet=ml5.poseNet(video,modelloaded);
     poseNet.on('pose',gotPoses);
}

function draw(){
     image(video,0,0,500,400);
     fill("black");
     stroke("blue");
     circle(RightWX,RightWY,25);
     if (RightWY>0 && RightWY<=100){
          document.getElementById("speed").innerHTML="speed=0.5x";
          song.rate(0.5);
     }

     else if (RightWY>100 && RightWY<=200){
          document.getElementById("speed").innerHTML="speed=1x";
          song.rate(1);
     }

     else if (RightWY>200 && RightWY<=300){
          document.getElementById("speed").innerHTML="speed=1.5x";
          song.rate(1.5);
     }

     else if (RightWY>300 && RightWY<=400){
          document.getElementById("speed").innerHTML="speed=2x";
          song.rate(2);
     }

     else if (RightWY>400 && RightWY<=500){
          document.getElementById("speed").innerHTML="speed=2.5x";
          song.rate(2.5);
     }

     if (ScoreLeftWrist > 0.2){
          circle(LeftWX,LeftWY,25);
     YinNumber=Number(LeftWY);
     YremoveDecimal=floor(YinNumber);
     volume=YremoveDecimals/500;
     document.getElementById("volume").innerHTML="volume = "+volume;
     song.setVolume(volume);
}
     
}

function preload(){
 song=loadSound("music.mp3");
}

function play(){
     song.play();
     song.setVolume(1);
     song.rate(1);
}
function modelloaded(){
     console.log("model is loaded!!!");
}
function gotPoses(results){
if (results.length>0){
     console.log(results);
     LeftWX=results[0].pose.leftWrist.x;
     LeftWY=results[0].pose.leftWrist.y;

     RightWX=results[0].pose.rightWrist.x;
     RightWY=results[0].pose.rightWrist.y;

     console.log("X location of Left wrist is - "+LeftWX+" Y location of left wrist is - "+LeftWY);
     console.log("X location of Right wrist is - "+RightWX+" Y location of Right wrist is - "+RightWY);
     ScoreLeftWrist=results[0].pose.keypoints[9].score;
     console.log(ScoreLeftWrist);

   
}
}

