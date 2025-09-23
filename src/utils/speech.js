export class SpeechSynthesis {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    
    this.loadVoices();
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
    this.selectedVoice = this.voices.find(voice => 
      voice.lang.includes('en') && voice.localService
    ) || this.voices[0];
  }

  speak(text, rate = 0.8, pitch = 1.2) {
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.selectedVoice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      
      this.synth.speak(utterance);
    });
  }
}

export class SpeechRecognition {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  start() {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript.toLowerCase());
      };

      this.recognition.onerror = (event) => {
        reject(new Error('Speech recognition error'));
      };

      this.recognition.start();
      this.isListening = true;
    });
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechSynthesis = new SpeechSynthesis();
export const speechRecognition = new SpeechRecognition();