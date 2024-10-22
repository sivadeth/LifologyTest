// UserCard.js
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const UserCard = ({user, index}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.card, {marginTop: index === 0 ? 20 : 10}]}
      onPress={() => navigation.navigate('Posts', {id: user.id})}>
      <Image source={{uri: user.image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.info}>Phone No: {user.phone}</Text>
        <Text style={styles.info}>Age: {user.age}</Text>
        <Text style={styles.info}>Email: {user.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
});

export default UserCard;
