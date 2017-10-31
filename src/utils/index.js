import {Dimensions,PixelRatio,Platform}from 'react-native'
export { NavigationActions } from 'react-navigation'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

export default ScreenSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
};

export const System={
  isIOS: Platform.OS === 'ios',
}
