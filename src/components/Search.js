import React, { useContext, useState } from 'react'
import SearchIcon from '../assets/search-icon.svg'
import { CryptoContext } from '../context/CryptoContext';
import debounce from 'lodash.debounce';

const SearchInput = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState("");
    let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);
    let handleInput = (e) => {
        e.preventDefault();
        // setSearchData();
        let query = e.target.value;
        setSearchText(query)
        handleSearch(query)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchText);
    }

    const selectCoin = (coin) => {
        setCoinSearch(coin);
        setSearchText("");
        setSearchData("");
    }
    return (
        <>
            <form className='xl:w-96 lg:w-60 w-full relative flex items-center lg:ml-7 font-nunito' onSubmit={handleSubmit}>
                <input
                    className='w-full rounded bg-gray-200 p-2 lg:py-[1px] placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan'
                    placeholder='Search here...'
                    type="text"
                    name="search"
                    value={searchText}
                    onChange={handleInput}
                />
                <button type="button" className='absolute right-1 cursor-pointer'>
                    <img src={SearchIcon} className='w-full h-auto' alt="search" />
                </button>
            </form>

            {searchText.length > 0 ? (
                <ul className='absolute top-11 right-0 lg:w-96 w-full h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200 z-10'>
                    {
                        searchData && searchData.length > 0 ?
                            searchData.map((coin) => (
                                <li key={coin.id} className="flex items-center ml-4 my-2 cursor-pointer" onClick={() => selectCoin(coin.id)} >
                                    <img
                                        src={coin.thumb}
                                        alt={coin.name || 'Coin image'} // Fallback alt text
                                        className='w-4 h-4 mx-1.5'
                                    />
                                    {coin.id}
                                </li>
                            )) :
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="h-8 w-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin" role="status" />
                                <span className="ml-2">Searching</span>
                            </div>
                    }

                </ul >
            ) : null}
        </>
    );
}

const Search = () => {
    let { getSearchResult } = useContext(CryptoContext);

    const debounceFunc = debounce(function (val) {
        getSearchResult(val);
    }, 2000);


    return (
        <div className="relative">
            <SearchInput handleSearch={debounceFunc} />
        </div>
    )
}

export default Search
