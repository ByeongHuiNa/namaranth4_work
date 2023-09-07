import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NoticeListCard from "./NoticeListCard";
import Alarm from "./Alarm";

const NoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [message, setMessage] = useState();
    // const [loading, setLoading] = useState(true);
    const history = useHistory();
    // const [currentPage, setCurrentPage] = useState(1);
    // const [numberOfPages, setNumberOfPages] = useState(0);
    // const [numberOfPosts, setNumberOfPosts] = useState(0);
    // const limit = 10;

    // useEffect(() => {
    //     setNumberOfPages(Math.ceil(numberOfPosts/limit));
    // }, [numberOfPosts])

    // const onClickPageBtn = (page) => {
    //     history.push(`${location.pathname}?page=${page}`);
    //     setCurrentPage(page);
    //     getPosts(page);
    // }

    const getNotices = (page = 1) => {
        // setCurrentPage(page);

        // let params = {
        //     _page: page,
        //     _limit: limit,
        //     _sort: 'id',
        //     _order: 'desc'
        // }

        axios.get(`/notice/list`, {
            // params
        }).then((res) => {
            // setNumberOfPosts(res.headers['x-total-count'])
            console.log(res.data);
            setNotices(res.data);
            // setLoading(false);
        })
    }

    useEffect(() => {
        // setCurrentPage(parseInt(pageParam) || 1);
        getNotices();
    }, [])
    
    const alarmNotice = () => {
        if(notices.length == 0){
            return (
                <Alarm message={'공지사항이 존재하지 않습니다.'} hideAlarmNotice={hideAlarmNotice}/>
            )
        }
    }

    const hideAlarmNotice = () => {
        const alarmDiv = document.querySelector('.noticeAlarm');
        alarmDiv.classList.remove('show');
    }

    const renderNotices = () => {
        return notices.map((notice) => {
            return (
                <NoticeListCard 
                    key={notice.noti_no}
                    notice={notice}
                    onClick={(id) => {
                        history.push(`/notice/get/${id}`)
                    }}
                />
            )
        })
    }

    const registerBtn = () => {
        history.push(`/notice/register`);
    }

    return (
        <div className="card">
            <div className="card-header" id="noticeHeader">
                <h5>
                <i className="bi bi-journal-bookmark-fill iconSet"></i>공지사항 목록
                </h5>
            </div>
            <div className="card-body table-border-style" id="noticeBody">
                <div className="table-responsive">
                    <table className="table table-hover"  id="noticeTable">
                        <thead>
                            <tr>
                                <th className="align-middle">번호</th>
                                <th className="align-middle">제목</th>
                                <th className="align-middle">작성자</th>
                                <th className="align-middle">작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderNotices()}
                        </tbody>
                    </table>
                    {/* {
                        message !== null && <Alarm message={message}/>
                    } */}
                    {alarmNotice()}
                    {/* {numberOfPages > 1 && <Pagination 
                        currentPage={currentPage} 
                        numberOfPages={numberOfPages}
                        onClick={onClickPageBtn}
                    />} */}
                    <div className="d-flex justify-content-end" id="registerBtn">
                        <div id="registerForm">                        
                            <button type="button" className="btn btn-primary" onClick={registerBtn}>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeList;