import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import CustomersScreen from './CustomersScreen';
import VendersScreen from './VendersScreen';
import InvoicesScreen  from './InvoicesScreen';
 
export default class Dashboard extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'customer', title: 'Customers' },
      { key: 'vender', title: 'Venders' },
    ],
    showScreen: false
  };

  toggleScreen = () => {
    console.log('123');
    this.setState({ showScreen: !this.state.showScreen })
  }

  render() {

    if (this.state.showScreen) {
      return (
        <TabView
          navigationState={this.state}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'customer':
                return <CustomersScreen toggle={this.toggleScreen} />;
              case 'vender':
                return <VendersScreen toggle={this.toggleScreen} />;
              default:
                return null;
            }
          }}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          style={styles.container}
        />
      );
    } 
    return <View><InvoicesScreen toggle={this.toggleScreen}/></View>
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});
