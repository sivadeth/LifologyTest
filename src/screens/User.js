import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Appimages from '../constants/Appimages';
import Apiconfig from '../constants/Apiconfig';
const User = ({route}) => {
  const {id, name} = route.params;
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //User Details Api call
  const userDetailsApi = async () => {
    try {
      const response = await axios.get(
        Apiconfig.BASE_URL + `users/${id}/posts`,
      );
      setUser(response.data.posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const renderPost = ({item, index}) => (
    <View style={[styles.postContainer, {marginTop: index === 0 ? 16 : 0}]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <View style={styles.viewContainer}>
        <Image source={Appimages.view} style={styles.imgStyle} />
        <Text style={styles.stats}>{item.views}</Text>
        <Image source={Appimages.like} style={styles.imgStyle} />
        <Text style={styles.stats}>{item.reactions.likes}</Text>
        <Image source={Appimages.dislike} style={styles.imgStyle} />
        <Text style={styles.stats}>{item.reactions.dislikes}</Text>
      </View>
      <View style={styles.tagContainer}>
        <Text style={{fontWeight: 'bold'}}>Tags:</Text>
        {item.tags.map((tag, index) => (
          <View style={styles.tagStyle} key={index}>
            <Text style={styles.tags}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
  useEffect(() => {
    userDetailsApi();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.noPost}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : user.length !== 0 ? (
        <FlatList
          data={user}
          renderItem={renderPost}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noPost}>
          <Text style={styles.title}>
            {name.firstName} {name.lastName} has no Posts
          </Text>
        </View>
      )}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    marginVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  stats: {
    fontSize: 12,
    color: '#777',
  },
  tagContainer: {flexDirection: 'row', alignItems: 'center'},
  tags: {
    textAlign: 'center',
    fontSize: 13,
    color: '#ffff',
    fontWeight: 'bold',
  },
  noPost: {alignItems: 'center', justifyContent: 'center', flex: 1},
  tagStyle: {
    backgroundColor: '#007bff',
    margin: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  imgStyle: {height: 18, width: 18, marginHorizontal: 5},
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 5,
  },
});
