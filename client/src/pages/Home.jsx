import { useState, useEffect, useLayoutEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries.js";
import Auth from "../utils/auth.js";

import Login from "../components/LoginRegister/Login.jsx";
import Dashboard from "../components/Dashboard/index.jsx";

function Home() {
    const [loginCheck, setLoginCheck] = useState(false);
    const { loading, error, data: meData } = useQuery(QUERY_ME);

    const checkLogin = () => {
        if (Auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (loginCheck) {
            if (error) {
                console.error("GraphQL Error:", error.message);
            }
        }
    }, [loginCheck, error]);

    const me = meData?.me || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        !loginCheck ? (
            <Login/>
        ) : (
            <Dashboard
                me={me}
                error={error}
            />
        )
    );
};

export default Home;