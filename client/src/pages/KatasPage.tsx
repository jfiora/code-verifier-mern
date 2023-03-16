import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllKatas } from '../services/katasService';
import { Kata } from '../utils/types/Kata.type';

const KatasPage = () => {
    const [katas, setKatas] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    let loggedIn = useSessionStorage('sessionToken');
    let navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login');
        } else {
            getAllKatas(loggedIn, 4, currentPage)
                .then((res: AxiosResponse) => {
                    if (
                        res.status === 200 &&
                        res.data.katas &&
                        res.data.totalPages &&
                        res.data.currentPage
                    ) {
                        console.table(res.data);
                        let { katas, totalPages, currentPage } = res.data;
                        setKatas(katas);
                        setTotalPages(totalPages);
                        setCurrentPage(currentPage);
                    } else {
                        throw new Error(`Error obtaining katas: ${res.data}`);
                    }
                })
                .catch((err) => console.log(`[Get all katas] Error: ${err}`));
        }
    }, [loggedIn]);

    const navigateToKataDetail = (id: number) => {
        navigate(`/katas/${id}`);
    };

    return (
        <div>
            <h1>Katas Page</h1>

            {katas.length > 0 ? (
                <div>
                    {katas.map((kata: Kata) => (
                        <div key={kata._id}>
                            <h3 onClick={() => navigateToKataDetail(kata._id)}>
                                {kata.name}
                            </h3>
                            <h4>{kata.description}</h4>
                            <h5>Creator: {kata.creator}</h5>
                            <p>Rating: {kata.stars}/5</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h5>No katas found</h5>
                </div>
            )}
        </div>
    );
};

export default KatasPage;
