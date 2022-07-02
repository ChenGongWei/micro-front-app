import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: "pink" }}>
            <h1>我是Home页</h1>
            <div
                onClick={() => {
                    navigate("/vue");
                }}
            >
                打开微应用
            </div>
        </div>
    );
};

export default Home;
