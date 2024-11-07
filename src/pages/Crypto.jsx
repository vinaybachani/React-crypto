import React from 'react'
import Filter from '../components/Filter'
import TableComponent from '../components/TableComponent'
import { Outlet } from 'react-router-dom'

const Crypto = () => {
    return (
        <section className='w-[90%] sm:w-[80%] h-full flex flex-col mt-8 lg:mt-16 mb-24 relative'>
            <Filter />
            <TableComponent />
            <Outlet />
        </section>
    )
}

export default Crypto
