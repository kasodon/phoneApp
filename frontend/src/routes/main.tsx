import React from 'react';
const Landing = React.lazy(
    () => import('../components/Landing/landing'),
)
const Dashboard = React.lazy(
    () => import('../components/Dashboard/dashboard'),
)
const Login = React.lazy(
    () => import('../components/Login/login'),
)
const Signup = React.lazy(
    () => import('../components/Signup/signup'),
)

var mainRoutes = [
    { path: '/', name: 'Landing Page', component: <Landing /> },
    { path: '/dashboard', name: 'Landing Page', component: <Dashboard /> },
    { path: '/login', name: 'Landing Page', component: <Login /> },
    { path: '/signup', name: 'Landing Page', component: <Signup /> },
]

export default mainRoutes