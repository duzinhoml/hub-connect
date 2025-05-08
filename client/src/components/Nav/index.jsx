import Auth from '../../utils/auth.js';

function Nav({ me }) {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand">HubConnect</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <span className="nav-link active" aria-current="page">{me.firstName} {me.lastName}</span>
                    </li>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPost">
                        Create Post
                    </button>
                </ul>
                <span className="navbar-text">
                    <button
                        className='btn btn-danger'
                        onClick={() => Auth.logout()}
                    >
                        Log Out
                    </button>
                </span>
                </div>
            </div>
        </nav>
    );
};

export default Nav;