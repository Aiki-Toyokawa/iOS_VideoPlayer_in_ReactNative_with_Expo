// FolderPlusButtonComponent.tsx
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const FolderPlusButtonComponent = ({ onAddPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
      <Image source={require('../assets/folderPlusIcon.png')} style={styles.addIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: -100,
    bottom: 120,
  },
  addIcon: {
    height: 36,
    resizeMode: 'contain',
  },
});

export default FolderPlusButtonComponent;