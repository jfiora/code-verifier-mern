import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '../components/editor/Editor';
import { useSessionStorage } from '../hooks/useSessionStorage';

const KatasDetailPage = () => {
    let { id } = useParams();

    let loggedIn = useSessionStorage('sessionToken');
    let navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login');
        }
    }, [loggedIn]);

    return (
        <div>
            <h1>Katas Deatils Page: {id}</h1>
            <Editor></Editor>
        </div>
    );
};

export default KatasDetailPage;
