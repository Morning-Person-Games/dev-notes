import { useState } from "react";

export default function useOfflineStorage() {
  const getOfflineStorage = () => {
    const tokenString = localStorage.getItem("offlineStorage");
    const userOfflineStorage = JSON.parse(tokenString);
    return userOfflineStorage;
  };

  const [offlineStorage, setOfflineStorage] = useState(getOfflineStorage());

  const saveOfflineStorage = (userOfflineStorage) => {
    localStorage.setItem("offlineStorage", JSON.stringify(userOfflineStorage));
    setOfflineStorage(userOfflineStorage);
  };

  const resetOfflineStorage = () => {
    localStorage.removeItem("offlineStorage");
    setOfflineStorage(null);
  };

  return {
    setOfflineStorage: saveOfflineStorage,
    resetOfflineStorage,
    offlineStorage,
  };
}
