import React from 'react';
import HeadView from "../common/HeadView";
import {Text} from "react-native";
import PropTypes from 'prop-types'
import ReturnButton from "../common/ReturnButton";

function Head(props) {

  function renderHeaderTitle(){
    return (
      <Text style={{fontWeight: 'bold'}}>{props.title}</Text>
    );
  }

  function renderHeaderLeft() {
    return (
      <ReturnButton onClick={props.onReturnClick}/>
    );
  }

  return (
    <HeadView
      title={renderHeaderTitle}
      headLeft={renderHeaderLeft}
    />
  );
}
Head.propTypes={
  title: PropTypes.string.isRequired,
  onReturnClick:PropTypes.func
}
Head.defaultProps={
}

export default Head;