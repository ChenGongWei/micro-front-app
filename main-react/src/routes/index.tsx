import React from 'react'
import { useRoutes } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/Home')) 
const About = React.lazy(() => import('@/pages/About')) 
const DragUpload = React.lazy(() => import('@/pages/DragUpload')) 
const Vue = React.lazy(() => import('@/pages/Vue')) 

export const routes = [
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/dragUpload',
        element: <DragUpload />,
    },
    {
        path: '/vue/*',
        element: <Vue />,
    },
    {
        path: '/',
        element: <Home />,
    }
]

const Routes = () => {
    return useRoutes(routes)
}

export default Routes