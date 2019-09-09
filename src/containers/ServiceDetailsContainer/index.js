import React, { Component } from "react";
import { connect } from "react-redux";
import ServiceDetails from "../../screens/ServiceDetails";

class ServiceDetailsContainer extends Component {
	render() {
		const { userdata } = this.props;
		return <ServiceDetails userdata={userdata} {...this.props} />;
	}
}

const mapStateToProps = ({ authReducer }) => {
	return {
		userdata: authReducer.userdata
	};
};

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ServiceDetailsContainer);
