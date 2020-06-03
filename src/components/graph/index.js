import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import { store } from '../../store.js';

const Graph = () => {
    const globalState = useContext(store);
    const { state } = globalState;
    const { hits } = state;
    const getDataValues = () => {
        let xVal;
        let yVal;
        if (state && hits) {
            xVal = hits.map((hit) => hit.objectID);
            yVal = hits.map((hit) => hit.points);
        }
        return ({ xVal, yVal })
    }
    const getAxisValues = getDataValues();
    const state1 = {
        options: {
            chart: {
                id: 'hacketNews'
            },
            xaxis: {
                categories: getAxisValues.xVal
            }
        },
        series: [{
            name: 'News',
            data: getAxisValues.yVal
        }]
    }

    return (
        <Chart options={state1.options} series={state1.series} type="line" height={320} />
    )

}


export default Graph;