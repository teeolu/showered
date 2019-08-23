import React, { PureComponent } from "react";
import MarketPlaceSetting from "../../screens/MarketPlaceSettings";

class MarketPlaceSettingsContainer extends PureComponent {
	render() {
		return <MarketPlaceSetting {...this.props} />;
	}
}

export default MarketPlaceSettingsContainer;
