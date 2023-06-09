import React from "react"
import MyMap from "../components/MyMap/MyMap"
import Sidebar from "../components/Sidebar/Sidebar"
import Loader from "../components/Loader/Loader"

const Home = () => {
    return (
        <div>
            <Sidebar/>
            <MyMap/>
            <Loader/>
        </div>
    );
};

export default Home
