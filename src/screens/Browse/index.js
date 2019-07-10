import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, FlatList, ScrollView, View, TouchableOpacity } from 'react-native';

import CategoryItem from './CategoryItem';
import { Text, Icon } from '../../components';
import { theme, mocks } from '../../constants';

const { width } = Dimensions.get('window');

class Browse extends Component {
  static navigationOptions = {
    headerLeftContainerStyle: {
      paddingLeft: 24
    },
    headerLeft: (
      <TouchableOpacity><Icon menu /></TouchableOpacity>
    )
  }
  
  state = {
    active: 'Restaurants',
    categories: [],
  }

  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }

  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(
      category => category.tags.includes(tab)
    );

    this.setState({ active: tab, categories: filtered });
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;
    const tabs = ['Restaurants', 'Cinema', 'Boutiques', 'Spa', 'Stores'];

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colors.white,
      }}>
        <View style={{ flex: .3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...styles.header }}>
          <Text h1 bold>Browse</Text>
          <TouchableOpacity
            style={{
              borderRadius: theme.sizes.radius,
              height: theme.sizes.base * 3,
              justifyContent: 'center',
              marginVertical: theme.sizes.padding / 3,
            }}
            activeOpacity={0.8}
          >
            <Image
              source={profile.avatar}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>


        <View style={{
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 13,
          elevation: 2, flexDirection: 'row', ...styles.tabs
        }}>
          <ScrollView horizontal>
            {tabs.map(tab => this.renderTab(tab))}
          </ScrollView>
        </View>


        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1
          }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            ...styles.categories
          }}>
            {categories.map(category => (
                <CategoryItem  
                  category={category} 
                  styles={styles}
                  key={category.id}
                  navigation={navigation}
                  active={this.state.active}/>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
  }
})
