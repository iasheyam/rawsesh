import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const VALID_TOPICS = [
  "Life advice",
  "Venting",
  "Career",
  "Relationships",
  "Late-night thoughts",
  "Mental wellness",
  "Creativity",
  "Just chatting",
];

const VALID_AVAILABILITY = ["Mornings", "Afternoons", "Evenings", "Late night"];

const VALID_HOURS_PER_WEEK = ["1–2 hrs", "3–5 hrs", "5–10 hrs", "10+ hrs"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: Record<string, any>;
  try {
    body = await req.json();
  } catch {
    return error("Invalid request body.", 400);
  }

  try {
    return await handlePost(body);
  } catch (e) {
    console.error("Unhandled error in /api/apply:", e);
    return error("Something went wrong. Please try again.", 500);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePost(body: Record<string, any>) {

  const {
    full_name,
    email,
    age,
    state,
    bio,
    topics,
    availability,
    hours_per_week,
    social_link,
  } = body;

  // Required field checks
  if (!full_name?.trim()) return error("Full name is required.");
  if (!email?.trim()) return error("Email is required.");
  if (!EMAIL_REGEX.test(email)) return error("Invalid email address.");
  if (!age) return error("Age is required.");
  if (parseInt(age) < 18) return error("You must be 18 or older to apply.");
  if (parseInt(age) > 99) return error("Invalid age.");
  if (!state?.trim()) return error("State is required.");
  if (!bio?.trim()) return error("Bio is required.");
  if (!hours_per_week) return error("Hours per week is required.");

  // Enum checks
  if (!VALID_HOURS_PER_WEEK.includes(hours_per_week))
    return error("Invalid hours per week value.");

  if (Array.isArray(topics) && topics.some((t) => !VALID_TOPICS.includes(t)))
    return error("Invalid topic selected.");

  if (
    Array.isArray(availability) &&
    availability.some((a) => !VALID_AVAILABILITY.includes(a))
  )
    return error("Invalid availability selected.");

  // Optional URL check
  if (social_link) {
    try {
      new URL(social_link);
    } catch {
      return error("Social link must be a valid URL.");
    }
  }

  const { error: dbError } = await supabaseAdmin
    .from("companion_applications")
    .insert({
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      age: parseInt(age),
      state: state.trim(),
      bio: bio.trim(),
      topics: topics ?? [],
      availability: availability ?? [],
      hours_per_week,
      social_link: social_link?.trim() || null,
    });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return error("Something went wrong. Please try again.", 500);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
