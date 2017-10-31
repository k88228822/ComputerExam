import React, {Component} from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types'

function TabBarItem(props) {
  const selectedImage = props.selectedImage ? props.selectedImage : props.normalImage;
  return (
    <Image
      source={props.focused
        ? selectedImage
        : props.normalImage}
      style={{width: 20, height: 20, resizeMode: 'contain'}}
    />
  );
}

TabBarItem.propTypes = {
  selectedImage: PropTypes.number.isRequired,
  normalImage: PropTypes.number.isRequired,
}

TabBarItem.defaultProps = {}
export default TabBarItem;
