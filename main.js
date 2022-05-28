function preload(){
    song=loadSound("music.mp3");
}

song=" ";
leftwristX= 00000;
leftwristY= 00000000;
rightwristX=00000000000;
rightwristY=000000000000000;
scoreleftwrist=00000000000000;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotposes);
}

function modelLoaded(){
    console.log("poseNet is initiallized");
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist= "+scoreleftwrist);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("leftwristX= "+leftwristX+"leftwristY= "+leftwristY);
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("rightwristX= "+rightwristX+"rightwristY= "+rightwristY);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
    if(scoreleftwrist>0.2){
    circle(leftwristX,leftwristY,20);
    in_numberleftwristY=Number(leftwristY);
    remove_decimals=floor(in_numberleftwristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume-"+volume;
    song.setVolume(volume);
}
}

