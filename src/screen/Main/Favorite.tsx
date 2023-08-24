import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from '../../styles';
import Card from '../../components/Card';

export const Favorite = () => {
  const {favourites} = useSelector((state: any) => state.user);
  // const [refreshing] = useState<boolean>(false);

  if (!favourites.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{color: 'gray', fontSize: 16}}>No records found</Text>
      </View>
    );
  }

  const TitleComponent = () => {
    return (
      <View style={{paddingVertical: 15}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>My Favourites</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={TitleComponent}
        showsVerticalScrollIndicator={false}
        data={favourites}
        renderItem={({item, index}) => <Card item={item} />}
        keyExtractor={(item: any) => item?.id.value}
        ItemSeparatorComponent={() => <View style={styles.itemSaperator} />}
        refreshControl={<RefreshControl refreshing={false} />}
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
