import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Logo from './Logo';
import RandomArc from './RandomArc';
import Donut from './Donut';
import Slider from './Slider';
import Stopwatch from './Stopwatch';
import CenterView from '../CenterView';
import Progress from './Progress';

storiesOf('Arc', module)
  .addDecorator((story) => <CenterView>{story() as any}</CenterView>)
  .add('Logo', () => <Logo />)
  .add('RandomArc', () => <RandomArc />)
  .add('Donut', () => <Donut />)
  .add('Slider', () => <Slider />)
  .add('Stopwatch', () => <Stopwatch />)
  .add('Progress', () => <Progress />);
