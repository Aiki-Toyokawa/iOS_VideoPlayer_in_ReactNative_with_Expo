// App.tsx
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import FolderScreen from './source/screens/FolderScreen';
import HomeScreen   from './source/screens/HomeScreen';

// スタックナビゲータのパラメータの型を定義
type RootStackParamList = {
  Home: undefined;
  FolderScreen: {
    folderName: string;
    downloadedVideos: string[]; // downloadedVideos を追加
  };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [downloadedVideos, setDownloadedVideos] = useState([]); // ダウンロードされた動画のURIを保持するための状態

  // ユーザーにフォトライブラリのアクセス許可を求める関数
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('許可が必要です', 'フォトライブラリにアクセスするための許可が必要です。');
      return false;
    }
    return true;
  };

  // フォトライブラリを開く関数
  const openImagePicker = async () => {
    const hasPermission = await getPermission();
    if (!hasPermission) return;
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileName = uri.split('/').pop();
      const localUri = FileSystem.documentDirectory + fileName;
  
      try {
        await FileSystem.copyAsync({ from: uri, to: localUri });
        setDownloadedVideos(prevVideos => [...prevVideos, localUri]);
        console.log("成功", localUri);
        // ここでコピーされた動画のURIを状態に保存する
      } catch (error) {
        console.error("動画のコピーに失敗しました: ", error);
      }
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#313338' }, // スタックの背景色を黒に設定
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={openImagePicker}>
                  <Image
                    source={require('./source/assets/downlodingIcon.png')}
                    style={{ width: 24, height: 24, marginRight: 10 }}
                  />
                </TouchableOpacity>
                <Image
                  source={require('./source/assets/gearIcon.png')}
                  style={{ width: 24, height: 24, marginRight: 10 }}
                />
              </View>
            ),
          }}
        />

        <Stack.Screen 
          name="FolderScreen" 
          component={FolderScreen} 
          initialParams={{ folderName: "Default Name", downloadedVideos }} // Default Nameは適宜変更
          options={({ route }: { route: RouteProp<RootStackParamList, 'FolderScreen'> }) => ({
            title: route.params.folderName
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
