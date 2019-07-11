import React, { Component } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, Dimensions, View, StyleSheet, Animated } from 'react-native';

import { Block, Text, Icon, Card, Button } from '../../components';
import * as theme from '../../constants/theme';
import SelectCategory from './SelectCategory';
import AddMarketplaceInfo from './MarketPlaceInfo';
import MarketPlaceContactInfo from './MarketPlaceContactInfo';
import UploadMarketPlaceImage from './UploadMarketPlaceImage';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    overview: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colors.white,
    }
});

class MarketPlace extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeftContainerStyle: {
            paddingLeft: 24
        },
        headerRightContainerStyle: {
            paddingRight: 24
        },
        headerLeft: (
            <TouchableOpacity onPress={navigation.openDrawer}><Icon menu /></TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity><Icon notification /></TouchableOpacity>
        ),
        headerTitle: (
            <Block row middle><Text h4>Overview</Text></Block>
        )
    })

    constructor(props, context) {
        super(props);
        this.scrollView;
        this.state = {
            currentIndex: 0
        }
    }

    onScroll = event => {
        const { contentOffset } = event.nativeEvent;

        const currentIndex = Math.round(contentOffset.x / width);
    
        if (this.state.currentIndex !== currentIndex) {
          this.setState({ currentIndex })
        }
    }

    nextForm = () => {
        const { currentIndex } = this.state;
        const newIndex = currentIndex <= 2 ? currentIndex + 1 : currentIndex;

          this.scrollView.scrollTo({
            x: newIndex * width,
            animated: true
          })
    
          this.setState((prevState) => ({ currentIndex: prevState.currentIndex <= 3 ? newIndex : 3 }))
    }

    prevForm = () => {
        const newIndex = this.state.currentIndex - 1;

          this.scrollView.scrollTo({
            x: newIndex * width,
            animated: true
          })
    
          this.setState( (prevState) => ({ currentIndex: prevState.currentIndex >=0 ? newIndex : 0 }))
    }

    render() {
        return (
            <SafeAreaView style={styles.overview}>
                <ScrollView>
                <Card row middle style={styles.margin}>
                    <Block flex={1.2} center middle style={{ marginRight: 20 }}>
                        <Text light height={43} size={36} spacing={-0.45}>86</Text>
                        <Text ligth caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
                            OPERATING SCORE
                            </Text>
                    </Block>
                    <Block>
                        <Text paragraph color="black3">
                            All cars are operating well.
                            There were 1,233 trips since your last login.
                            </Text>
                    </Block>
                </Card>
                    <ScrollView 
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        ref={ref => this.scrollView = ref }
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        scrollEventThrottle={16}
                        snapToAlignment="center"
                        onScroll={this.onScroll}
                        style={{ flex: 1 }}
                    >
                        <SelectCategory styles={styles} />
                        <AddMarketplaceInfo styles={styles} />
                        <MarketPlaceContactInfo styles={styles} />
                        <UploadMarketPlaceImage styles={styles} />
                    </ScrollView>
                </ScrollView>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: theme.colors.white,
                        padding: theme.sizes.base 
                    }}
                >
                    <Button onPress={this.prevForm} style={{ backgroundColor: theme.colors.shadow, width: '40%', marginRight: theme.sizes.base }}>
                        <Text>Prev</Text>
                    </Button>
                    <Button style={{ width: '40%' }} onPress={this.nextForm}>
                        <Text>{this.state.currentIndex == 3 ? 'Submit' : 'Next'}</Text>
                    </Button>
                </View>

            </SafeAreaView>
        )
    }
}

export default MarketPlace;