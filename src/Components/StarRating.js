import React from 'react'
import { default as RNStarRating } from 'react-native-star-rating';
import COLORS from '../Constants/Colors';

const StarRating = (props) => {
  return (
    <RNStarRating
      fullStarColor={COLORS.yellow700}
      animation='bounce'
      {...props}
    />
  )
}

export default StarRating
