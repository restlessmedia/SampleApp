import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { list } from '../actions';
import { Link } from 'inferno-router';
import Modal from './Modal';

class ContactCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(contact) {
        this.props.onClick && this.props.onClick(this.props.contact);
    }

    render() {
        if (!this.props.contact) {
            return;
        }

        return (
            <div class="media-body">
                <div class="icon icon-person"></div>
                <h5 class="mt-0">{this.props.onClick ? <a href="javascript:void" onClick={this.handleClick}>{this.props.contact.fullName}</a> : this.props.contact.fullName}</h5>
                {this.props.contact.homeNumber} / {this.props.contact.mobileNumber}
            </div>
        )
    }
}

class Contacts extends Component {
    constructor(props) {
        super(props);
        if (!props.data) {
            this.props.list();
        }
        this.handleModalClose = this.handleModalClose.bind(this);
        this.view = this.view.bind(this);
        this.state = {
            contact: null,
        }
    }

    view(contact) {
        this.setState({ contact: contact });
    }

    renderItem(contact) {
        const url = `contact/${contact.contactId}`;
        return (
            <div class="media">
                <img class="mr-3" />
                <ContactCard contact={contact} onClick={this.view} />
                <button><Link to={url}>Edit</Link></button>
            </div>
        )
    }

    handleModalClose() {
        this.view(null);
    }

    render() {
        if(this.props.fetching){
            return <p>Loading...</p>;
        }
        if (!this.props.data) {
            return <p>No data</p>;
        }

        const list = Object.keys(this.props.data).map((key) => this.props.data[key]);

        return (
            <div class="contacts">
                <Modal title="View Contact" visible={this.state.contact !== null} onClose={this.handleModalClose}>
                    <ContactCard contact={this.state.contact} />
                </Modal>
                <div class="jumbotron">
                    <h1 class="display-3">All Contacts</h1>
                </div>
                {list.map(contact => this.renderItem(contact))}
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