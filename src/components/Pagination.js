import React, { useContext, useRef } from 'react'
import paginationArrow from "../assets/pagination-arrow.svg"
import { CryptoContext } from '../context/CryptoContext';
import submitIcon from '../assets/submit-icon.svg';

const PerPage = () => {
    const inputRef = useRef(null);
    let { setPerPage } = useContext(CryptoContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        let value = inputRef.current.value;
        if (value !== 0) {
            setPerPage(value);
            inputRef.current.value = value
        }
    }
    return (
        <form action="" className='relative flex items-center  font-nunito mr-6'>
            <label htmlFor="perpage" className='relative flex justify-center items-center'>
                <span className='mr-2 lowercase'>Per Page</span>
            </label>
            <input type="number" min={1} max={250} name='perpage' placeholder='10' className='hover:appearance-none appearance-none w-8 h-6 rounded bg-gray-200 placeholder:text-gray-100 placeholder:text-sm required outline-0 border border-transparent focus:border-cyan leading-4  text-center text-sm' ref={inputRef} />
            <button className='ml-1 cursor-pointer' onClick={handleSubmit}>
                <img src={submitIcon} className='w-full h-auto' alt="submiticon" />
            </button>
        </form>
    )
}

const Pagination = () => {
    let { page, setPage, totalPage, perPage, cryptoData } = useContext(CryptoContext);
    const TotalNumber = Math.ceil(totalPage / perPage);
    const next = () => {
        if (page === TotalNumber) return null
        else setPage(page + 1)
    }
    const prev = () => {
        if (page === 1) return null
        else setPage(page - 1)
    }

    const multiStepNext = () => {
        if (page + 3 >= TotalNumber) {
            setPage(TotalNumber - 1);
        } else {
            setPage(TotalNumber + 3)
        }
    }

    const multiStepPrev = () => {
        if (page - 3 <= 1) {
            setPage(TotalNumber + 1);
        } else {
            setPage(page - 2)
        }
    }
    if (cryptoData && cryptoData.length >= perPage) {
        return (
            <div className='flex md:flex-row flex-col items-center md:mt-0 mt-4'>
                <PerPage />
                <ul className='flex items-center justify-end text-sm sm:mt-0 mt-4'>
                    <li className='flex items-center'>
                        <button className='outline-0 hover:text-cyan w-8'>
                            <img src={paginationArrow} alt='left' className='w-full h-auto rotate-180' onClick={prev} />
                        </button>
                    </li>
                    {
                        (page + 1 === TotalNumber || page === TotalNumber) ? <li><button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg' onClick={multiStepPrev}>...</button></li> : null
                    }
                    {
                        (page - 1 !== 0) ? <li><button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5' onClick={prev}>{" "}{page - 1}{" "}</button></li> : null
                    }
                    <li><button className='outline-0 rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5' disabled>{page}</button></li>
                    {
                        (page + 1 !== TotalNumber && page !== TotalNumber) ? <li><button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5' onClick={next}>{page + 1}</button></li> : null
                    }
                    {
                        page + 1 !== TotalNumber && page !== TotalNumber ? <li><button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg' onClick={multiStepNext}>...</button></li> : null
                    }

                    {
                        page !== TotalNumber ? <li><button className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5' onClick={() => setPage(TotalNumber)}>{TotalNumber}</button></li> : null
                    }

                    <li>
                        <button className='outline-0 hover:text-cyan w-8' onClick={next}>
                            <img src={paginationArrow} alt='right' className='w-full h-auto' />
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Pagination
