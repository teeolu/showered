import React, { Component } from 'react'

import Modal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import Text from './Text';
import Card from './Card';
import { theme } from '../constants';

const { height, width } = Dimensions.get('screen');

export default class SelectList extends Component {
	selectOption = (state) => () => {
		const { type, toggleModal, handleChange } = this.props;
		handleChange(type)(state);
		toggleModal();
	}
	render() {
		const { handleChange, data, isVisible, title } = this.props;
		return (
			<Modal
				isVisible={isVisible}
				useNativeDriver
				style={{
					margin: 0,
					justifyContent: 'flex-end',
					backgroundColor: theme.colors.white,
					height
				}}
				hideModalContentWhileAnimating={true}
				onBackButtonPress={handleChange}
			>
				<ScrollView>
					<Card>
						<View style={{
							flexDirection: 'column',
							borderTopLeftRadius: theme.sizes.base,
							borderTopRightRadius: theme.sizes.base,
						}}>
							<View>
								<Text 
									h4
									style={{padding: theme.sizes.base / 2}}>
									{title}</Text>
							</View>
							{
								data ?
									Object.keys(data).map((state, i) => {
										return (
											<TouchableOpacity
												key={state}
												onPress={this.selectOption(state)}
												style={{
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
													backgroundColor: i % 2 == 0 ? theme.colors.input : theme.colors.white,
													paddingHorizontal: theme.sizes.base / 2
												}}>
												<Entypo
													name='dot-single'
													size={theme.sizes.font * 3}
													color={theme.colors.shadow} />
												<Text style={{
													textTransform: 'capitalize'
												}}>{state.trim()}</Text>
											</TouchableOpacity>)
									})
									: null
							}
						</View>
					</Card>
				</ScrollView>
			</Modal>
		)
	}
}