import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { getById, save } from '../actions';
import { Link } from 'inferno-router';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = props && props.data ? props.data : {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (+this.props.params.id && !this.props.data) {
            this.props.getById(this.props.params.id);
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState(newProps.data);
    }

    getChangeHandler(name) {
        return e => {
            if ('value' in e.currentTarget) {
                this.setState({ [name]: e.currentTarget.value });
            }
        }
    }

    save() {
        this.props.save(this.state, this.props.params.id);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.save();
    }

    render() {
        if (this.props.fetching === true) {
            return <div>Loading</div>;
        }
        return (
            <div>
                <div class="jumbotron">
                    <h1 class="display-3">{this.state.fullName}</h1>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" class="form-control" placeholder="Name" value={this.state.fullName} onKeyUp={this.getChangeHandler('fullName')} required autofocus />
                            <label for="homeNumber">Home Number</label>
                            <input type="text" id="homeNumber" class="form-control" placeholder="Home Number" value={this.state.homeNumber} onKeyUp={this.getChangeHandler('homeNumber')} required />
                            <label for="mobileNumber">Mobile Number</label>
                            <input type="text" id="mobileNumber" class="form-control" placeholder="Mobile Number" value={this.state.mobileNumber} onKeyUp={this.getChangeHandler('mobileNumber')} required />
                            <br /><br />
                            <button class="btn btn-lg btn-primary" type="submit">Save</button> <Link to="/contact">Back</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state, props) {
    return {
        data: state.contacts && state.contacts[props.params.id],
        fetching: state.fetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getById: id => dispatch(getById(id)),
        save: (model, id) => {
            dispatch(save(model, id))
                .then(() => alert('Contact saved'))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)