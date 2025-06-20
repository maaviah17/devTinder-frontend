import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (userData) return;
        try {
            const user = await axios.get(
                BASE_URL + "/profile/view", {
                withCredentials: true,
            })

            dispatch(addUser(user.data));

        }
        catch (err) {
            navigate("/login");
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body;