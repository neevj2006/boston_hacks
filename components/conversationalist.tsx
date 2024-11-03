"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Mic, StopCircle, Volume } from "lucide-react";

export default function Conversationalist() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      recognitionRef.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = "vi-VN";
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error processing request:", error);
    }
  };

  const speakResponse = () => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = "vi-VN";
      synthRef.current.speak(utterance);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Lingo Owl</CardTitle>
        <CardDescription>
          Have a chat with our Lingo Owl speacially designed to help correct
          your speaking skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Your Speech</p>
            <p className="mt-1 text-sm text-gray-500">{transcript}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Response</p>
            <p className="mt-1 text-sm text-gray-500">{response}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {!isListening ? (
            <Button onClick={startListening}>
              <Mic className="mr-2 h-4 w-4" /> Start
            </Button>
          ) : (
            <Button onClick={stopListening} variant="destructive">
              <StopCircle className="mr-2 h-4 w-4" /> Stop
            </Button>
          )}
        </div>
        <div>
          <Button onClick={handleSubmit} className="mr-2">
            Process
          </Button>
          <Button onClick={speakResponse} className="-pt-4">
            <Volume className="mr-2 h-4 w-4" /> Listen to Response
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
