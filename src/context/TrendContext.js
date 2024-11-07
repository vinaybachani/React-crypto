import React, { createContext, useLayoutEffect, useState } from "react";

export const TrendContext = createContext({});

export const TrendProvider = ({ children }) => {
    const [trendData, setTrendData] = useState();

    const getTrendData = async () => {
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/search/trending`).then(res => res.json()).then(json => json)
            setTrendData(data.coins)
        } catch (error) {
            console.log(error);
        }
    }

    const resetTrendingResult = () => {
        getTrendData();
    }

    useLayoutEffect(() => {
        getTrendData();
    }, [])

    return (
        <TrendContext.Provider value={{ trendData, resetTrendingResult }}>
            {children}
        </TrendContext.Provider>
    )
}