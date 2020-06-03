import React, { useContext } from 'react';
import './HideNews.css';
import { store } from '../../store.js';


const HideNews = ({ hideId, currentPage, getUpdateData }) => {

    const globalState = useContext(store);
    let { state } = globalState;
    const deleteNews = () => {
        const removedList = localStorage.getItem('removedItems') ? localStorage.getItem('removedItems') + `,${hideId}` : hideId;
        localStorage.setItem('removedItems', removedList);
        updateStore(removedList);
    }
    const updateStore = (removedList) => {
        state.hits = state.hits.filter(hit => !removedList.includes(hit.objectID));
        getUpdateData(currentPage, state)
    }
    return (<span className="hideText" onClick={() => deleteNews()}>[ hide ]</span>)
}

export default HideNews;