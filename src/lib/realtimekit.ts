import axios from "axios";

const ORG_ID = process.env.CF_ORG_ID;
const API_KEY = process.env.CF_API_KEY;
const RTK_BASE_URL = "https://api.realtime.cloudflare.com/v2";

if (!ORG_ID || !API_KEY) {
  console.error("❌ Missing CF_ORG_ID or CF_API_KEY in environment variables");
  throw new Error("Cloudflare RealtimeKit credentials not set");
}

const authHeader = {
  Authorization: `Basic ${Buffer.from(`${ORG_ID}:${API_KEY}`).toString("base64")}`,
  "Content-Type": "application/json",
};

/**
 * ✅ Create a new RealtimeKit meeting
 */
export const createRealtimeMeeting = async (name: string) => {
  try {
    const res = await axios.post(
      `${RTK_BASE_URL}/meetings`,
      {
        title: name,
        preferred_region: "ap-south-1", // recommended for India region
        record_on_start: false,
        persist_chat: true,
      },
      { headers: authHeader }
    );

    if (!res.data?.success) {
      throw new Error("Failed to create meeting");
    }

    console.log("✅ RealtimeKit meeting created:", res.data.data.id);
    return res.data.data;
  } catch (err: any) {
    console.error("❌ Error creating RealtimeKit meeting:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.error?.message || "RealtimeKit meeting creation failed"
    );
  }
};

/**
 * ✅ Add a participant to an existing RealtimeKit meeting
 */
export const addRealtimeParticipant = async (
  meetingId: string,
  customId: string,
  name: string,
  preset: string
) => {
  try {
    // Fallback preset if custom preset is missing or invalid
    const resolvedPreset =
      preset ||
      (name.toLowerCase().includes("teacher")
        ? "group_call_host"
        : "group_call_participant");

    const res = await axios.post(
      `${RTK_BASE_URL}/meetings/${meetingId}/participants`,
      {
        name,
        preset_name: resolvedPreset,
        custom_participant_id: customId,
      },
      { headers: authHeader }
    );

    if (!res.data?.success) {
      throw new Error("Failed to add participant");
    }

    console.log(`✅ Participant added: ${name} (${resolvedPreset})`);
    return res.data.data; // contains token
  } catch (err: any) {
    console.error("❌ Error adding participant:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.error?.message || "RealtimeKit participant creation failed"
    );
  }
};
