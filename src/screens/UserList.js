import {
  FlatList,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import Apiconfig from '../constants/Apiconfig';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // here we use useRef hook to reference the flatlist in order to invoke its property
  const flatListRef = useRef(null);

  // User List API call
  const userListApi = async () => {
    try {
      const response = await axios.get(
        Apiconfig.BASE_URL + `users?limit=30&skip=${count}`,
      );
      // Append new users to the existing list
      setUsers(prevUsers => [...prevUsers, ...response.data.users]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollHandler = () => {
    if (!loading) {
      setCount(prevCount => prevCount + 30);
      setLoading(true);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  // Render the items used in the FlatList, here UserCard is a custom component
  const renderItem = ({item, index}) => <UserCard user={item} index={index} />;

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  };

  useEffect(() => {
    userListApi();
  }, [count]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        onEndReached={scrollHandler}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter} // Footer for loading indicator
      />
      <TouchableOpacity style={styles.button} onPress={scrollToTop}>
        <Text style={styles.buttonText}>Scroll to Top</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  flatListContent: {
    paddingBottom: 10,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});
