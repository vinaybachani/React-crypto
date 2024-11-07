import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className='w-[90%] sm:w-[80%] lg:w-[40%] mt-20 sm:mt-24 lg:mt-16 flex justify-around align-middle border border-cyan rounded-lg'>
            <NavLink to={'/'} className={
                ({ isActive }) => {
                    return `w-full text-sm md:text-base text-center font-nunito m-1.5 sm:m-2.5 ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'}  border-0 cursor-pointer capitalize font-semibold`
                }
            }>Crypto</NavLink>
            <NavLink to={'/trending'} className={
                ({ isActive }) => {
                    return `w-full text-sm md:text-base text-center font-nunito m-1.5 sm:m-2.5 ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'}  border-0 cursor-pointer capitalize font-semibold`
                }
            }>Trending</NavLink>
            <NavLink to={'/saved'} className={
                ({ isActive }) => {
                    return `w-full text-sm md:text-base text-center font-nunito m-1.5 sm:m-2.5 ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'}  border-0 cursor-pointer capitalize font-semibold`
                }
            }>Saved</NavLink>
        </nav>
    )
}

export default Navigation
