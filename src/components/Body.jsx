import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {

        try {
            const user = await axios.get(
                BASE_URL + "/profile/view", {
                withCredentials: true,
            })

            dispatch(addUser(user.data));

        }
        catch (err) {
            dispatch(removeUser());
            if (err.status == 401) {
                navigate("/login");
            }
            // dispatch(removeUser());
            console.log(err + "somethings not right");
        }
    };

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Body;