/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import dva from './utils/dva'
import Router from './router'
import Model from './models'

const app = dva({
  initialState: {},
  models: [...Model],
  extraEnhancers: [autoRehydrate()],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)
persistStore(app.getStore(), {
  storage: AsyncStorage,
  blacklist: ['router','test'],
})

AppRegistry.registerComponent('ComputerExam', () => App)

