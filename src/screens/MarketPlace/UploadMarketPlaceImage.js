import React, { Component } from 'react';
import { Dimensions, View, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { Card, Icon } from '../../components';
import { theme, mocks } from '../../constants';
const { width } = Dimensions.get('window');

export class UploadMarketPlaceImage extends Component {
    render() {
        const { styles } = this.props;
        const category = mocks.categories[0];
        return (
            <View style={{ width }}>

                <Card
                    title="UPLOAD IMAGES FOR YOUR MARKET PLACE"
                    style={{ marginTop: 18, flex: 0 }}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                        <View
                            style={{
                                borderRadius: theme.sizes.radius,
                                backgroundColor: theme.colors.white,
                                shadowColor: theme.colors.shadow,
                                shadowOpacity: 1,
                                shadowRadius: 10,
                                shadowOffset: { width: 0, height: 0 },
                                elevation: 2,
                                marginBottom: theme.sizes.base,
                                minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
                                maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
                                maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
                            }}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                borderRadius: theme.sizes.border,
                                borderRadius: theme.sizes.border,
                            }}>
                                <Entypo 
                                    name="images" 
                                    color={theme.colors.shadow} 
                                    size={theme.sizes.font * 3} />
                            </View>
                        </View>

                        <View
                            style={{
                                borderRadius: theme.sizes.radius,
                                backgroundColor: theme.colors.white,
                                shadowColor: theme.colors.shadow,
                                shadowOpacity: 1,
                                shadowRadius: 10,
                                shadowOffset: { width: 0, height: 0 },
                                elevation: 2,
                                marginBottom: theme.sizes.base,
                                minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
                                maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
                                maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
                            }}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}>
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: theme.sizes.radius,
                                    }}
                                    source={{ uri: `https://source.unsplash.com/1600x900/?${category.name}` }} />
                            </View>
                        </View>

                    </View>
                </Card>

            </View>
        )
    }
}

export default UploadMarketPlaceImage;
