// FolderScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

import DeleteFolderModalComponent from '../components/DeleteFolderModalComponent';

const FolderScreen = ({ route, navigation }) => {
  const { folderName, folders, setFolders, saveFoldersToStorage } = route.params;
  const downloadedVideos = route.params.downloadedVideos || []; // ダウンロードされた動画のリスト
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDelete = async () => { // フォルダを削除するロジック
    const updatedFolders = folders.filter(folder => folder.name !== folderName);
    setFolders(updatedFolders);
    await saveFoldersToStorage(updatedFolders);
    navigation.navigate('Home'); // HomeScreenに戻る
  };

  function extractTitleFromPath(path) {
    const filename = path.split('/').pop(); // ファイル名を取得
    const title = filename.split('.').slice(0, -1).join('.'); // 拡張子を除去
    return title;
  }

  // テストのための動画URIリスト
  const videoList = [
    { uri: require('../videos/video-1.mp4'), title: extractTitleFromPath('../videos/video-1.mp4') },
    { uri: require('../videos/video-2.mp4'), title: extractTitleFromPath('../videos/video-2.mp4') },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image source={require('../assets/folderIcon.png')} style={styles.headerFolderIcon} />
        <Text style={styles.headerText}>{folderName} のコンテンツ</Text>
        <TouchableOpacity onPress={() => setIsDeleteModalVisible(true)}>
          <Image source={require('../assets/threeCircle.png')} style={styles.headerThreeCircle} />
        </TouchableOpacity>
        <DeleteFolderModalComponent
          isVisible={isDeleteModalVisible}
          onCancel={() => setIsDeleteModalVisible(false)}
          onDelete={handleDelete}
        />
      </View>
      <ScrollView style={styles.content}>
        {videoList.map((video, index) => (
          <View key={index} style={styles.videoContainer}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Video
              source={video.uri}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              shouldPlay={false}
              useNativeControls
              style={{ width: '80%', height: 200 }}
            />
          </View>
        ))}
        {downloadedVideos.map((videoUri, index) => (
          <View key={index} style={styles.videoContainer}>
            <Text style={styles.videoTitle}>ダウンロードされた動画 {index + 1}</Text>
            <Video
              source={{ uri: videoUri }}
              style={{ width: '80%', height: 200 }}
              useNativeControls
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FolderScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#313338',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 10,
  },
  headerFolderIcon: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerThreeCircle: {
    height: 24,
    width: 36,
    resizeMode: 'contain',
  },
  content: {
    padding: 10,
  },
  videoContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  videoTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});