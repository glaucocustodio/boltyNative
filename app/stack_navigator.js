import { StackNavigator } from 'react-navigation';
import Login from './components/login';
import Sets from './components/sets';
import Cards from './components/cards';

export const Nav = StackNavigator({
  Main: { screen: Login },
  Sets: { screen: Sets },
  Cards: { screen: Cards },
});
