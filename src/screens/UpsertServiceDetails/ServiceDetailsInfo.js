import React, { PureComponent } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Text, Input, Card } from '../../components';

class AddMarketplaceInfo extends PureComponent {
	handleText = text => () => {
		this.props.handleChange("marketPlaceName", text)
	}

	render() {
		const { handleChange, blur, inputInfo } = this.props;
		return (
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
				<Card
					title="BASIC INFORMATION"
					style={{
						flex: 1,
					}}>
					<Input
						full
						blur={blur}
						inputInfo={inputInfo}
						label="Service details name"
						value={inputInfo.serviceName.value}
						type="serviceName"
						onChangeText={handleChange('serviceName')}
						style={{ marginBottom: 25 }} />
					<Input
						full
						blur={blur}
						inputInfo={inputInfo}
						value={inputInfo.description.value}
						type="description"
						label="Description"
						multiline={true}
						onChangeText={handleChange("description")}
						style={{ marginBottom: 25, height: 200, textAlignVertical: 'top' }} />
				</Card>
			</KeyboardAwareScrollView>
		)
	}
}

export default AddMarketplaceInfo;