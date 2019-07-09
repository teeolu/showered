import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native'

import { Text } from '../../components';
import { theme } from '../../constants';

export default CategoryItem = ({ category, styles, active }) => (
    <TouchableOpacity
      key={category.name}
    >
      <View shadow style={{
        borderRadius: theme.sizes.radius,
        backgroundColor: theme.colors.white,
  
        shadowColor: theme.colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2,
        marginBottom: theme.sizes.base,
        ...styles.category
      }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '65%',
          borderRadius: theme.sizes.border,
          borderRadius: theme.sizes.border,
        }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden'
            }}
            source={{ uri: `https://source.unsplash.com/1600x900/?${active}` }} />
        </View>
        <View style={{
          padding: theme.sizes.base / 2
        }}>
          <Text h4 medium>{category.name}</Text>
          <Text gray caption>{category.count} products</Text>
        </View>
      </View>
    </TouchableOpacity>
  )