import Auth from '../../utils/auth.js';
import { getCurrentDate } from './currentDate.js';

import './index.css';

function Nav() {

    return (
        <div className="container-fluid px-0">
            <div className="text-center p-2 pb-0">
                <span
                    id="header"
                    className='border-top-0 border-start-0 border-end-0 fs-1 d-block'
                    style={{ borderStyle: 'double', borderWidth: '7px' }}
                >HubConnect</span>
            </div>
            <div 
                className='row mx-2 my-3 p-2'
                style={{ backgroundColor: '#533b30', color: '#d3c2aa'}}
            >
                <span className='text-start col p-0 align-content-center'>
                    <button 
                        type="button" 
                        className="btn btn-sm rounded-0 border-2" 
                        style={{ color: '#d3c2aa', borderColor: '#d3c2aa', fontWeight: 600 }}
                        data-bs-toggle="modal" 
                        data-bs-target="#createPost"
                    >
                        Create Post
                    </button>
                </span>
                <span className='text-center col p-0 align-content-center'>{getCurrentDate()}</span>
                <span className='text-end col p-0 align-content-center'>
                    <button
                        className='btn btn-sm rounded-0 border-2'
                        style={{ color: '#d3c2aa', borderColor: '#d3c2aa', fontWeight: 600 }}
                        onClick={() => Auth.logout()}
                    >
                        Log Out
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Nav;