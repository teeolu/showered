import React, { Component } from 'react'
import { StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { theme } from '../../constants';
import { articlesInfo } from '../../constants/mocks';
import { Card, Block, Text } from '../../components';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        // backgroundColor: 'transparent',
        paddingHorizontal: theme.sizes.padding,
        paddingTop: theme.sizes.padding,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    back: {
        width: theme.sizes.base * 3,
        height: theme.sizes.base * 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    content: {
        // backgroundColor: theme.colors.active,
        // borderTopLeftRadius: theme.sizes.border,
        // borderTopRightRadius: theme.sizes.border,
    },
    contentHeader: {
        backgroundColor: 'transparent',
        padding: theme.sizes.padding,
        backgroundColor: theme.colors.white,
        borderTopLeftRadius: theme.sizes.border,
        borderTopRightRadius: theme.sizes.border,
        marginTop: -theme.sizes.padding / 2,
    },
    avatar: {
        position: 'absolute',
        top: -theme.sizes.margin,
        right: theme.sizes.margin,
        width: theme.sizes.padding * 2,
        height: theme.sizes.padding * 2,
        borderRadius: theme.sizes.padding,
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    dotsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 36,
        right: 0,
        left: 0
    },
    dots: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 6,
        backgroundColor: theme.colors.gray,
    },
    title: {
        fontSize: theme.sizes.font * 2,
        fontWeight: 'bold'
    },
    description: {
        fontSize: theme.sizes.font * 1.2,
        lineHeight: theme.sizes.font * 2,
        color: theme.colors.caption
    },
    driver: {
      marginBottom: 11,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    }
});

