import Nav from '../Nav/index.jsx'
import Feed from '../Feed/index.jsx'

function Dashboard({ me, users, error }) {

    return (
        <div>
            <Nav me={me}/>
            <Feed me={me} users={users} error={error}/>
        </div>
    );
};

export default Dashboard;