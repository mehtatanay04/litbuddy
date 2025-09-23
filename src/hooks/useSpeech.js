import { useState, useCallback } from 'react';
import { speechSynthesis, speechRecognition } from '../utils/speech';

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const speak = useCallback(async (text) => {
    setIsSpeaking(true);
    await speechSynthesis.speak(text);
    setIsSpeaking(false);
  }, []);

  const listen = useCallback(async () => {
    try {
      setIsListening(true);
      const result = await speechRecognition.start();
      return result;
    } catch (error) {
      console.error('Speech recognition error:', error);
      return null;
    } finally {
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    speechRecognition.stop();
    setIsListening(false);
  }, []);

  return {
    speak,
    listen,
    stopListening,
    isSpeaking,
    isListening
  };
};