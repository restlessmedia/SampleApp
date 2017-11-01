import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div class="container">
                <header class="header clearfix">
                    <nav>
                        <ul class="nav nav-pills float-right">
                            <li class="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>
                    </nav>
                    <h3 class="text-muted">Address Book</h3>
                </header>
                <main role="main">
                    {this.props.children}
                </main>
                <footer class="footer">
                    <p>&copy; Company 2017</p>
                </footer>
            </div>
        )
    }
}