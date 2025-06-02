"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CheckpointPage() {
  const router = useRouter();
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [code, setCode] = useState("");

  // Protezione: blocca accesso diretto
  useEffect(() => {
    const cp = localStorage.getItem("checkpoint");
    if (!cp || atob(cp) !== "task1") {
      router.replace("/login");
    }
  }, []);

  const correctAnswer = "Apriti Sesamo";

  const handleChoice = (choice: string) => {
    if (choice === "C") {
      setChallengeStarted(true);
    } else {
      toast.error("Accesso negato. Questa porta è sorvegliata.");
    }
  };

  const verifyCode = () => {
    if (code.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      toast.success("Codice corretto! Accesso garantito.");

    setTimeout(() => {
      localStorage.setItem("checkpoint", btoa("task2")); // salva nuovo step
      router.push("/task-sniff"); // va alla nuova pagina
    }, 1500);
    } else {
      toast.error("Codice errato, riprova.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-center">
      <h1 className="text-2xl font-bold mb-6">🛑 Checkpoint di Sicurezza</h1>
      <p className="text-gray-600 mb-8 max-w-xs">
        Tre porte si ergono davanti a te. Solo una conduce alla prossima fase della missione. Scegli con attenzione.
      </p>

      {!challengeStarted ? (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button variant="outline" onClick={() => handleChoice("A")}>🚪 Porta A</Button>
          <Button variant="outline" onClick={() => handleChoice("B")}>🚪 Porta B</Button>
          <Button variant="outline" onClick={() => handleChoice("C")}>🚪 Porta C</Button>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg max-w-xs w-full">
          <p className="mb-4 font-mono text-sm text-gray-800">
            Decodifica questo messaggio Base64 e inserisci la risposta esatta:
          </p>
          <pre className="bg-black text-green-400 p-3 rounded mb-4 select-all font-mono text-xs">
            QXByaXRpIFNlc2Ftbw==
          </pre>

          <Input
            placeholder="Scrivi qui la risposta"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mb-4"
          />
          <Button onClick={verifyCode} className="w-full">
            Verifica codice
          </Button>
        </div>
      )}
    </main>
  );
}
