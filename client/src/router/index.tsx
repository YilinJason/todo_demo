import React, { Children, lazy } from 'react'
import Home from '@/views/Home'
import HomePage from '@/views/Page/HomePage'
import EventPage from '@/views/Page/EventPage'
import HelpPage from '@/views/Page/HelpPage'
import SettingPage from '@/views/Page/SettingPage'
import SignUp from '@/views/SignUp'
import Login from '@/views/LogIn'


import { Navigate } from 'react-router-dom'
const routes = [
    {
        path: '/',
        element: <Navigate to='/login' />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/HomePage',
                element: <HomePage />
            },
            {
                path: '/EventPage',
                element: <EventPage />,
            },
            {
                path: '/HelpPage',
                element: <HelpPage />
            },
            {
                path: '/SettingPage',
                element: <SettingPage />
            }
        ]
    }
]

export default routes