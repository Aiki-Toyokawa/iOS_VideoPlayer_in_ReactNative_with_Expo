/// FolderComponent.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FolderComponent = ({ name, navigation, folders, setFolders, saveFoldersToStorage }) => (
  <TouchableOpacity 
    onPress={() => navigation.navigate('FolderScreen', {
    folderName: name,
    folders,
    setFolders,
    saveFoldersToStorage
  })}>
    <View style={styles.folderContainer}>
      <Image source={require('../assets/folderIcon.png')} style={styles.folderIcon} />
      <Text style={styles.folderName}>{name}</Text>
      <Image source={require('../assets/threeLine.png')} style={styles.threeLineIcon} />
    </View>
    <View style={styles.underLine} />
  </TouchableOpacity>
);

export default FolderComponent;

const styles = StyleSheet.create({
  folderContainer: {
    padding: 20, 
    height: 64, 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  folderIcon: {
    width: 50, 
    resizeMode: 'contain', 
  }, 
  folderName: {
    color: '#fff', // テキストの色
    fontWeight: 'bold',
    marginLeft: 20,
    height: 20,
    width: 100,
  },
  threeLineIcon: {
    width: 32,
    marginLeft: 140 ,
    resizeMode: 'contain',
  },
  underLine: {
    width: '90%',
    backgroundColor: '#777777',
    height: 1,
    alignSelf: 'center',
  },
});