class CategoryDetails extends Component {
    scrollX = new Animated.Value(0);

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <View style={[styles.flex, styles.row, styles.header]}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <FontAwesome name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="more-horiz" color={theme.colors.white} size={theme.sizes.font * 1.5} />
                    </TouchableOpacity>
                </View>
            ),
            headerTransparent: true,
        }
    }

    renderDots = () => {
        const { navigation } = this.props;
        const article = articlesInfo[0] // navigation.getParam('article');
        const dotPosition = Animated.divide(this.scrollX, width);

        return (
            <View style={[styles.flex, styles.row, styles.dotsContainer]}>
                {article.images.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp'
                    });
                    return (
                        <Animated.View
                            key={`step-${item}-${index}`}
                            style={[styles.dots, { opacity }]}
                        />
                    )
                })}
            </View>
        )
    }

    renderRatings = (rating) => {
        const stars = new Array(5).fill(0);
        return (
            stars.map((_, index) => {
                const activeStar = Math.floor(rating) >= (index + 1);
                return (
                    <FontAwesome
                        name="star"
                        key={`star-${index}`}
                        size={theme.sizes.font}
                        color={theme.colors[activeStar ? 'active' : 'gray']}
                        style={{ marginRight: 4 }}
                    />
                )
            })
        )
    }

    render() {
        const { navigation } = this.props;
        const article = articlesInfo[0] // navigation.getParam('article');

        return (
            <ScrollView>
                <View style={styles.flex}>
                    <View style={[styles.flex]}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            scrollEnabled
                            showsHorizontalScrollIndicator={false}
                            decelerationRate={0}
                            scrollEventThrottle={16}
                            snapToAlignment="center"
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
                        >
                            {
                                article.images.map((img, index) =>
                                    <Image
                                        key={`${index}-${img}`}
                                        source={{ uri: img }}
                                        resizeMode='cover'
                                        style={{ width, height: width }}
                                    />
                                )
                            }
                        </ScrollView>
                        {this.renderDots()}
                    </View>
                    <View style={[styles.flex, styles.content]}>
                        <View style={[styles.flex, styles.contentHeader]}>
                            <Image style={[styles.avatar, styles.shadow]} source={{ uri: article.user.avatar }} />
                            <Text style={styles.title}>{article.title}</Text>
                            <View style={[
                                styles.row,
                                { alignItems: 'center', marginVertical: theme.sizes.margin / 2 }
                            ]}>
                                {this.renderRatings(article.rating)}
                                <Text style={{ color: theme.colors.active }}>
                                    {article.rating}
                                </Text>
                                <Text style={{ marginLeft: 8, color: theme.colors.caption }}>
                                    ({article.reviews} reviews)
              </Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.description}>
                                    {article.description.split('').slice(0, 180)}...
                <Text style={{ color: theme.colors.active }}> Read more</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Card
                            title="Our menus"
                            style={[styles.margin, { marginTop: 18 }]}
                        >
                            <Block style={styles.driver}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Block row center>
                                        <Block>
                                            <Image
                                                style={styles.avatar}
                                                source={{ uri: 'https://images.unsplash.com/photo-1506244856291-8910ea843e81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }}
                                            />
                                        </Block>
                                        <Block flex={2}>
                                            <Text h4>Grand Tesoro</Text>
                                            <Text paragraph color="gray">Chevrolet Bolt</Text>
                                        </Block>
                                        <Block>
                                            <Text paragraph right color="black">$6,432</Text>
                                            <Text paragraph right color="gray">1,232 miles</Text>
                                        </Block>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                            <Block style={styles.driver}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Block row center>
                                        <Block>
                                            <Image
                                                style={styles.avatar}
                                                source={{ uri: 'https://images.unsplash.com/photo-1521657249896-063c0c611fe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }}
                                            />
                                        </Block>
                                        <Block flex={2}>
                                            <Text h4>Invision App</Text>
                                            <Text paragraph color="gray">Tesla Model X</Text>
                                        </Block>
                                        <Block>
                                            <Text paragraph right color="black">$6,432</Text>
                                            <Text paragraph right color="gray">1,232 miles</Text>
                                        </Block>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                            <Block style={styles.driver}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Block row center>
                                        <Block>
                                            <Image
                                                style={styles.avatar}
                                                source={{ uri: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }}
                                            />
                                        </Block>
                                        <Block flex={2}>
                                            <Text h4>React UI Kit</Text>
                                            <Text paragraph color="gray">Volvo Intellisafe</Text>
                                        </Block>
                                        <Block>
                                            <Text paragraph right color="black">$6,432</Text>
                                            <Text paragraph right color="gray">1,232 miles</Text>
                                        </Block>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                            <Block style={styles.driver}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Block row center>
                                        <Block>
                                            <Image
                                                style={styles.avatar}
                                                source={{ uri: 'https://images.unsplash.com/photo-1506244856291-8910ea843e81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }}
                                            />
                                        </Block>
                                        <Block flex={2}>
                                            <Text h4>Grand Tesoro</Text>
                                            <Text paragraph color="gray">Chevrolet Bolt</Text>
                                        </Block>
                                        <Block>
                                            <Text paragraph right color="black">$6,432</Text>
                                            <Text paragraph right color="gray">1,232 miles</Text>
                                        </Block>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                            <Block style={styles.driver}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Block row center>
                                        <Block>
                                            <Image
                                                style={styles.avatar}
                                                source={{ uri: 'https://images.unsplash.com/photo-1521657249896-063c0c611fe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }}
                                            />
                                        </Block>
                                        <Block flex={2}>
                                            <Text h4>Invision App</Text>
                                            <Text paragraph color="gray">Tesla Model X</Text>
                                        </Block>
                                        <Block>
                                            <Text paragraph right color="black">$6,432</Text>
                                            <Text paragraph right color="gray">1,232 miles</Text>
                                        </Block>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                            <Block style={styles.driver}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Block row center>
                                        <Block>
                                            <Image
                                                style={styles.avatar}
                                                source={{ uri: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }}
                                            />
                                        </Block>
                                        <Block flex={2}>
                                            <Text h4>React UI Kit</Text>
                                            <Text paragraph color="gray">Volvo Intellisafe</Text>
                                        </Block>
                                        <Block>
                                            <Text paragraph right color="black">$6,432</Text>
                                            <Text paragraph right color="gray">1,232 miles</Text>
                                        </Block>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                        </Card>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default CategoryDetails;