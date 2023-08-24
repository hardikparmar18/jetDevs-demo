import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {TStateData} from '../typings/SliceData';
import {Auth, Main} from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../redux/slice';
import {Loader} from '../components';

const AppRouter = () => {
  const {userdata} = useSelector((state: TStateData) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserFromLocal();
  }, []);

  const getUserFromLocal = async () => {
    const rawUserData = await AsyncStorage.getItem('UserData');
    const currentUserData = rawUserData ? await JSON.parse(rawUserData) : null;
    if (currentUserData) {
      dispatch(setUser(currentUserData));
    }
    setLoading(false);
  };

  return (
    <NavigationContainer>
      {loading ? <Loader /> : userdata ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};

export default AppRouter;
