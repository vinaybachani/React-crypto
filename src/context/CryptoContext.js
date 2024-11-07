import { createContext, useCallback, useLayoutEffect, useState } from "react";
import axios from "axios";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
    const [cryptoData, setCryptoData] = useState();
    const [searchData, setSearchData] = useState();
    const [coinData, setCoinData] = useState();
    const [coinSearch, setCoinSearch] = useState("");
    const [currency, setCurrency] = useState("usd");
    const [sortBy, setSortBy] = useState("market_cap_desc");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(250);
    const [perPage, setPerPage] = useState(10);


    const getCryptoData = async () => {
        setCryptoData();
        setTotalPage(14690);
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`).then(res => res.json()).then(json => json)
            setCryptoData(data)
        } catch (error) {
            console.log(error);
        }
        // try {
        //     const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
        //         .then((res) => res.json())
        //         .then((json) => json);
        //     console.log("number of coins", data.length);
        //     setTotalPage(data.length);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const getCoinData = useCallback(async (coinId) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
                params: {
                    localization: false,
                    tickers: false,
                    market_data: true,
                    community_data: false,
                    developer_data: true,
                    sparkline: false
                }
            });

            setCoinData(response.data);
        } catch (error) {
            console.log("Axios error: ", error);
        }
    })
    // setCoinData();

    const getSearchResult = async (query) => {
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then(res => res.json()).then(json => json)
            setSearchData(data.coins)
        } catch (error) {
            console.log(error);
        }
    }

    const resetFunction = () => {
        setPage(1);
        setCoinSearch("");
    }

    useLayoutEffect(() => {
        getCryptoData();
    }, [coinSearch, currency, sortBy, page, perPage])

    //we can also use the useEffect but using useLayoutEffect will allow the system to load the data even when the layouts are loading
    return (
        <CryptoContext.Provider value={{ cryptoData, getSearchResult, setCoinSearch, searchData, setSearchData, setCurrency, currency, sortBy, setSortBy, page, setPage, totalPage, resetFunction, setPerPage, perPage, getCoinData, coinData }}>
            {children}
        </CryptoContext.Provider>
    )
}