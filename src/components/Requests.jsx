import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice'

const Requests = () => {
    const requests = useSelector(store => store.request);
    const dispatch = useDispatch();

    // console.log(requests);

    const reviewRequests = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
                {}, {
                withCredentials: true,
            })

            dispatch(removeRequests(_id));

        } catch (err) {
            console.log(err.message);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received",
                { withCredentials: true }
            )

            dispatch(addRequests(res?.data?.data));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    if (!requests) return;
    if (requests.length == 0) return <h1 className='flex text-2xl text-gray-400 justify-center my-10'> No Requests Found</h1>

    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-3xl text-white'>Requests</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, gender, age, about } = request.fromUserId;

                return (
                    <div key={_id} className='flex justify-between items-center m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto'>
                        <div>
                            <img alt='photo' className='w-20 h-20 rounded-full m-2 object-contain' src={photoUrl} />
                        </div>
                        <div className='text-left mx-4 '>
                            <h1 className='font-bold text-2xl'>{firstName + " " + lastName}</h1>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div className='gap-4 items-center w-2/3 text-right'>
                            <button className=" btn btn-primary mx-2" onClick={() => reviewRequests("rejected", request._id)}>Reject</button>
                            <button className="btn btn-secondary mx-2" onClick={() => reviewRequests("accepted", request._id)}>Accept</button>
                        </div>
                    </div>
                )
            })}
        </div>
        // <div>hey</div>
    )
}

export default Requests