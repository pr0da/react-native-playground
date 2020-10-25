import React from 'react';
import { View } from 'react-native';
import style from './style';

function CenterView(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  return <View style={style.main}>{children}</View>;
}

export default CenterView;
