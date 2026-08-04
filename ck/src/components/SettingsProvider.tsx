"use client";
import { createContext, useContext, type ReactNode } from "react";
import { site, waFor, type SiteSettings } from "@/lib/site";

const SettingsContext = createContext<SiteSettings>(site);

export function SettingsProvider({ settings, children }: { settings: SiteSettings; children: ReactNode }) {
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

/** Site Settings from Payload, available in every client component. */
export function useSettings(): SiteSettings {
  return useContext(SettingsContext);
}

/** WhatsApp deep link builder bound to the CMS WhatsApp number. */
export function useWhatsApp() {
  const settings = useSettings();
  return (message: string) => waFor(settings.whatsapp, message);
}
