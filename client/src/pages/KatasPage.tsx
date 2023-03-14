import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';

const KatasPage = () => {
    let loggedIn = useSessionStorage('sessionToken');
    let navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login');
        }
    }, [loggedIn]);

    const navigateToKataDetail = (id: number) => {
        navigate(`/katas/${id}`);
    };

    return (
        <div>
            <h1>Katas Page</h1>
            <ul>
                <li onClick={() => navigateToKataDetail(1)}>First Kata</li>
                <li onClick={() => navigateToKataDetail(2)}>Second Kata</li>
            </ul>
        </div>
    );
};

export default KatasPage;
