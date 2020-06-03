import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import './Pagination.css';

const Pagination = ({ currentPage, getUpdateData }) => {
    const preLink = currentPage > 0 ? currentPage - 1 : 0;
    const nextLink = currentPage + 1 > 49 ? 1 : currentPage + 1;
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link onClick={() => { getUpdateData(preLink) }} to={`/page=${preLink}`}>Previous</Link>
                    </li>
                    <li>
                        <Link onClick={() => { getUpdateData(nextLink) }} to={`/page=${nextLink}`}>Next</Link>
                    </li>
                </ul>
            </div>
        </Router>
    );
}
export default Pagination;