import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { list } from '../actions';
import { Link } from 'inferno-router';

class Contacts extends Component {
    constructor(props) {
        super(props);

        if (!props.data) {
            this.props.list();
        }
    }

    renderItem(contact) {
        const url = `contact/${contact.contactId}`;
        return (
            <div class="media">
                <img class="mr-3" />
                <div class="media-body">
                    <h5 class="mt-0">{contact.fullName}</h5>
                    {contact.homeNumber} / {contact.mobileNumber}
                    <p><Link to={url}>Edit</Link></p>
                </div>
            </div>
        )
    }

    render() {
        if (!this.props.data) {
            return <p>No data</p>;
        }

        const list = Object.keys(this.props.data).map((key) => this.props.data[key]);

        return (
            <div class="contacts">
                <div class="jumbotron">
                    <h1 class="display-3">All Contacts</h1>
                </div>
                {list.map(this.renderItem)}
            </div>
        );
    }
}

const mapStateToProps = function (state, props) {
    return {
        data: state.contacts,
        fetching: state.fetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        list: () => dispatch(list())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)