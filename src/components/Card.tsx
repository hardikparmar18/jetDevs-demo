import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAddToFavourites, setRemoveFromFavourites} from '../redux/slice';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../styles';
import {useIsFocused} from '@react-navigation/native';

const Card = ({item}: any) => {
  const dispatch = useDispatch();
  const {favourites} = useSelector((state: any) => state.user);
  const [isFav, setIsFav] = useState<boolean>(false);
  const isFocus = useIsFocused();

  React.useEffect(() => {
    setIsFav(
      favourites?.some((_user: any) => _user?.id?.value == item?.id?.value),
    );
  }, [isFocus]);

  const checkFav = (user: any) => {
    setIsFav(!isFav);
    isFav
      ? dispatch(setRemoveFromFavourites(user))
      : dispatch(setAddToFavourites(user));
  };

  const CardComponent = useMemo(() => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item.picture.thumbnail, cache: 'force-cache'}}
          style={styles.image}
        />
        <View style={styles.detailsWithFav}>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>
              {item.name.first} {item.name.last}
            </Text>
            <View style={styles.locationContainer}>
              <Entypo name="location-pin" size={15} color="gray" />
              <Text style={styles.locatonText}>
                {item.location.city}, {item.location.country}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => checkFav(item)}>
            <Entypo
              name={isFav ? 'star' : 'star-outlined'}
              size={30}
              color={isFav ? COLORS.primary : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [item, isFav]);

  return CardComponent;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    margin: 5,
    marginLeft: 25,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGrey,
    left: -20,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  itemSaperator: {},
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
  },
  locatonText: {
    fontSize: 14,
    color: 'gray',
  },
  detailsWithFav: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
    overflow: 'hidden',
  },
});
