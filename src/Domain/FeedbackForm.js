import React, { useState, useEffect } from 'react'

import { View, Text, ImagePicker, Input } from '../Components'

const FeedbackForm = ({ onChangeData }) => {
  const [remarks, setRemarks] = useState('')
  const [images, setImages] = useState([])

  const onUpdateMedia = (media) => {
    setImages(media.map(({ uri }) => uri))
  }

  useEffect(() => {
    onChangeData({ remarks, images })
  }, [remarks, images])

  return (
    <View marginT-32 marginB-96>
      <View paddingH-16>
        <Input
          placeholder='Describe damages'
          placeholderTextColor='white'
          multiline
          numberOfLines={10}
          style={{ textAlignVertical: 'top' }}
          onChangeText={setRemarks}
        />
      </View>
      <View marginT-16>
        <View paddingH-16>
          <Text footnote>For reporting damages, you may attach upto 5 images and / or videos.</Text>
        </View>
        <View marginT-8>
          <ImagePicker initialItems={[]} onChange={onUpdateMedia} />
        </View>
      </View>
    </View>
  )
}

export default FeedbackForm
