import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '../components/editor/Editor';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getKataById } from '../services/katasService';
import { Kata } from '../utils/types/Kata.type';

const KatasDetailPage = () => {
    const [kata, setKata] = useState<Kata | undefined>(undefined);
    const [showSolution, setShowSolution] = useState(false);
    let { id } = useParams();

    let loggedIn = useSessionStorage('sessionToken');
    let navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login');
        } else {
            if (id) {
                getKataById(loggedIn, id)
                    .then((res: AxiosResponse) => {
                        if (res.status === 200 && res.data) {
                            let kata: Kata = {
                                _id: res.data._id,
                                name: res.data.name,
                                description: res.data.description,
                                level: res.data.level,
                                attempts: res.data.attempts,
                                stars: res.data.stars,
                                creator: res.data.creator,
                                solution: res.data.solution,
                                participants: res.data.participants,
                            };

                            setKata(kata);
                        }
                    })
                    .catch((err) =>
                        console.log(`[Get Kata by ID] Error: ${err}`)
                    );
            } else {
                return navigate('/katas');
            }
        }
    }, [loggedIn]);

    return (
        <div>
            <h1>Katas Deatils Page: {id}</h1>
            {kata ? (
                <div>
                    <h2>{kata.description}</h2>
                    <h3>Rating: {kata.stars}/5</h3>
                    <button onClick={() => setShowSolution(!showSolution)}>
                        {showSolution ? 'Show Solution' : 'Hide Solution'}
                    </button>
                    {showSolution ? null : (
                        <Editor children={kata?.solution}></Editor>
                    )}
                </div>
            ) : (
                <div>
                    <h2>Loading data...</h2>
                </div>
            )}
        </div>
    );
};

export default KatasDetailPage;
