"use client";

import { useEffect, useState, useRef } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PacketDetails = Record<string, string>;

interface Packet {
  id: number;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
  details: PacketDetails;
}

// Più pacchetti, il cookie vero è uno degli ultimi
const packetsData: Packet[] = [
  {
    id: 1,
    source: "192.168.0.22",
    destination: "10.0.0.7",
    protocol: "HTTP",
    length: 477,
    info: "GET /favicon.ico",
    details: {
      Host: "example.com",
      "User-Agent": "Wget/1.20.3",
      Accept: "*/*",
      "Content-Length": "477",
      Body: ""
    }
  },
  {
    id: 2,
    source: "10.0.0.5",
    destination: "192.168.0.22",
    protocol: "TCP",
    length: 200,
    info: "ACK",
    details: {
      Notes: "TCP acknowledgment packet"
    }
  },
  {
    id: 3,
    source: "172.16.0.10",
    destination: "192.168.0.22",
    protocol: "HTTP",
    length: 520,
    info: "GET /api/data",
    details: {
      Host: "api.cybertrap.local",
      "User-Agent": "curl/7.68.0",
      Accept: "application/json",
      "Content-Length": "520",
      Body: ""
    }
  },
  {
    id: 4,
    source: "10.0.0.8",
    destination: "192.168.0.22",
    protocol: "UDP",
    length: 150,
    info: "DNS Query",
    details: {
      Query: "cybertrap.local",
      Type: "A"
    }
  },
  {
    id: 5,
    source: "192.168.0.22",
    destination: "10.0.0.8",
    protocol: "UDP",
    length: 200,
    info: "DNS Response",
    details: {
      Answer: "10.0.0.8"
    }
  },
  {
    id: 6,
    source: "192.168.0.22",
    destination: "10.0.0.5",
    protocol: "HTTP",
    length: 300,
    info: "POST /login HTTP/1.1",
    details: {
      Host: "cybertrap.local",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "session=invalid-123",
      "Content-Length": "300",
      Body: "username=intruder&password=wrongpass"
    }
  },
  {
    id: 7,
    source: "10.0.0.5",
    destination: "192.168.0.22",
    protocol: "HTTP",
    length: 140,
    info: "POST /login HTTP/1.1",
    details: {
      Host: "cybertrap.local",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "session=cyber-x-42",  // Questo è il cookie corretto da intercettare
      "Content-Length": "140",
      Body: "username=agent&password=********"
    }
  },
  {
    id: 8,
    source: "192.168.1.14",
    destination: "10.0.0.5",
    protocol: "TCP",
    length: 200,
    info: "ACK",
    details: {
      Notes: "TCP acknowledgment packet"
    }
  },
  {
    id: 9,
    source: "192.168.0.22",
    destination: "10.0.0.7",
    protocol: "HTTP",
    length: 130,
    info: "GET /dashboard",
    details: {
      Host: "cybertrap.local",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      Cookie: "session=old-session",
      "Content-Length": "130",
      Body: ""
    }
  }
];

const CORRECT_COOKIE = "session=cyber-x-42";

export default function TaskSniffPage() {
  const router = useRouter();
  const [packets, setPackets] = useState<Packet[]>([]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < packetsData.length) {
        setPackets((old) => [...old, packetsData[idx]]);
        idx++;
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const verifyCookie = () => {
    if (input.trim() === CORRECT_COOKIE) {
      toast.success("Cookie intercettato correttamente! Accesso consentito.");
      localStorage.setItem("checkpoint", btoa("task3"));
      setTimeout(() => router.push("/task-replay"), 1500);
    } else {
      toast.error("Cookie errato, riprova.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">🕵️‍♂️ Task: Intercetta il cookie</h1>
      <p className="max-w-md mb-6 text-gray-700 text-center">
        Osserva il traffico di rete qui sotto. Solo uno dei pacchetti HTTP contiene il cookie di sessione in chiaro.
        Trova il valore corretto e inseriscilo nel campo per procedere.
      </p>

      <div
        ref={containerRef}
        className="w-full max-w-xl h-96 overflow-y-auto border border-gray-300 rounded-md bg-[#1e1e1e] text-white font-mono text-xs shadow-lg"
      >
        <Accordion type="single" collapsible>
          {packets.map((pkt) => (
            <AccordionItem key={pkt.id} value={pkt.id.toString()} className="border-b border-gray-700">
              <AccordionTrigger className="flex justify-between px-4 py-2 hover:bg-[#333] cursor-pointer">
                <span className="w-24 truncate">{pkt.source}</span>
                <span className="w-24 truncate">{pkt.destination}</span>
                <span className="w-12 text-center">{pkt.protocol}</span>
                <span className="w-16 text-center">{pkt.length} B</span>
                <span className="flex-1 text-left pl-4 truncate">{pkt.info}</span>
              </AccordionTrigger>
              <AccordionContent className="bg-[#252526] p-4 text-xs text-gray-300">
                {Object.entries(pkt.details).map(([key, val]) => (
                  <div key={key} className="mb-1 break-words">
                    <span className="font-semibold text-green-400">{key}:</span> {val}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-6 w-full max-w-xl flex flex-col items-center gap-4">
        <Input
          placeholder="Inserisci il valore del cookie intercettato"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-black"
          spellCheck={false}
          autoComplete="off"
        />
        <Button onClick={verifyCookie} className="w-full">
          Verifica Cookie
        </Button>
      </div>
    </main>
  );
}
