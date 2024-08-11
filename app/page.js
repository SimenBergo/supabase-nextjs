import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-between p-8">
      <h1 className="text-3xl md:text-6xl font-bold text-center font-sans border-b-4 text-shadow shadow-slate-700 border-primary-green">Welcome to Dwight&#39;s Uno data</h1>      <Image src="/dwigt-happy.jpg" height={600} width={600} priority alt="dwight" className="w-[600] h-[600]" />
      <div className="flex flex-col gap-4 items-center">
        <Link href="/account" className="hover:underline">Account</Link>
        <Link href="/login" className="hover:underline">Login</Link>
      </div>
    </main>
  );
}
