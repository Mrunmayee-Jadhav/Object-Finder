objects=[];
set_status='';
objectFound='';

function preload() {
    
}

function setup() {
    canvas= createCanvas(450,350);
    canvas.center();
    video=createCapture(450.350);
    video.hide();
}

function draw() {
    image(video,0,0,450,350);
    input= document.getElementById('input').value.toLowerCase();
    if(set_status == true) {
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++) {
            document.getElementById('status').innerHTML='Status: Object Detected';
            document.getElementById('object').innerHTML='Number of objects detected are- '+objects.length;

            fill('red');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15, objects[i].y+15);
            noFill();
            stroke('red');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            objectFound= objects[i].label;
    }
    }
}

function start() {
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML='Status: Detecting Object';
    
        if(objectFound==input) {
            video.stop();
            objectDetector.detect(gotResult);
            console.log(objectFound);
            document.getElementById('found').innerHTML='Object Found';

            var synth =  window.speechSynthesis;
            speak_data= ' object mentioned found';
            var utterThis= new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
        }
        else{
            document.getElementById('found').innerHTML='Object Not Found';
            video=createCapture(450.350);
            video.hide();
        }

    }



function modelLoaded() {
    console.log('Model Loaded');
    set_status=true;
}

function gotResult(error,results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}