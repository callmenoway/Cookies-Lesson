"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ConfettiExplosion from "@/components/ConfettiExplosion";

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    className="inline-block mr-2"
  >
    <radialGradient
      id="grad1"
      cx="0.5"
      cy="0.5"
      r="0.8"
      fx="0.3"
      fy="0.3"
      spreadMethod="pad"
    >
      <stop offset="0%" stopColor="#feda75" />
      <stop offset="50%" stopColor="#fa7e1e" />
      <stop offset="100%" stopColor="#d62976" />
    </radialGradient>
    <circle cx="12" cy="12" r="10" fill="url(#grad1)" />
    <circle cx="12" cy="12" r="7" fill="#fff" />
    <circle cx="12" cy="12" r="5" fill="url(#grad1)" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" />
  </svg>
);


export default function FinalePage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const cp = localStorage.getItem("checkpoint");
    if (!cp || atob(cp) !== "finale") {
      router.replace("/login");
    }
  }, [router]);

  const handleBadge = () => {
    toast("🎉 Badge assegnato: 🛡️ Operatore Cyber Sicuro");
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-white text-center overflow-hidden">
      {!showContent && <ConfettiExplosion onComplete={() => setShowContent(true)} />}

      {showContent && (
        <>
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            ✅ Missione Completata
          </h1>
          <p className="text-gray-700 mb-6 max-w-xs">
            Ce l’hai fatta! Hai superato firewall, analizzato cookie, trovato vulnerabilità. Benvenuto nella zona sicura.
          </p>

          <Button
            variant="outline"
            onClick={() => window.open("https://instagram.com/davide.cose", "_blank")}
            className="mt-4 flex items-center justify-center gap-2"
          >
            <Image src="/ig.png" alt="Instagram Logo" width={20} height={20} />
            Instagram Davide
          </Button>

          <Button
            variant="outline"
            onClick={() => window.open("https://instagram.com/ettore.it", "_blank")}
            className="mt-4 flex items-center justify-center gap-2"
          >
            <Image src="/ig.png" alt="Instagram Logo" width={20} height={20} />
            Instagram Ettore
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/start")}
            className="mt-4"
          >
            🔁 Torna all’inizio
          </Button>
        </>
      )}
    </main>
  );
}
