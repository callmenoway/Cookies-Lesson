"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./ConfettiExplosion.css";

export default function ConfettiExplosion({ onComplete }: { onComplete: () => void }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [numberOfPieces, setNumberOfPieces] = useState(300);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Shake lento iniziale
    const emojiTimer = setTimeout(() => {
      // Shake veloce + esplosione emoji
      setExploding(true);
      setTimeout(() => {
        // Mostra coriandoli
        setShowConfetti(true);
      }, 300); // esplosione dura 300ms
    }, 1000);

    // Dopo 2.5s inizia la dissolvenza dei coriandoli
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setNumberOfPieces(0);
    }, 2500 + 1300); // 1300ms per esplosione + coriandoli più lunghi

    // Dopo 1 secondo di pausa dalla dissolvenza, mostra contenuto
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500 + 1300 + 1000);

    return () => {
      clearTimeout(emojiTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {!showConfetti && (
        <div className={`text-[8rem] ${exploding ? "animate-explode" : "animate-shake-fast"}`}>
          🎉
        </div>
      )}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={numberOfPieces}
          recycle={false}
          gravity={0.3}
          wind={0.01}
          colors={["#FFC700", "#FF0000", "#2E3191", "#41BBC7"]}
        />
      )}
    </div>
  );
}
