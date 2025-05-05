const textarea = document.getElementById('textarea'); // fixed ID
const voicesSelect = document.getElementById('voices');
const speakButton = document.getElementById('speak');

function loadVoices() {
    const voices = speechSynthesis.getVoices();
    voicesSelect.innerHTML = '';
    voices.forEach(voice => { // correct: voice (not voices)
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voicesSelect.appendChild(option);
    });
}

// Load voices when available
speechSynthesis.onvoiceschanged = loadVoices;

// Speak when button is clicked
speakButton.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(textarea.value);
    const selectedVoiceName = voicesSelect.value;
    const selectedVoice = speechSynthesis.getVoices().find(voice => voice.name === selectedVoiceName);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
    speechSynthesis.speak(utterance);
});
