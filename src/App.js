import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import Upvote from './components/upVote';
import HideNews from './components/hideNews';
import Graph from './components/graph';
import axios from 'axios';
import './App.css';
import Pagination from './components/pagination';
import { store } from './store.js';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const getUpdateData = async (page, data) => {
    if (!data) {
      const result = await axios(
        `https://hn.algolia.com/api/v1/search_by_date?query=&page=${page}`,
      )
      data = result.data
    }
    dispatch({ type: 'update State', store: checkNullPoints(data) })
    setCurrentPage(page);
  };


  useEffect(() => {
    const params = window.location.pathname.split('=')
    let activePage = params.length > 1 ? (Number(params[1])) : currentPage;
    activePage = activePage > 49 ? 0 : activePage
    setCurrentPage(activePage);
    getUpdateData(activePage, null);
  }, []);

  const checkNullPoints = (data) => {
    let newData = {
      hits: [],
    }
    newData.hits = data.hits.map(hit => {
      hit.points = hitPointRender(hit.objectID, hit.points ? hit.points : 0);
      return hit;
    })
    newData.hits = newData.hits.filter(hit => !removedNewsList.includes(hit.objectID));
    return (newData)
  }
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { state } = globalState;
  const { hits } = state;

  const removedNewsList = localStorage.getItem('removedItems') ? localStorage.getItem('removedItems') : '';

  const hitPointRender = (objectID, hit) => {
    return localStorage.getItem(objectID) ? Number(localStorage.getItem(objectID)) : hit;
  }
  const upDateVoteCount = async (getVoteCount, updateVoteIndex) => {
    let localData = state;
    localData.hits[updateVoteIndex]['points'] = getVoteCount;
    getUpdateData(currentPage, localData);
  }
  return (
    <div className="App">
      <Container className='container-border'>
        <Row className="table-header">
          <Col xs="1">Comments</Col>
          <Col xs="1">Vote Count</Col>
          <Col xs="1">UpVote</Col>
          <Col xs="auto">News Details</Col>
        </Row>
        {hits && hits.length > 0 && hits.filter(hit => !removedNewsList.includes(hit.objectID)).map((hit, index) => (
          <Row className="dataList" id={`${hit.objectID}`} key={`row_${hit.objectID}`}>
            <Col xs="1" key={`comments_${hit.objectID}`}>{hit.num_comments ? hit.num_comments : 0}</Col>
            <Col xs="1" id={`point_${hit.objectID}`} key={`point_${hit.objectID}`}> {hitPointRender(hit.objectID, hit.points ? hit.points : 0)}</Col>
            <Col xs="1" key={`upVote_${hit.objectID}`}><Upvote upVoteID={`${hit.objectID}`} updateVoteIndex={index} upDateVoteCount={upDateVoteCount} /></Col>
            <Col xs="auto" key={`story_${hit.objectID}`}>{hit.story_title}<HideNews hideId={`${hit.objectID}`} getUpdateData={getUpdateData} currentPage={currentPage} /></Col>
          </Row>
        ))
        }
        <Pagination currentPage={currentPage} getUpdateData={getUpdateData} />
        <Graph />

      </Container>
    </div>

  );
}
export default App;
