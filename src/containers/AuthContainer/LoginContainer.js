import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Login from "../../screens/AuthScreen/Login";
import { requestLoginAction } from "../../modules/auth/action";

class LoginContainer extends PureComponent {
	render() {
		const { requestLoginAction, isLoading, request, error } = this.props;
		return (
			<Login
				requestLoginAction={requestLoginAction}
				isLoading={isLoading}
				request={request}
				loginError={error}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = ({ authReducer }) => {
	const { isLoading, request, error } = authReducer;
	return {
		isLoading,
		request,
		error
	};
};

const mapDispatchToProps = {
	requestLoginAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer);
