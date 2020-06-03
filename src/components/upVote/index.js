import React from 'react'
import { ArrowDropUp } from '@material-ui/icons';
import './UpVote.css'

const Upvote = ({ upVoteID, updateVoteIndex, upDateVoteCount }) => {
    const upVoteCount = () => {
        const prevCount = 1;
        let getVoteCount = localStorage.getItem(upVoteID) ? Number(localStorage.getItem(upVoteID)) : prevCount;
        getVoteCount++;
        localStorage.setItem(upVoteID, getVoteCount);
        document.getElementById(`point_${upVoteID}`).innerHTML = getVoteCount;
        upDateVoteCount(getVoteCount, updateVoteIndex);

    }
    return (<ArrowDropUp className="upVote" onClick={() => upVoteCount()} />)
}

export default Upvote;