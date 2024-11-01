import React,{ useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';

function No2({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const url = 'https://6719211b7fc4c5ff8f4c8db7.mockapi.io/toDo';

  const fetchItems = async () => {
    try {
      const response = await fetch(url);
      const datas = await response.json();
      setData(datas.slice(0, 10)); // Giới hạn 10 item để demo
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (id, updatedText) => {
    try {
      await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toDo: updatedText }),
      });
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, toDo: updatedText } : item))
      );
      setEditItem(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Gọi lại fetchItems() khi No2 được focus
  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [])
  );

  const Item = ({ item }) => {
    const [isEditable, setIsEditable] = useState(false);
    const inputRef = useRef(null);
    const [toDo, setToDo] = useState(item.toDo);

    const handlePressEdit = () => {
      if (!isEditable) {
        setIsEditable(true);
        setEditItem(item.id);
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
      } else {
        setIsEditable(false);
        updateItem(item.id, toDo);
      }
    };

    return (
      <View style={styles.toDo}>
        <View style={styles.toDoContent}>
          <Image source={require('../assets/img/toDo.png')} />
          <TextInput
            ref={inputRef}
            value={toDo}
            editable={isEditable}
            onChangeText={setToDo}
          />
        </View>
        <Pressable onPress={handlePressEdit}>
          <Image
            source={
              isEditable
                ? require('../assets/img/save.png')
                : require('../assets/img/edit.png')
            }
            style={styles.imgButton}
          />
        </Pressable>
        <Pressable onPress={() => deleteItem(item.id)}>
          <Image
            source={require('../assets/img/delete.png')}
            style={styles.imgButton}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.no2}>
      <View style={{ flex: 1 }}>
        <View style={styles.row1}>
          <Image source={require('../assets/img/arrow.png')} />
          <View style={styles.user}>
            <Image
              style={styles.userImg}
              source={require('../assets/img/img1.png')}
            />
            <View style={styles.userText}>
              <Text style={styles.textUser1}>Hi User</Text>
              <Text style={styles.textUser2}>Have a great day ahead</Text>
            </View>
          </View>
        </View>

        <View style={[styles.row2, { flex: 8 }]}>
          <View style={styles.inputSearch}>
            <Image source={require('../assets/img/search.png')} />
            <TextInput placeholder="Search" />
          </View>

          <FlatList
            style={{ width: '100%' }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Item item={item} />}
          />

          <Pressable
            style={styles.add}
            onPress={() => navigation.navigate('No3')}
          >
            <Image
              style={styles.addImg}
              source={require('../assets/img/plus.png')}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default No2;

const styles = StyleSheet.create({
  no2: {
    flex: 1,
    padding: 8,
  },
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
  toDo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCCED1',
    width: '95%',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 'auto',
  },
  toDoContent: {
    flexDirection: 'row',
  },
  add: {
    width: 65,
    height: 65,
    borderRadius: '100%',
    backgroundColor: '#00BDD6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImg: {
    width: 45,
    height: 45,
  },
  imgButton: {
    width: 15,
    height: 15,
  },
});