import { useState } from "react";

const defaultSettings = {
  theme: "Default",
  font: "System Default",
  textSize: "16",
};

function useSettings() {
  const getSettings = () => {
    const settingsString = localStorage.getItem("settings");
    if (!settingsString) {
      // init settings if dont exist
      localStorage.setItem("settings", JSON.stringify(defaultSettings));
    }
    const userSettings = settingsString
      ? JSON.parse(settingsString)
      : defaultSettings;
    return userSettings;
  };

  const [settings, setSettings] = useState(getSettings());

  const saveSettings = (settings) => {
    const currentSettings = getSettings();
    const newSetting = {
      theme: settings.theme ? settings.theme : currentSettings.theme,
      font: settings.font ? settings.font : currentSettings.font,
      textSize: settings.textSize
        ? settings.textSize
        : currentSettings.textSize,
    };
    localStorage.setItem("settings", JSON.stringify(newSetting));
    setSettings(newSetting);
  };

  const resetSettings = () => {
    localStorage.removeItem("settings");
    setSettings(null);
  };

  return {
    setSettings: saveSettings,
    resetSettings,
    settings,
  };
}

export { defaultSettings, useSettings };
