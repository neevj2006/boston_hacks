export {};

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

declare var SpeechRecognition: {
  new (): SpeechRecognition;
};
declare var webkitSpeechRecognition: {
  new (): SpeechRecognition;
};
