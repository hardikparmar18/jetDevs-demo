export type TUserProps = {
  userdata: any;
  status: 'idle' | 'error' | 'loading';
  favourites: any
};

export type TStateData = {
  user: TUserProps;
};