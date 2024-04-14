import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { HomePage } from '../pages/HomePage.jsx'
import { ExploreOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Store } from '@mui/icons-material'


export function AppHeader() {
    const locationPathname = useLocation().pathname
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    return (
        <header className="app-header full">
            <nav>
                <NavLink className='logo' to="/" exact="true">
                    <h1>Instegram</h1>
                </NavLink>
                <NavLink className={locationPathname === '/' ? "clickedNavWeight" : ""} to="/" exact="true" >
                    {locationPathname === '/' ?
                        <img className='icon' src="/public/icons/FilledHome.svg" alt="Filled Home Icon" />
                        :
                        <img className='icon' src="/public/icons/Home.svg" alt="Home Icon" />
                    }
                    <div> Home</div>
                </NavLink>
                <div>
                    <img className='icon' src="/public/icons/Search.svg" alt="Search Icon" />
                    <div>Search</div>
                </div>
                <NavLink className={locationPathname === '/explore' ? "clickedNavWeight" : ""} to="/explore" exact="true">
                    {locationPathname === '/explore' ?
                        <img className='icon' src="/public/icons/FilledExplore.svg" alt="Filled Home Icon" />
                        :
                        <img className='icon' src="/public/icons/Explore.svg" alt="Home Icon" />
                    }
                    {/* <ExploreOutlined /> */}
                    <div>Explore</div>
                </NavLink>
                <NavLink to="/direct" exact="true">
                    <img className='icon' src="/public/icons/Messenger.svg" alt="Messenger Icon" />
                    <div>Messeges</div>
                </NavLink>
                <div>
                    <img className='icon' src="/public/icons/Like.svg" alt="Nofication Icon" />
                    <div>Notification</div>
                </div>
                <div>
                    <img className='icon' src="/public/icons/Create.svg" alt="Create Icon" />
                    <div>Create</div>
                </div>
                <NavLink className={locationPathname === '/profile' ? "clickedNavWeight" : ""} to="/profile" exact="true">
                    {loggedInUser ?
                        <img className='icon profilePreviewImg' src={loggedInUser.imgUrl} alt="Profile Icon" />
                        :
                        <img className='icon' src="/public/icons/User.svg" alt="Profile Icon" />
                    }
                    <div>Profile</div>
                </NavLink>
                <div>
                    <img className='icon' src="/public/icons/More.svg" />
                    <div>More</div>
                </div>
            </nav>
        </header>
    )
}   