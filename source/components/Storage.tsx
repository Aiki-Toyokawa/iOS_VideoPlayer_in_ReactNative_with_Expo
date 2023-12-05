import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFoldersToStorage = async (folders) => {
  try {
    const jsonValue = JSON.stringify(folders);
    await AsyncStorage.setItem('@folders', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const loadFoldersFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@folders');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log(e);
  }
};
