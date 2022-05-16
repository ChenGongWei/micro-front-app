import React from 'react'
import { Route } from 'react-router-dom'

const Home = React.lazy(() => import('../pages/Home'))
const About = React.lazy(() => import('../pages/About'))

export default function getRoutes() {
    return (
        <>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
        </>
    )
}