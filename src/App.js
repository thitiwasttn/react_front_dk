import {connect} from 'react-redux';
import './App.css';

function App(props) {
    console.log(props.tokenStore);
    return (
        <div>
            <h1>1</h1>
        </div>
    );
}

const mapStateToProps = state => {
    console.log(state);
    return {
        tokenStore: state.tokenReducer
    }
}

export default connect(mapStateToProps, null)(App);
