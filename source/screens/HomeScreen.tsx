// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { saveFoldersToStorage, loadFoldersFromStorage } from '../components/Storage';

import FolderComponent           from '../components/FolderComponent'
import FolderPlusButtonComponent from '../components/FolderPlusButtonComponent';
import AddModalComponent         from '../components/AddModalComponent';

const initialFolders = [
  { name: 'All フォルダ' },
];

const HomeScreen = ({ navigation }) => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  
  // コンポーネントがマウントされた時にフォルダを読み込む
  useEffect(() => {
    const getFolders = async () => {
      const loadedFolders = await loadFoldersFromStorage();
      setFolders(loadedFolders);
    };
    getFolders();
  }, []);


  // フォルダ追加処理の更新
  const handleAdd = () => {
    if (newFolderName) {
      const newFolders = [...folders, { name: newFolderName }];
      setFolders(newFolders);
      saveFoldersToStorage(newFolders);
      setNewFolderName('');
      setIsDialogVisible(false);
    }
  };
  
  const renderFolder = ({ item }) => (
    <FolderComponent 
      key={item.name} 
      name={item.name} 
      navigation={navigation} 
      folders={folders}
      setFolders={setFolders}
      saveFoldersToStorage={saveFoldersToStorage}
      />
  );

  return (
    <View style={{ flex: 1 }}>

      <FlatList
        data={folders}
        renderItem={renderFolder}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.container}
      />

      <FolderPlusButtonComponent onAddPress={() => setIsDialogVisible(true)} />

      <AddModalComponent 
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        addFolder={handleAdd}
      />

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  
});