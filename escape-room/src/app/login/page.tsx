"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showInspect, setShowInspect] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (password.trim().toLowerCase() === "cyber42") {
      toast.success("Accesso riuscito! Benvenuto agente.");

      // ✅ Salva checkpoint
      localStorage.setItem("checkpoint", btoa("task1"));

      setTimeout(() => {
        router.push("/checkpoint");
      }, 1500); // piccola attesa per mostrare il toast
    } else {
      toast.error("Password errata. Riprova.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black">
      <h2 className="text-2xl font-semibold mb-4">🔑 Accesso richiesto</h2>
      <p className="text-sm text-gray-600 mb-6">Inserisci la password per accedere.</p>

      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 max-w-xs"
      />
      <Button onClick={handleSubmit} className="text-lg px-6 py-3 mb-4">
        Accedi
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowInspect(!showInspect)}
      >
        🔍 Ispeziona
      </Button>

      {showInspect && (
        <div className="mt-6 w-full max-w-xs bg-[#282a36] text-white p-4 rounded overflow-auto max-h-64 shadow-lg">
          <pre className="whitespace-pre-wrap font-mono text-xs">
            <code>
              <span className="text-[#6272a4]">&lt;!-- Simulated HTML Dump --&gt;</span>
              {"\n"}
              <span className="text-[#8be9fd]">&lt;html&gt;</span>
              {"\n  "}
              <span className="text-[#8be9fd]">&lt;head&gt;</span>
              {"\n    "}
              <span className="text-[#8be9fd]">&lt;meta</span> <span className="text-[#50fa7b]">charset</span>=<span className="text-[#f1fa8c]">"UTF-8"</span> <span className="text-[#8be9fd]">/&gt;</span>
              {"\n    "}
              <span className="text-[#8be9fd]">&lt;title&gt;</span><span className="text-[#f1fa8c]">Cyber Trap</span><span className="text-[#8be9fd]">&lt;/title&gt;</span>
              {"\n  "}
              <span className="text-[#8be9fd]">&lt;/head&gt;</span>
              {"\n  "}
              <span className="text-[#8be9fd]">&lt;body&gt;</span>
              {"\n    "}
              <span className="text-[#6272a4]">&lt;!-- debug: password = cyber42 --&gt;</span>
              {"\n  "}
              <span className="text-[#8be9fd]">&lt;/body&gt;</span>
              {"\n"}
              <span className="text-[#8be9fd]">&lt;/html&gt;</span>
            </code>
          </pre>
        </div>
      )}
    </main>
  );
}
