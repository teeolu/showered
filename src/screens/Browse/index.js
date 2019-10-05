import React, { Component } from "react";
import {
	Dimensions,
	StyleSheet,
	ScrollView,
	RefreshControl,
	StatusBar,
	SafeAreaView,
	View,
	TouchableOpacity
} from "react-native";

import CategoryItem from "./CategoryItem";
import { Text, Icon } from "../../components";
import { theme, mocks } from "../../constants";
import { categoryNames } from "../UpsertMarketPlace/SelectCategory";
import FilterDropdown from "../../components/FilterDropdown";
import SortDropdown from "../../components/SortDropdown";
import { browseStatus } from "../../modules/browse/reducers";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

class Browse extends Component {
	state = {
		isFiltering: false,
		refreshing: false,
		active: "1",
		limit: 30,
		sortBy: {},
		order: {},
		skip: 0,
		filters: {
			delivery: {},
			price: {}
		}
	};

	componentDidMount() {
		this.fetchData();
	}

	clearFilter = () => {
		this.setState(prevState => ({
			...prevState,
			isFiltering: false,
			filters: {
				delivery: {},
				price: {}
			}
		}));
	};

	fetchData = filter => {
		const { requestGetAllBrowseServiceDetailsAction } = this.props;
		const {
			active,
			limit,
			sortBy,
			order,
			skip,
			filters: { delivery, price }
		} = this.state;
		requestGetAllBrowseServiceDetailsAction({
			query: {
				limit,
				skip,
				order: order.value,
				sortBy: sortBy.value,
				filters: {
					category: active,
					delivery: delivery.value,
					price: price.value
				}
			},
			filter
		});
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.refreshing) {
			if (
				prevProps.isLoading !== this.props.isLoading &&
				!this.props.isLoading &&
				prevProps.request === browseStatus.getAllServiceDetails
			) {
				this.setState({ refreshing: false });
			}
		}
	};

	triggerFilter = () => {
		this.setState(
			{
				isFiltering: true
			},
			() => this.fetchData(true)
		);
	};

	handleTab = tab => {
		this.setState({ active: tab._id }, () => this.fetchData());
	};

	renderTab(tab) {
		const { active } = this.state;
		const isActive = active === tab._id;

		return (
			<TouchableOpacity
				key={`tab-${tab.name}`}
				onPress={() => this.handleTab(tab)}
				style={[styles.tab, isActive ? styles.active : null]}>
				<Text
					size={isActive ? 20 : 16}
					medium
					style={{
						color: isActive ? theme.colors.blue : theme.colors.gray
					}}>
					{tab.name}
				</Text>
			</TouchableOpacity>
		);
	}

	onPressFilter = (name, selected) => {
		let newState = { ...this.state };

		newState[name]
			? (newState[name] = selected)
			: (newState.filters[name] = selected);
		this.setState({
			...newState
		});
	};

	onRefresh = () => {
		this.setState({ refreshing: true });
		this.fetchData();
	};

	render() {
		const {
			navigation,
			allServiceDetailsData,
			allServiceDetailsFilterData,
			requestSetCurrentServiceDetails
		} = this.props;
		const categories = (() => {
			if (!this.state.isFiltering) {
				return allServiceDetailsData[this.state.active]
					? allServiceDetailsData[this.state.active]
					: {};
			}
			return allServiceDetailsFilterData[this.state.active]
				? allServiceDetailsFilterData[this.state.active]
				: {};
		})();

		return (
			<SafeAreaView>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh}
						/>
					}
					style={{}}>
					<StatusBar translucent {...this.props} />
					<View
						style={{
							flex: 1,
							flexDirection: "column",
							backgroundColor: theme.colors.white
						}}>
						<View
							style={{
								flex: 0.2,
								...styles.header
							}}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-end"
								}}>
								<TouchableOpacity
									style={styles.back}
									onPress={() => navigation.pop()}>
									<Ionicons
										name="ios-arrow-round-back"
										color={theme.colors.green}
										size={theme.sizes.font * 3}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										borderRadius: theme.sizes.radius,
										height: theme.sizes.base * 3,
										justifyContent: "center",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										marginVertical: theme.sizes.padding / 3
									}}>
									<Text style={{ paddingHorizontal: 10 }}>Sort</Text>
									<SortDropdown
										filters={this.state}
										onPressFilter={this.onPressFilter}
										triggerFilter={this.triggerFilter}
										clearFilter={this.clearFilter}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										borderRadius: theme.sizes.radius,
										height: theme.sizes.base * 3,
										justifyContent: "center",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										marginVertical: theme.sizes.padding / 3
									}}>
									<Text style={{ paddingHorizontal: 10 }}>Filter</Text>
									<FilterDropdown
										filters={this.state.filters}
										onPressFilter={this.onPressFilter}
										triggerFilter={this.triggerFilter}
										clearFilter={this.clearFilter}
									/>
								</TouchableOpacity>
							</View>
							<Text h1 bold>
								Browse
							</Text>
						</View>

						<View
							style={{
								shadowColor: theme.colors.black,
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.1,
								shadowRadius: 13,
								elevation: 2,
								flexDirection: "row",
								...styles.tabs
							}}>
							<ScrollView horizontal showsHorizontalScrollIndicator={false}>
								{categoryNames.map(tab => this.renderTab(tab))}
							</ScrollView>
						</View>
						<View
							style={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "space-between",
								...styles.categories
							}}>
							{Object.values(categories).map(category => {
								return (
									<CategoryItem
										category={category}
										styles={styles}
										key={category._id}
										navigation={navigation}
										requestSetCurrentServiceDetails={
											requestSetCurrentServiceDetails
										}
									/>
								);
							})}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default Browse;

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: theme.sizes.base * 2
	},
	avatar: {
		height: theme.sizes.base * 2.2,
		width: theme.sizes.base * 2.2
	},
	tabs: {
		borderBottomColor: theme.colors.gray2,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginVertical: theme.sizes.base,
		marginHorizontal: theme.sizes.base * 2
	},
	tab: {
		marginRight: theme.sizes.base * 2,
		paddingBottom: theme.sizes.base
	},
	active: {
		borderBottomColor: theme.colors.lightblue,
		borderBottomWidth: 3
	},
	categories: {
		flexWrap: "wrap",
		paddingHorizontal: theme.sizes.base * 2,
		marginBottom: theme.sizes.base * 3.5
	},
	category: {
		// this should be dynamic based on screen width
		minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
		maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
		maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
	}
});
