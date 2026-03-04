import {UAParser} from "ua-parser-js";
import supabase from "./supabase";

// export async function getClicks() {
//   let {data, error} = await supabase.from("clicks").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Unable to load Stats");
//   }

//   return data;
// }

export async function getClicksForUrls(urlIds) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}

const parser = new UAParser();

// Try to resolve the visitor's city/country using one or more
// public IP geolocation APIs. This runs in the browser.
async function resolveLocationFromIp() {
  // Primary provider – ipapi (no auth needed)
  try {
    const response = await fetch("https://ipapi.co/json");
    if (response.ok) {
      const data = await response.json();
      if (data?.city || data?.country_name) {
        return {
          city: data.city ?? null,
          country: data.country_name ?? null,
        };
      }
    }
  } catch (err) {
    console.warn("Unable to fetch location from ipapi:", err);
  }

  // Fallback provider – ipwho.is (no auth needed)
  try {
    const response = await fetch("https://ipwho.is/");
    if (response.ok) {
      const data = await response.json();
      if (data?.city || data?.country) {
        return {
          city: data.city ?? null,
          country: data.country ?? null,
        };
      }
    }
  } catch (err) {
    console.warn("Unable to fetch location from ipinfo:", err);
  }

  return {city: null, country: null};
}

// Store a click for statistics. This no longer performs the redirect itself;
// the redirect is handled by the page component so stats can't block navigation.
export const storeClicks = async ({id}) => {
  try {
    const res = parser.getResult();
    // UAParser exposes device info under res.device.type (e.g. "mobile", "tablet", "desktop")
    const device = res.device?.type || "desktop";

    const {city, country} = await resolveLocationFromIp();

    // Record the click (even if location data is missing). Use human-friendly fallbacks.
    await supabase.from("clicks").insert({
      url_id: id,
      city: city || "Unknown City",
      country: country || "Unknown Country",
      device,
    });
  } catch (error) {
    console.error("Error recording click:", error);
  }
};
