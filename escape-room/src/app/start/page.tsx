import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StartPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">🔐 Cyber Trap</h1>
      <p className="text-base mb-10">
        Sei intrappolato in un server insicuro. Riuscirai a fuggire solo usando il browser.
      </p>
      <Link href="/login">
        <Button className="text-lg px-6 py-4">Inizia la fuga</Button>
      </Link>
    </main>
  );
}