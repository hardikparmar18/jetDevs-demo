import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../styles';
import {Loader} from '../../components';
import Card from '../../components/Card';
import {useIsFocused} from '@react-navigation/native';

export const Home = () => {
  const [users, setUsers] = useState<object[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefresing] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const isFocus = useIsFocused();

  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchMoreUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=10`);
      const data = await response.json();
      setUsers([...data?.results]);
    } catch (error) {
      throw error;
    } finally {
      setRefresing(false);
      setLoading(false);
      setFetching(false);
    }
  };

  const fetchMoreUsers = async () => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=10&page=${currentPage}`,
      );
      const data = await response.json();
      setUsers([...users, ...data?.results]);
    } catch (error) {
      throw error;
    } finally {
      setFetching(false);
    }
  };

  const onRefresh = () => {
    setRefresing(true);
    fetchUsers();
  };

  const TitleComponent = () => {
    return (
      <View style={{paddingVertical: 15}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Random Users</Text>
      </View>
    );
  };

  if (loading) {
    return <Loader />;
  } else if (!users.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{color: 'gray', fontSize: 16}}>No records found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={TitleComponent}
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={({item, index}) => <Card item={item} />}
        keyExtractor={(item: any) => item?.email}
        ItemSeparatorComponent={() => <View style={styles.itemSaperator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={() => {
          setFetching(true);
          setCurrentPage((currentPage: number) => currentPage + 1);
        }}
        onEndReachedThreshold={0.9}
        ListFooterComponent={() => fetching && <Loader />}
        // ListEmptyComponent={

        // }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemSaperator: {},
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.hikingCard,
    left: -20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
