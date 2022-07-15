import { useState } from "react";
import defaultColors from "../../styles/defaultColors";

const defaultSettings = {
  theme: defaultColors,
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

  const saveSettings = ({ theme, font, textSize }) => {
    const currentSettings = getSettings();
    const newSetting = {
      theme: theme ? theme : currentSettings.theme,
      font: font ? font : currentSettings.font,
      textSize: textSize ? textSize : currentSettings.textSize,
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
