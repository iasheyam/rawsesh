import ApplicationForm from "@/components/ApplicationForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apply to be a Companion — RawSesh",
  description: "Join our founding group of companions. We review every application manually.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#1a1a1a]">
      <nav className="px-6 py-5 max-w-5xl mx-auto">
        <Link href="/" className="font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity">
          RawSesh
        </Link>
      </nav>

      <div className="max-w-xl mx-auto px-6 pt-10 text-center">
        <p className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-3">
          Companion application
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Apply to join RawSesh
        </h1>
        <p className="text-neutral-500 text-base">
          We review every application manually. Be yourself — that&apos;s the whole point.
        </p>
      </div>

      <ApplicationForm />
    </main>
  );
}
