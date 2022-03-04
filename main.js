prediction_1 = "";

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90 
});

Webcam.attach(document.getElementById("camera"));

function take_snap(){
    Webcam.snap(
        function(data_uri){
            document.getElementById("result").innerHTML = "<img id='cap_img' src = '"+data_uri+"'>";
        }
    );
}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/chG7ahMb-/model.json",modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
};

function speak_1(){
    image_result = document.getElementById("cap_img");
    classifier.classify(image_result, gotResult);

    var synth = window.speechSynthesis;
    prediction_1 = "The first prediction is" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(prediction_1);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

function check(){
    image_result = document.getElementById("cap_img");
    classifier.classify(image_result, gotResult);

}


function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak_1();

        if(results[0].label == "happy"){
            document.getElementById("updated_emoji").innerHTML = "&#128522";
        }
        if(results[0].label == "sad"){
            document.getElementById("updated_emoji").innerHTML = "&#128532";
        }
    }
}