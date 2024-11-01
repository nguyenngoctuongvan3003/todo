
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';

function No1({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Image style={styles.img1} source={require('../assets/img/img1.png')} />
        <Text style={styles.title}>MANAGE YOUR TASK</Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.input}>
          <Fontisto name="email" size={20} color="black" />
          <TextInput placeholder=" Enter your name" />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('No2')}>
          <Text style={styles.text}>GET STARTED → </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default No1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
  },
  img1: {
    width: 271,
    height: 271,
  },
  title: {
    color: '#8353E2',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 24,
  },
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#9095A0',
    borderRadius: 12,
    paddingVertical: 6,
    width: 300,
    paddingLeft: 5,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#00BDD6',
  },
  text: {
    color: 'white',
    fontWeight: 700,
    fontSize: 15,
  },
  container1: { flex: 3, justifyContent: 'center', alignItems: 'center' },

  container2: { flex: 2, justifyContent: 'space-around', alignItems: 'center' },

});