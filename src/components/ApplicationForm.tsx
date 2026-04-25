"use client";

import { useState } from "react";

const TOPICS = [
  "Life advice",
  "Venting",
  "Career",
  "Relationships",
  "Late-night thoughts",
  "Mental wellness",
  "Creativity",
  "Just chatting",
];

const AVAILABILITY = [
  "Mornings",
  "Afternoons",
  "Evenings",
  "Late night",
];

const HOURS_PER_WEEK = ["1–2 hrs", "3–5 hrs", "5–10 hrs", "10+ hrs"];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

type FormData = {
  fullName: string;
  email: string;
  age: string;
  state: string;
  bio: string;
  topics: string[];
  availability: string[];
  hoursPerWeek: string;
  socialLink: string;
  notTherapy: boolean;
  isAdult: boolean;
};

const empty: FormData = {
  fullName: "",
  email: "",
  age: "",
  state: "",
  bio: "",
  topics: [],
  availability: [],
  hoursPerWeek: "",
  socialLink: "",
  notTherapy: false,
  isAdult: false,
};

export default function ApplicationForm() {
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleArray(field: "topics" | "availability", value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: form.fullName,
        email: form.email,
        age: form.age,
        state: form.state,
        bio: form.bio,
        topics: form.topics,
        availability: form.availability,
        hours_per_week: form.hoursPerWeek,
        social_link: form.socialLink,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-4xl mb-4">🙌</div>
        <h2 className="text-2xl font-bold mb-2">Application received.</h2>
        <p className="text-neutral-500 max-w-sm">
          We review every application manually. If you&apos;re a good fit,
          we&apos;ll reach out within a few days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-xl mx-auto px-6 py-16">

      {/* About */}
      <section>
        <h2 className="text-lg font-semibold mb-5 pb-2 border-b border-neutral-200">
          About you
        </h2>
        <div className="space-y-4">
          <Field label="Full name" required>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="Jane Doe"
              className={inputClass}
            />
          </Field>
          <Field label="Email" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="jane@example.com"
              className={inputClass}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Age" required>
              <input
                type="number"
                required
                min={18}
                max={99}
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
                placeholder="25"
                className={inputClass}
              />
            </Field>
            <Field label="State" required>
              <select
                required
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>Select a state</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      </section>

      {/* Vibe */}
      <section>
        <h2 className="text-lg font-semibold mb-5 pb-2 border-b border-neutral-200">
          Your vibe
        </h2>
        <div className="space-y-4">
          <Field label="How would you describe yourself in a few sentences?" required>
            <textarea
              required
              rows={3}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              placeholder="I'm a night owl who loves deep conversations over small talk..."
              className={inputClass}
            />
          </Field>
          <Field label="What topics are you most comfortable with?">
            <div className="flex flex-wrap gap-2 mt-1">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleArray("topics", t)}
                  className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                    form.topics.includes(t)
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "border-neutral-300 text-neutral-600 hover:border-neutral-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </section>

      {/* Availability */}
      <section>
        <h2 className="text-lg font-semibold mb-5 pb-2 border-b border-neutral-200">
          Availability
        </h2>
        <div className="space-y-4">
          <Field label="When are you generally free?">
            <div className="flex flex-wrap gap-2 mt-1">
              {AVAILABILITY.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleArray("availability", a)}
                  className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                    form.availability.includes(a)
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "border-neutral-300 text-neutral-600 hover:border-neutral-500"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </Field>
          <Field label="How many hours per week are you interested in working?" required>
            <div className="flex flex-wrap gap-2 mt-1">
              {HOURS_PER_WEEK.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => set("hoursPerWeek", h)}
                  className={`text-sm px-5 py-2 rounded-full border transition-colors ${
                    form.hoursPerWeek === h
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "border-neutral-300 text-neutral-600 hover:border-neutral-500"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </section>

      {/* Trust */}
      <section>
        <h2 className="text-lg font-semibold mb-5 pb-2 border-b border-neutral-200">
          Trust signal
        </h2>
        <Field label="Social profile link" hint="LinkedIn, Instagram, X — anything that shows you're a real person.">
          <input
            type="url"
            value={form.socialLink}
            onChange={(e) => set("socialLink", e.target.value)}
            placeholder="https://instagram.com/yourhandle"
            className={inputClass}
          />
        </Field>
      </section>

      {/* Agreement */}
      <section className="space-y-3">
        <CheckField
          checked={form.isAdult}
          onChange={(v) => set("isAdult", v)}
          label="I confirm I am 18 years of age or older."
        />
        <CheckField
          checked={form.notTherapy}
          onChange={(v) => set("notTherapy", v)}
          label="I understand RawSesh is not therapy or professional advice."
        />
      </section>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={!form.isAdult || !form.notTherapy || loading}
        className="w-full bg-[#1a1a1a] text-white font-medium py-4 rounded-full hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit application →"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors resize-none";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
        {label}
        {required && <span className="text-neutral-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-neutral-400 mb-2">{hint}</p>}
      {children}
    </div>
  );
}

function CheckField({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-[#1a1a1a]"
      />
      <span className="text-sm text-neutral-600">{label}</span>
    </label>
  );
}
