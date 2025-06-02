import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-4 text-center bg-gray-100 text-gray-700 fixed bottom-0 left-0">
      Made with <span aria-label="love" role="img">❤️</span> by{" "}
      <Link
        href="https://instagram.com/davide.cose"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        davidecose
      </Link>
    </footer>
  );
}
