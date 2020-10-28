import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Logo from './Logo';
import RandomArc from './RandomArc';
import CenterView from '../CenterView';

storiesOf('Arc', module)
  .addDecorator((story) => <CenterView>{story() as any}</CenterView>)
  .add('Logo', () => <Logo />)
  .add('RandomArc', () => <RandomArc />);
