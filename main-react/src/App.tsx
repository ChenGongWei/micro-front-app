import React from "react"
import { BrowserRouter } from "react-router-dom"
import Routes from "@/routes"

function App() {
    return (
        <BrowserRouter>
            <React.Suspense fallback={<div>加载中...</div>}>
                <Routes />
            </React.Suspense>
        </BrowserRouter>
    );
}

export default App
