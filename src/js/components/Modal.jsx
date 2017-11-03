import Inferno from 'inferno';
import Component from 'inferno-component';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({ visible: false });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({ visible: nextProps.visible });
        }
    }

    componentDidUpdate() {
        if (this.state.visible) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }

    render() {
        const className = `modal ${this.state.visible ? 'show' : 'null'}`;
        return (
            <div class={className}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            {this.props.title ? <h5 class="modal-title">{this.props.title}</h5> : null}
                            <button type="button" class="close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {this.props.children}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={this.close}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}