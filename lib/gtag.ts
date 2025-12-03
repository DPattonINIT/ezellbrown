// /lib/gtag.ts

export const GA_TRACKING_ID = "G-VH807R2549";

// Track pageviews
export const pageview = (url: string) => {
  if (typeof window !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
