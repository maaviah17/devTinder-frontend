import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const Navbar = () => {

    const user = useSelector(store => store.user);
    // console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(
                BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            navigate("/login")
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <div className="navbar bg-base-200 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">
                        👨‍💻DevTinder
                    </Link>
                </div>

                {user && (
                    <div className="flex-none gap-2">
                        <div className="dropdown dropdown-end mx-5 flex px-4 m-2">
                            <p className="p-2">Welcome, {user.firstName}</p>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className=" w-10 rounded-full">
                                    <img
                                        alt="Users photo"
                                        // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                                        src={user.photoUrl}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to={"/profile"} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li>
                                    <a onClick={handleLogout}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                )}
            </div >
        </>
    )

}

export default Navbar;
