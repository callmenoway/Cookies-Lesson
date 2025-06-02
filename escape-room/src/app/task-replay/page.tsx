"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RequestLog {
  id: number;
  method: string;
  url: string;
  cookie: string | null;
  status: number;
}

const requestsData: RequestLog[] = [
  { id: 1, method: "GET", url: "/home", cookie: null, status: 200 },
  { id: 2, method: "POST", url: "/login", cookie: "session=invalid-abc", status: 401 },
  { id: 3, method: "POST", url: "/api/data", cookie: "session=expired-xyz", status: 401 },
  { id: 4, method: "POST", url: "/api/data", cookie: "session=valid-12345", status: 200 }, // CORRETTO
  { id: 5, method: "GET", url: "/dashboard", cookie: "session=old-session", status: 401 },
];

const CORRECT_COOKIE = "session=valid-12345";

export default function TaskReplayPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cp = localStorage.getItem("checkpoint");
    if (!cp || atob(cp) !== "task3") {
      router.replace("/login");
      return;
    }

    // Simula l'arrivo progressivo delle richieste (una ogni 1.2s)
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < requestsData.length) {
        setLogs((old) => [...old, requestsData[idx]]);
        idx++;
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [router]);

  const handleReplay = () => {
    if (input.trim() === CORRECT_COOKIE) {
      toast.success("Replay eseguito correttamente! Accesso garantito.");
      localStorage.setItem("checkpoint", btoa("finale"));
      setTimeout(() => router.push("/finale"), 1500);
    } else {
      toast.error("Cookie errato, riprova.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">♻️ Task: Replay Attack sul Cookie</h1>
      <p className="max-w-md mb-6 text-gray-700 text-center">
        Alcune richieste HTTP sono registrate qui sotto con orario e stato. Trova la richiesta con cookie valido e status 200.
        Copia il cookie e inseriscilo per “replayare” la sessione prima che scada.
      </p>

      <div
        ref={containerRef}
        className="w-full max-w-xl h-80 overflow-y-auto border border-gray-300 rounded-md bg-[#f0f0f0] font-mono text-sm shadow"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {/* <th className="px-2 py-1 border border-gray-300">Ora</th> */}
              <th className="px-2 py-1 border border-gray-300">Metodo</th>
              <th className="px-2 py-1 border border-gray-300">URL</th>
              <th className="px-2 py-1 border border-gray-300">Cookie</th>
              <th className="px-2 py-1 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) =>
              log ? (
                <tr key={log.id} className="even:bg-gray-50 odd:bg-white">
                  {/* <td className="px-2 py-1 border border-gray-300">{log.time}</td> */}
                  <td className="px-2 py-1 border border-gray-300">{log.method}</td>
                  <td className="px-2 py-1 border border-gray-300">{log.url}</td>
                  <td className="px-2 py-1 border border-gray-300 truncate max-w-xs" title={log.cookie || ""}>
                    {log.cookie ?? "-"}
                  </td>
                  <td className={`px-2 py-1 border border-gray-300 font-semibold ${log.status === 200 ? "text-green-600" : "text-red-600"}`}>
                    {log.status}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 w-full max-w-xl flex flex-col items-center gap-4">
        <Input
          placeholder="Inserisci il cookie da replayare"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-black"
          spellCheck={false}
          autoComplete="off"
        />
        <Button onClick={handleReplay} className="w-full">
          Re-Invia Cookie
        </Button>
      </div>
    </main>
  );
}
