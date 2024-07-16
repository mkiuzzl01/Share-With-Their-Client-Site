import React from 'react';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <div>
            <h1>This is Home Page</h1>
        </div>
    );
};

export default Home;