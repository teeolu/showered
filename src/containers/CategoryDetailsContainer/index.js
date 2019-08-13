import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CategoryDetails from '../../screens/CategoryDetails';

class CategoryDetailsContainer extends PureComponent {
    render() {
        const { userdata } = this.props;
        return (
            <CategoryDetails 
                userdata={userdata}
                {...this.props}/>
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        userdata: authReducer.userdata
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailsContainer);