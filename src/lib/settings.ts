import fs from "fs";
import path from "path";

const SETTINGS_PATH = path.join(process.cwd(), "data", "settings.json");

export interface SiteSettings {
  sessionMaxAgeDays: number;
}

const DEFAULTS: SiteSettings = {
  sessionMaxAgeDays: 30,
};

export function getSettings(): SiteSettings {
  try {
    const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveSettings(settings: Partial<SiteSettings>): SiteSettings {
  const current = getSettings();
  const merged = { ...current, ...settings };

  const dir = path.dirname(SETTINGS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(merged, null, 2));
  return merged;
}
