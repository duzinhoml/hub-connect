import Auth from '../../utils/auth.js';
import { getCurrentDate } from './currentDate.js';

import './index.css';
import '../../App.css';

function Nav() {

    return (
        <div className="container-fluid px-0">
            <div 
                className=" d-flex align-items-center justify-content-between pt-2 mx-2 border-top-0 border-start-0 border-end-0" 
                style={{ borderStyle: 'double', borderWidth: '7px' }}
            >
                <span className='ms-2 px-2 py-1' style={{ color: '#533b30', border: '2px solid #533b30', fontSize: '14px', fontWeight: 600 }}>
                    Page 1
                </span>
                <span
                    id="header"
                    className='fs-1'
                >
                    HubConnect
                </span>
                <span className='me-2'>
                    <button 
                        type="button"
                        className="btn btn-sm rounded-0 border-2 lightColor"
                    >
                        Settings
                    </button>
                </span>
            </div>
            <div 
                className='row mx-2 my-3 p-2'
                style={{ backgroundColor: '#533b30', color: '#d3c2aa'}}
            >
                <span className='text-start col p-0 align-content-center'>
                    <button 
                        type="button" 
                        className="btn btn-sm rounded-0 border-2 darkColor" 
                        data-bs-toggle="modal" 
                        data-bs-target="#createPost"
                    >
                        Create Post
                    </button>
                </span>
                <span className='text-center col p-0 align-content-center'>{getCurrentDate()}</span>
                <span className='text-end col p-0 align-content-center'>
                    <button
                        className='btn btn-sm rounded-0 border-2 darkColor'
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