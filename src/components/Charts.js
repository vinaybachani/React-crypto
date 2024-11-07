import React, { useContext, useLayoutEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { CryptoContext } from '../context/CryptoContext';
import axios from 'axios';

function CustomToolTip({ payload, label, active, currency = "usd" }) {
    if (active && payload && payload.length > 0) {
        return (
            <div className="custom-tooltip">
                <p className="label text-sm text-cyan">{`${label}: ${new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 5,
                }).format(payload[0].value)
                    }`}</p>
                {/* <p className="desc">Anyting</p> */}
            </div>
        )
    }
    return null
}

const ChartComponent = ({ data, currency, type }) => {
    return (
        <ResponsiveContainer height={'90%'}>
            <LineChart width={400} height={400} data={data}>
                <Line type={'monotone'} dataKey={type} stroke='#14ffec' strokeWidth={"1px"} />
                <CartesianGrid stroke='#323232' />
                <XAxis dataKey={"date"} hide />
                <YAxis dataKey={type} hide domain={["auto", "auto"]} />
                <Tooltip content={<CustomToolTip currency={currency} />} cursor={false} wrapperStyle={{ outline: "none" }} />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
}

const Charts = ({ id }) => {
    const [type, setType] = useState("prices");
    const [days, setDays] = useState(7);
    const [chartData, setChartData] = useState();
    let { currency } = useContext(CryptoContext);
    useLayoutEffect(() => {
        const getChartData = async (id) => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: 'usd',
                        days: days,
                        interval: 'daily'
                    }
                });

                let convertedData = response.data[type].map(item => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        [type]: item[1]
                    };
                });

                setChartData(convertedData);
            } catch (error) {
                console.log("Axios error: ", error);
            }
        }

        getChartData(id);
    }, [id, type, days])
    return (
        <div className='w-full h-[60%]'>
            <ChartComponent data={chartData} currency={currency} type={type} />
            <div className="flex flex-wrap">
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === 'prices' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setType("prices")}>Price</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === 'market_caps' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setType("market_caps")}>market caps</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === 'total_volumes' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setType("total_volumes")}>total volumes</button>

                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize mt-2 md:mt-0 ${days === 7 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setDays(7)}>7d</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize mt-2 md:mt-0 ${days === 14 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setDays(14)}>14d</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize mt-2 md:mt-0 ${days === 30 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setDays(30)}>30d</button>
            </div>
        </div>
    )
}

export default Charts
