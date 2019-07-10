import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CategoryDetails from '../../screens/CategoryDetails';

class CategoryDetailsContainer extends PureComponent {
    render() {
        const {} = this.props;
        return (
            <CategoryDetails {...this.props}/>
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {}
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailsContainer);