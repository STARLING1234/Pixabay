import React, { useState } from 'react'
import Navbar from './Components/LayoutCompoments/Navbar'
import Card from './Components/LayoutCompoments/Card'
import Footer from './Components/LayoutCompoments/Footer'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import PrivateRoute from './shared/Components/PrivateRoute/PrivateRoute'

const App = () => {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    const location = useLocation();
    // check login token
    const isLoggedIn = localStorage.getItem("accessToken");

    // hide Navbar/Footer pages
    const hideLayout =
        location.pathname === "/" ||
        location.pathname === "/signup";

    return (
        <div>
            {
                !hideLayout && isLoggedIn &&
                <Navbar
                    search={search}
                    setSearch={setSearch}
                    setQuery={setQuery}
                />
            }
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/home' element={
                    <PrivateRoute>
                        <Card query={query} />
                    </PrivateRoute>
                } />
                <Route path='*' element={<h1>404 Page Not Found</h1>} />
            </Routes>
            {
                !hideLayout && isLoggedIn &&
                <Footer />
            }
        </div>
    )
}

export default App
