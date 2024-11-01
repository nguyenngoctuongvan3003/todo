import React,{ useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';

function No3({ navigation }) {
  const [newToDo, setNewToDo] = useState(''); // Trạng thái cho to-do mới
  const url = 'https://6719211b7fc4c5ff8f4c8db7.mockapi.io/toDo';

  const addNewItem = async () => {
    if (newToDo.trim() === '') {
      alert('Please enter a to-do.');
      return;
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toDo: newToDo }),
      });
      if (response.ok) {
        setNewToDo(''); // Đặt lại input sau khi thêm thành công
        navigation.navigate('No2'); // Điều hướng về No1 sau khi thêm
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.no3}>
      <View style={styles.row1}>
        <View style={styles.user}>
          <Image
            style={styles.userImg}
            source={require('../assets/img/img1.png')}
          />
          <View style={styles.userText}>
            <Text style={styles.textUser1}>Hi</Text>
            <Text style={styles.textUser2}>Have a great day ahead</Text>
          </View>
        </View>

        <Image source={require('../assets/img/arrow.png')} />
      </View>

      <View style={styles.row2}>
        <View style={styles.inputSearch}>
          <Image source={require('../assets/img/toDo.png')} />
          <TextInput
            placeholder="Input your job"
            value={newToDo}
            onChangeText={setNewToDo} // Cập nhật trạng thái
          />
        </View>

        <Pressable style={styles.buttonFinish} onPress={addNewItem}>
          <Text style={styles.text}>FINISH → </Text>
        </Pressable>

        <Image
          style={{ width: 190, height: 170 }}
          source={require('../assets/img/img1.png')}
        />
      </View>
    </SafeAreaView>
  );  
}

export default No3;

const styles = StyleSheet.create({
  userImg: {
    width: 45,
    height: 45,
    backgroundColor: 'pink',
    borderRadius: '100%',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textUser1: {
    color: '#4A4D52',
    fontSize: 21,
    paddingLeft: 10,
    fontWeight: 700,
  },
  textUser2: {
    color: 'gray',
    fontWeight: 700,
  },
  row2: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputSearch: {
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 4,
    width: '95%',
    marginBottom: 50,
  },
  
  buttonFinish: {
    paddingVertical: 7,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#00BDD6',
    marginBottom: 100,
  },
  
});