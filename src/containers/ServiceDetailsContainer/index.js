import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ServiceDetails from "../../screens/ServiceDetails";

class ServiceDetailsContainer extends PureComponent {
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
