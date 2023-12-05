import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const DeleteFolderModalComponent = ({ isVisible, onCancel, onDelete }) => (
  <Modal
    visible={isVisible}
    animationType="slide"
    transparent
  >
    <View style={styles.overlay}>
      <View style={styles.modalView}>
        <Text style={styles.titleText}>フォルダを削除</Text>
        <Text style={styles.subtitleText}>このフォルダを削除しますか？</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={{ height: 50, width: '50%', justifyContent: 'center' }} >
            <Text style={styles.cancelText}>キャンセル</Text>
          </TouchableOpacity>
          <View style={{ borderColor: '#777777', borderWidth: 0.7 }} />
          <TouchableOpacity onPress={onDelete} style={{ height: 50, width: '50%', justifyContent: 'center' }} >
            <Text style={styles.deleteText}>削除する</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  </Modal>
);

export default DeleteFolderModalComponent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明のオーバーレイ
  },
  modalView: {
    height: 'auto',
    width: '70%',
    backgroundColor: "#1f1f1f",
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginTop: 25,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    color: 'white',
    marginTop: 10,
    marginBottom: 25,
  },
  buttonContainer: {
    borderTopColor: '#777777',
    borderTopWidth: 1 ,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }, 
  cancelText: {
    color: '#007aff', // iOS ボタンテキストカラー
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  deleteText: {
    color: 'red', // iOS ボタンテキストカラー
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
