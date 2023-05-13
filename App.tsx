import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import AppContainer from './src/navigators';
import SplashScreen from 'react-native-splash-screen'; //import SplashScreen
import ThemeProvider from './src/theme/ThemeProvider';

import {urls} from './src/api/urls';
import services from './src/api/services';

function App() {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    services
      .base_service(urls.products_category, {category_id: 255})
      .then(response => {
        console.log(JSON.stringify(response, null, 2));
        // setCategories(response);
      })
      .catch(error => {
        console.log('Fetching error: ', error);
      });
  };

  // const fetchTopics = () => {
  //   // (topicId, setTopicListData)
  //   services
  //     .base_service(urls.get_topics_by_category, {category_id: topicId})
  //     .then(response => {
  //       console.log(response);
  //       // setTopicListData(response);
  //     })
  //     .catch(error => {
  //       console.log('Fetching error: ', error);
  //     });
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        // marginHorizontal: 0,
        // position:'absolute',
        // top: 40, bottom: 0, left: 0, right: 0, height: '100%', width: '100%',
        // marginBottom: -36,
        // marginTop: Platform.OS === 'android' ? -12 : 0,
      }}>
      <StatusBar
        hidden={false}
        backgroundColor={'#FFFFFF'}
        barStyle={'dark-content'}
      />
      <ThemeProvider>
        <AppContainer />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
