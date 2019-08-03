import React, { PureComponent } from 'react';
import { Dimensions, View } from 'react-native';

import { Card, Box } from '../../components';
const { width } = Dimensions.get('window');

export const categoryNames = [
    {name: 'Boutique'},
    {name: 'Store'},
    {name: 'Spa'},
    {name: 'Cinema'}
]

export class SelectCategory extends PureComponent {
    render() {
        const { styles, onPress } = this.props;
        return (
            <View style={{ width }}>

                <Card
                    title="Select a category for your market place"
                    style={[styles.margin, { marginTop: 18, flex: 0 }]}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap'
                    }}>
                        {categoryNames.map(name => (
                            <Box 
                                key={name.name}
                                onPress={onPress}
                                name={name.name}/>
                        ))}
                    </View>
                </Card>

            </View>
        )
    }
}

export default SelectCategory
