import Nav from '../Nav/index.jsx'
import Feed from '../Feed/index.jsx'

function Dashboard({ me, error }) {

    return (
        <div>
            <Nav/>
            <Feed me={me} error={error}/>
        </div>
    );
};

export default Dashboard;