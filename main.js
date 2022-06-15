video = "";
status = "";
objects = [];


function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
      if(status != "")
     {
         objectDetector.detect(video, gotResult);
         for (i = 0; i < objects.length; i++){
             document.getElementById("status").innerHTML = "Number of Objects detected are: "+ objects.length;

             fill("#FF0000");
             percent = floor(objects[i].confidence * 100);
             text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[i].y + 15);
             noFill();
             stroke("#FF0000");
             rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
             if(objects[i].label == object_name){
             document.getElementById("objects_status").innerHTML = object_name + "Found";
         }
         else {
            document.getElementById("objects_status").innerHTML = object_name + "Not Found";
         }
     }
}
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("text_input").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, resluts){
    if(error)  {
        console.log(error);
    }
    console.log(resluts);
    objects = resluts;
}