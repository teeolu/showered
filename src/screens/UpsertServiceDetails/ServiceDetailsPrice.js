import React, { PureComponent } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Input, Card } from '../../components';

class ServiceDetailsPrice extends PureComponent {
	render() {
		const { inputInfo, blur, handleChange } = this.props;

		return (
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
				<Card
					title="SERVICE DETAILS PRICE"
					style={{ flex: 1 }}>
					<Input
						full
						blur={blur}
						inputInfo={inputInfo}
						type="price"
						value={inputInfo.price.value}
						label="Price"
						onChangeText={handleChange("price")}
						style={{ marginBottom: 25 }}/>
					<Input
						full
						blur={blur}
						inputInfo={inputInfo}
						type="delivery"
						label="Delivery service"
						value={inputInfo.delivery.value}
						onChangeText={handleChange("delivery")}
						style={{ marginBottom: 25 }}/>
				</Card>
			</KeyboardAwareScrollView>
		)
	}
}

export default ServiceDetailsPrice;