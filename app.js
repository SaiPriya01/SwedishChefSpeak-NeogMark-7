var btnTranslate=document.querySelector('.btn');
var txtInput=document.querySelector('.txt-input');
var output=document.querySelector('.txt-output');
var serverURL='https://api.funtranslations.com/translate/chef.json';
// Speech Recognition
var speechRecognition=speechRecognition|| webkitSpeechRecognition; 
var recognition=new speechRecognition();
// Speech Synthesizer
function textToAudio(message){
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
btnTranslate.addEventListener("click", clickHandler);
function clickHandler() {
    recognition.start();
    console.log('start speech');
    recognition.speechend = () => {
        recognition.stop();
        console.log('speech end')
    }
    recognition.onresult = function (event) {
        var transcriptInput = event.results[0][0].transcript;
        txtInput.innerText = transcriptInput;
        console.log(event.results[0][0]);
        console.log(txtInput.value)
function getTranslation(Txt) {
    return serverURL + "?text=" + Txt;
}
function errorHandler(error){
    alert(`Exceeded limitations!! Try again later`);
}

var translatedText = () => {
    var Input = transcriptInput;
    fetch(getTranslation(Input))
        .then(response => response.json())
        .then(json => {
            let outputText=json.contents.translated;
            outputDiv.innerText = outputText;
            textToAudio(outputText);
        })
        .catch(errorHandler)
}
translatedText();
}
}
