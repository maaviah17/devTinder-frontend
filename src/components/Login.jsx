import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState();
    const [password, setPassword] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {

        try {

            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            )

            dispatch(addUser(res.data.data));
            return navigate("/profile")

        } catch (err) {
            setError(err?.response?.data || "something terribly went wrong ;( ")
            console.log(err);
        }
    }


    const handleLogin = async () => {

        try {
            const res = await axios.post(
                BASE_URL + "/login", {
                emailId,
                password
            }, { withCredentials: true });
            // console.log(res.data);
            dispatch(addUser(res.data))
            return navigate("/");
        } catch (err) {
            setError(err?.response?.data || "something went wrong ;( ");
            console.log(err);
        }

    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        {isLoginForm ? "Login" : "Signup"}
                    </h2>
                    <div>
                        {!isLoginForm && (
                            <>
                                <span className="label label-text">First Name</span>
                                <label className="input validator my-2 ">

                                    <input type="name" className="text-white" value={firstName} placeholder="Jorges" required
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </label>

                                <span className="label label-text">Last Name</span>
                                <label className="input validator my-2 ">

                                    <input type="name" className="text-white" value={lastName} placeholder="Martinez" required
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>

                            </>)}
                        <span className="label label-text">Email ID</span>
                        <label className="input validator my-2 ">

                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>

                            <input type="email" className="text-white" value={emailId} placeholder="mail@site.com" required
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </label>
                        < div className="validator-hint hidden">Enter valid email address</div>

                        <span className="label label-text mt-2">Password</span>
                        <label className="input validator my-2 flex items-center justify-between pr-3">
                            <svg
                                className="h-[1em] opacity-50 ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>

                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Password"
                                className="text-white bg-transparent w-full ml-2"
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-white"
                            >
                                {showPassword ? (
                                    // Eye-off icon (hide)
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.477-6.625M6.343 6.343A10.05 10.05 0 0112 5c5.523 0 10 4.477 10 10a9.96 9.96 0 01-2.477 6.625M6.343 6.343L17.657 17.657"
                                        />
                                    </svg>
                                ) : (
                                    // Eye icon (show)
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </label>

                        <p className="text-red-500">
                            {error}
                            {/* Must be more than 8 characters, including
                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter */}
                        </p>
                    </div>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>
                            {isLoginForm ? "Login" : "Signup"}
                        </button>
                    </div>
                    <p className="hover:underline text-blue-300 cursor-pointer m-auto" onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm
                            ? "New User? Signup here"
                            : "Existing User? Login here"
                        }
                    </p>
                </div>
            </div>
        </div >
    )
}

export default Login