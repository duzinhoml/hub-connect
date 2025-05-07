import Nav from '../Nav/index.jsx'
import Feed from '../Feed/index.jsx'

function Dashboard({ user, error }) {

    return (
        <div>
            <Nav user={user}/>
            <Feed user={user} error={error}/>
        </div>
    );
};

export default Dashboard;