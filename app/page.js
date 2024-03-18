import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl md:text-6xl font-bold text-center font-sans">Welcome to Bergos playground</h1>
      <div className="flex flex-col gap-4 items-center">
        <Link href="/account" className="hover:underline">Account</Link>
        <Link href="/login" className="hover:underline">Login</Link>
      </div>
    </main>
  );
}
