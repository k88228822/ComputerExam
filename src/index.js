import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import { createLogger } from 'redux-logger';
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
  // onAction: createLogger(),
})

const App = app.start(<Router />)
persistStore(app.getStore(), {
  storage: AsyncStorage,
  blacklist: ['router'],
})

AppRegistry.registerComponent('ComputerExam', () => App)

