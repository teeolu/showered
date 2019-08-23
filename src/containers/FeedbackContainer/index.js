import React, { PureComponent } from "react";
import Feedback from "../../screens/Feedback";

export default class FeedbackContainer extends PureComponent {
	render() {
		return <Feedback {...this.props} />;
	}
}
