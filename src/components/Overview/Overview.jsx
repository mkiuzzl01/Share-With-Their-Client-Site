import React from 'react';
import useAuth from '../../hooks/useAuth';

const Overview = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <div>
            <h1>This Overview</h1>
        </div>
    );
};

export default Overview;