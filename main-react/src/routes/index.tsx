import React from 'react'
import { useRoutes } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/Home')) 
const About = React.lazy(() => import('@/pages/About')) 

export const routes = [
    {
        path: '/about',
        element: <About />,
    },{
        path: '/',
        element: <Home />,
    }
]

const Routes = () => {
    return useRoutes(routes)
}

export default Routes