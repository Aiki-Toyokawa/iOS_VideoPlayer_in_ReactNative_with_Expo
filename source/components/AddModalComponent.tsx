// FolderAddModalComponent.tsx
import React, { useEffect, useRef }from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Keyboard } from 'react-native';

const AddModalComponent = ({ isDialogVisible, setIsDialogVisible, newFolderName, setNewFolderName, addFolder }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // モーダルが表示される際のみフェードインアニメーションを実行
  useEffect(() => { 
    if (isDialogVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isDialogVisible]);

  // モーダルを閉じる関数
  const closeDialog = () => {
    Keyboard.dismiss();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsDialogVisible(false); // モーダルを非表示に
      setNewFolderName(''); // テキスト入力をクリア
    });
  };
  // 作成ボタンが押された時の処理
  const handleAddAndClose = () => {
    Keyboard.dismiss();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsDialogVisible(false); // モーダルを非表示に
      addFolder(); // フォルダ追加の処理      
      setNewFolderName(''); // テキスト入力をクリア
    });
  };

  return (
    <Modal
      transparent={true}
      visible={isDialogVisible}
      onRequestClose={closeDialog}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.makeFolder}>フォルダを作成</Text>
            <TextInput
              autoFocus={true}
              placeholder="フォルダ名"
              placeholderTextColor="#7f7f7f"
              value={newFolderName}
              onChangeText={setNewFolderName}
              style={styles.input}
            />
            <View style={{ width: '100%', flexDirection: 'row', borderTopColor: '#777777', borderTopWidth: 1 }}>
              <TouchableOpacity onPress={closeDialog} style={{ height: 45, width: '50%', justifyContent: 'center', borderRightColor: '#777777', borderRightWidth: 1 }} >
                <Text style={styles.text}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddAndClose} style={{ height: 45, width: '50%', justifyContent: 'center' }} >
                <Text style={styles.text}>作成</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default AddModalComponent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明のオーバーレイ
  },
  text: {
    color: '#007aff', // iOS ボタンテキストカラー
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  dialog: {
    position: 'absolute',
    alignSelf: 'center',
    top: 180,
    backgroundColor: '#1f1f1f',
    padding: 0,
    width: 250,
    borderRadius: 20,
  },
  input: {
    margin: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    height: 36,
    borderColor: '#777777',
    borderWidth: 1,
    borderRadius: 6,
  },
  makeFolder: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
});