import { DollarSign, Sparkles, Clock, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#1a1a1a]">
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <span className="font-semibold text-lg tracking-tight">RawSesh</span>
        <a
          href="/apply"
          className="text-sm font-medium border border-[#1a1a1a] px-4 py-2 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-colors"
        >
          Apply to join
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <p className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-6">
          Now recruiting founding companions
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
          Real talk.
          <br />
          Real people.
          <br />
          <span className="text-neutral-400">Real pay.</span>
        </h1>
        <p className="text-xl text-neutral-600 max-w-xl mx-auto mb-10 leading-relaxed">
          Get paid to have genuine conversations. No coaching, no therapy, no
          script — just you, being human.
        </p>
        <a
          href="/apply"
          className="inline-block bg-[#1a1a1a] text-white text-base font-medium px-8 py-4 rounded-full hover:bg-neutral-800 transition-colors"
        >
          Apply to be a companion →
        </a>
      </section>

      {/* What is RawSesh */}
      <section className="bg-[#1a1a1a] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-snug">
            People are starving for real conversation.
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Not advice. Not therapy. Not small talk. RawSesh connects them with
            everyday humans — people like you — for honest, unfiltered 30 to 60
            minute conversations. You don&apos;t need credentials. You just need
            to show up.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-14">How it works</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Apply",
              body: "Tell us a little about yourself. We vet everyone to keep quality high.",
            },
            {
              step: "02",
              title: "Set your schedule",
              body: "You decide when you're available and how many sessions you take.",
            },
            {
              step: "03",
              title: "Talk",
              body: "A seeker books time with you. You join a call. You just... talk.",
            },
            {
              step: "04",
              title: "Get paid",
              body: "Direct payout after every session. No invoices, no chasing.",
            },
          ].map(({ step, title, body }) => (
            <div key={step}>
              <p className="text-4xl font-bold text-neutral-200 mb-3">{step}</p>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why become a companion */}
      <section className="bg-neutral-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why become a companion?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Earn doing what you already do",
                body: "Connecting with people, listening, being present. You're doing it anyway.",
              },
              {
                icon: Sparkles,
                title: "Zero expertise required",
                body: "No degree. No certification. Just presence and honesty.",
              },
              {
                icon: Clock,
                title: "Fully flexible",
                body: "Work when it works for you. Set your hours, take the sessions you want.",
              },
              {
                icon: Heart,
                title: "Be part of something real",
                body: "Not another gig. A community of humans who believe conversation has value.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-neutral-200"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-neutral-700" />
                </div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who's this for */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Who&apos;s this for?</h2>
        <p className="text-neutral-500 text-lg leading-relaxed mb-8">
          Good listeners. Night owls. People who&apos;ve been told{" "}
          <em>&quot;you&apos;re easy to talk to.&quot;</em> Anyone who believes
          real conversation has value.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            "Good listeners",
            "Empathetic people",
            "Night owls",
            "Curious minds",
            "People who get it",
            "Open books",
          ].map((tag) => (
            <span
              key={tag}
              className="text-sm px-4 py-2 rounded-full border border-neutral-300 text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a1a1a] text-white py-24 px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Ready to get paid to be human?
        </h2>
        <p className="text-neutral-400 text-lg mb-10">
          We&apos;re building our founding group of companions now. Spots are
          limited.
        </p>
        <a
          href="/apply"
          className="inline-block bg-white text-[#1a1a1a] font-medium px-8 py-4 rounded-full hover:bg-neutral-100 transition-colors"
        >
          Apply to be a companion →
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-neutral-400 text-sm">
        © {new Date().getFullYear()} RawSesh. Real people. Real talk. No filter.
      </footer>
    </main>
  );
}
