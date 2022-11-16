img1 = "";
objects = [];
status = "";

function preload(){
img1 = loadImage('dog_cat.jpg');
}

function setup(){
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380, 380);
video.hide();
}

function start()
{
    objectDetection = ml5.objectDetector('cocossd', ModelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Object. Please Stand By.";
}

function ModelLoaded(){
    console.log("Model is loaded. Copy.");
    status = true;
    objectDetection.detect(video, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
    console.log(results);
objects = results;
}
    }

function draw(){
image(video, 0, 0, 380, 380);
if(status!=""){
    r = random(255);
    g = random(255);
    b = random(255);
objectDetection.detect(video, gotResults);

for(i = 0; i<objects.length; i++){
document.getElementById("status").innerHTML = "Status: Object Detected. Don't close the tab, or the device.";
document.getElementById("nobjects").innerHTML = "No of objects detected: " +objects.length;

fill(r, g, b);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " +percent +"%", objects[i].x, objects[i].y);
noFill();
stroke(r, g, b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}

}
}

