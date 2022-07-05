import React from "react"
import { BrowserRouter } from "react-router-dom"
import AssistiveTouch from "./components/AssistiveTouch"
import Routes from "@/routes"

function App() {
    return (
        <>
            <BrowserRouter>
                <React.Suspense fallback={<div>加载中...</div>}>
                    <Routes />
                </React.Suspense>
                <AssistiveTouch />
            </BrowserRouter>
        </>
    );
}

export default App
