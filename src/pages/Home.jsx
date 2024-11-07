import React from 'react'
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { CryptoProvider } from '../context/CryptoContext'
import { TrendProvider } from '../context/TrendContext'
import { StorageProvider } from '../context/StorageContext'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <CryptoProvider>
            <TrendProvider>
                <StorageProvider>
                    <main className='w-full h-full flex flex-col first-letter:content-center items-center relative text-white font-nunito'>
                        <div className="h-screen w-screen bg-gray-300 fixed -z-10" />
                        <Logo />
                        <Navigation />
                        <Outlet />
                    </main>
                </StorageProvider>
            </TrendProvider>
        </CryptoProvider>
    )
}

export default Home
