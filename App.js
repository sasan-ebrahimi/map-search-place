/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store/ConfigureStore';
import {PersistGate} from 'redux-persist/integration/react';
import Home from './src/screens/Home'
type Props = {};
export default class App extends Component<Props> {
    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Home/>
                </PersistGate>
            </Provider>
        );
    }
}


