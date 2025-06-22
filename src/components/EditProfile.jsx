import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    const saveProfile = async () => {

        // clear the errors 
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    gender,
                    age,
                    about
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data))
            setShowToast(true)

            const i = setTimeout(() => {
                setShowToast(false)
            }, 3000);

            console.log(res);
        } catch (err) {
            setError(err?.data?.response);
        }

    }

    return (
        <>

            <div className="flex justify-center m-10 ">

                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile </h2>
                            <div>
                                <span className="label label-text">First Name</span>
                                <label className="input validator my-2 ">
                                    <input type="email" className="text-white" value={firstName} placeholder="mail@site.com" required
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </label>

                                <span className="label label-text">Last Name</span>
                                <label className="input validator my-2 ">
                                    <input type="email" className="text-white" value={lastName} placeholder="mail@site.com" required
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>

                                <span className="label label-text">Photo Url</span>
                                <label className="input validator my-2 ">
                                    <input type="email" className="text-white" value={photoUrl} placeholder="mail@site.com" required
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </label>

                                <span className="label label-text">Age</span>
                                {/* <label className="input validator my-2 ">
                                    <input type="email" className="text-white" value={age} placeholder="" required
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </label> */}
                                <input
                                    type="number"
                                    className="input validator"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                    placeholder="select age"
                                    min="18"
                                    max="50"
                                    title="18+"
                                />
                                <p className="validator-hint">Must be between be 1 to 10</p>

                                {/* <span className="label label-text">Gender</span> */}
                                <span className="label label-text">Gender</span>
                                <label className="input validator my-2">
                                    <select
                                        className="text-white bg-transparent w-full"
                                        value={gender}
                                        required
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="" className="text-black" disabled>Select gender</option>
                                        <option value="male" className="text-black">male</option>
                                        <option value="female" className="text-black">female</option>
                                    </select>
                                </label>


                                <span className="label label-text">{error?.status}</span>

                                {/* <span className="label label-text">About</span>  */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">About</legend>
                                    <textarea className="textarea h-24" placeholder="Bio"></textarea>
                                    <div className="label">Optional</div>
                                </fieldset>

                            </div>
                            <div className="card-actions justify-center m-2">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-center bg-base-300  p-5 items-center">
                    <p className="text-center font-semibold text-pink-400 text-[18px] mb-2">
                        Real-time changes below
                    </p>
                    <UserCard user={{ firstName, lastName, photoUrl, gender, age, about }} />
                </div>
            </div>
            {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>)}

        </>
    )
}

export default EditProfile