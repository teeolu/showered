import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';

import { Block, Card, Text, Icon } from '../../components';
const { width } = Dimensions.get('window');

export class SelectCategory extends Component {
    render() {
        const { styles } = this.props;
        return (
            <View style={{ width }}>

                <Card
                    title="Select a category for your market place"
                    style={[styles.margin, { marginTop: 18 }]}
                >

                    <Block row style={[styles.margin, { marginTop: 18 }]}>
                        <Card middle style={{ marginRight: 7 }}>
                            <Icon vehicle />
                            <Text paragraph onPress={this.navigateToBrowse} style={{ marginTop: 17 }}>CINEMA</Text>
                        </Card>

                        <Card middle style={{ marginLeft: 7 }}>
                            <Icon distance />
                            <Text paragraph onPress={this.navigateToBrowse} style={{ marginTop: 17 }}>RESTAURANT</Text>
                        </Card>
                    </Block>

                    <Block row style={[styles.margin, { marginTop: 18 }]}>
                        <Card middle style={{ marginRight: 7 }}>
                            <Icon vehicle />
                            <Text paragraph onPress={this.navigateToBrowse} style={{ marginTop: 17 }}>SPA</Text>
                        </Card>

                        <Card middle style={{ marginLeft: 7 }}>
                            <Icon distance />
                            <Text paragraph onPress={this.navigateToBrowse} style={{ marginTop: 17 }}>BOUTIQUE</Text>
                        </Card>
                    </Block>

                    <Block row style={[styles.margin, { marginTop: 18 }]}>
                        <Card middle style={{ marginRight: 7 }}>
                            <Icon vehicle />
                            <Text paragraph onPress={this.navigateToBrowse} style={{ marginTop: 17 }}>HOTEL</Text>
                        </Card>

                        <Card middle style={{ marginLeft: 7 }}>
                            <Icon distance />
                            <Text paragraph onPress={this.navigateToBrowse} style={{ marginTop: 17 }}>BOUTIQUE</Text>
                        </Card>
                    </Block>


                </Card>

            </View>
        )
    }
}

export default SelectCategory
