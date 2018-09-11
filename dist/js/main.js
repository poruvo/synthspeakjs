// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM ELEMENTS
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
// Init Voices Array
let voices= [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices);

    //Loop through voices and create an option for each.
    voices.forEach(voice => {
        const option = document.createElement('option');
    //Fill option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')';
    // Set need option attr
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option)
    });
};

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak

const speak = () => {

    //Check If Speaking
    if(synth.speaking){
        console.error('Already Speaking.');
        return;
    }
    if(textInput.value !== ''){
        // Get Speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //Speak End
        speakText.onend = e => {
            console.log('Done speaking.')
        }

        // Speak Eror
        speakText.onerror = e => {
            console.error('Something went wrong');
        }

        //Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Loop Through Voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        //Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //Speak
        synth.speak(speakText);
    }
};

//EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value)

// Pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)

// Voice select change
voiceSelect.addEventListener('change', e => speak());