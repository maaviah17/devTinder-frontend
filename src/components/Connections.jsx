import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {

    const connections = useSelector(store => store.connection);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(res.data.data);
            dispatch(addConnections(res.data.data))
        } catch (err) {
            console.log(err.message);
        }

    }

    useEffect(() => {
        fetchConnections();
    }, [])

    console.log(connections);

    if (!connections) return;
    if (connections.length == 0) {
        return <h1>No Connections Found</h1>
    }


    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-3xl text-white'>Connections</h1>
            {connections.map(connection => {
                const { firstName, lastName, photoUrl, gender, age, about } = connection;

                return (
                    <div className='flex m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto'>
                        <div>
                            <img alt='photo' className='w-20 h-20 rounded-full m-2' src={photoUrl} />
                        </div>
                        <div className='text-left mx-4 '>
                            <h1 className='font-bold text-2xl'>{firstName + " " + lastName}</h1>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        // <div>hey</div>
    )
}

export default Connections