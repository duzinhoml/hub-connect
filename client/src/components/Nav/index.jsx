import Auth from '../../utils/auth.js';

function Nav({ user }) {

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <span class="navbar-brand">HubConnect</span>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <span class="nav-link active" aria-current="page">{user.firstName} {user.lastName}</span>
                    </li>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPost">
                        Create Post
                    </button>
                </ul>
                <span class="navbar-text">
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