import React, { useEffect, useState } from "react";
import axios from "axios";
import MailMainList from "../comp/main/MailMainList";
import NoticeMainList from "../comp/main/NoticeMainList";
import DocumentMainList from "../comp/main/DocumentMainList";
import NoteMainList from "../comp/main/NoteMainList";
import Attendance from "../comp/main/Attendance";
import ScheduleMainList from "../comp/main/ScheduleMainList";
import Modal from "../comp/Modal";
import SearchResult from "../comp/main/SearchResult";

const MainPage = () => {
    const [user, setUser] = useState({});
    const [deptName, setDeptName] = useState('');
    const [emails, setEmails] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [notices, setNotices] = useState([]);
    const [notes, setNotes] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [attend, setAttend] = useState([]);

    const [searchName, setSearchName] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);
    const [searchStatus, setSearchStatus] = useState(false);

    const [formattedStartTime, setFormattedStartTime] = useState('');
    const [formattedEndTime, setFormattedEndTime] = useState('');

    const [noteTitle, setNoteTitle] = useState('');
    const [noteUpdateTitle, setNoteUpdateTitle] = useState('');
    const [noteTitleError, setNoteTitleError] = useState(false)
    const [noteUpdateTitleError, setNoteUpdateTitleError] = useState(false)
    const [noteContent, setNoteContent] = useState('');
    const [noteUpdateContent, setNoteUpdateContent] = useState('');
    const [noteContentError, setNoteContentError] = useState(false);
    const [noteUpdateContentError, setNoteUpdateContentError] = useState(false);
    const [noteUpdate, setNoteUpdate] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    const [selectedMail, setSelectedMail] = useState({});
    const [noteModalOpen, setNoteModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState({});

    useEffect(() => {
        // 초기 정보 가져오기
        axios.get(`/main/info`)
            .then((res) => {
                setUser(res.data.user || []);
                setDeptName(res.data.deptName || '');
                setEmails(res.data.emails || []);
                setDocuments(res.data.docs || []);
                setNotices(res.data.notices || []);
                setNotes(res.data.notes || []);
                setSchedules(res.data.schedules || []);
                setAttend(res.data.attend || []);
                setFormattedStartTime(res.data.formattedStartTime || '');
                setFormattedEndTime(res.data.formattedEndTime || '');
                setSearchStatus(false);
            })
    }, [formattedStartTime, formattedEndTime])

    // 메인 모달창
    const showModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    // 메일 모달창
    const showMailModal = (email) => {
        setMailModalOpen(true);
        setSelectedMail(email);
    }

    const closeMailModal = () => {
        setMailModalOpen(false);
        setSelectedMail({});
    }

    // 노트 모달창
    const showNoteModal = (note) => {
        setSelectedNote(note);
        setNoteModalOpen(true);
    }

    const closeNoteModal = () => {
        setNoteModalOpen(false);
        setSelectedNote({});
        setNoteUpdate(false);
        setNoteUpdateTitleError(false);
        setNoteUpdateContentError(false);
    }

    // 출근 체크
    const attendStart = (user_no) => {
        const currentTime = new Date();
        console.log(user_no);
        console.log(Date.parse(currentTime));
        axios.post(`/main/attend/start/${user_no}`, null, {params:{start_time : Date.parse(currentTime)}})
        .then((res) => {
            console.log(res.data);
            if(res.data == "success"){
                axios.get(`/main/attend/${user_no}`).then((res) => {
                    setFormattedStartTime(res.data.start_time);
                })
                alert('출근 완료')
            } else if(res.data == "already success"){
                alert('이미 출근 처리 완료')
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    // 퇴근 체크
    const attendEnd = (user_no) => {
        const currentTime = new Date();
        if(formattedStartTime == ''){
            alert('출근 후 퇴근 처리 부탁')
        } else {
            axios.post(`/main/attend/end/${user_no}`, null, 
                {params:{at_no : attend.at_no, end_time : Date.parse(currentTime)}}).then((res) => {
                console.log(res);
                if(res.data == "success"){
                    axios.get(`/main/attend/${user_no}`).then((res) => {
                        setFormattedEndTime(res.data.end_time);
                    })
                    alert('퇴근 완료')
                } else if(res.data == "already success"){
                    alert('이미 퇴근 처리 완료')
                }
            })
        }
    }

    // 사원 검색
    const searchUser = () => {
        console.log(searchName);
        axios.get('/main/search/users', {
            params:{user_name:searchName}
        }).then((res) => {
            setSearchUsers(res.data);
            setSearchStatus(true);
        })
    }

    // 노트 등록 빈칸 검사
    const validateNote = () => {
        let validated = true;
        if(noteTitle == ''){
            setNoteTitleError(true);
            validated = false;
        }
        if(noteContent == ''){
            setNoteContentError(true);
            validated = false;
        }
        return validated;
    }

    // 노트 등록
    const registerNote = () => {
        setNoteTitleError(false);
        setNoteContentError(false);
        if(validateNote()){
            axios.post(`/main/notes/new`, {
                user : user,
                note_title : noteTitle,
                note_content : noteContent
            }).then((res) => {
                alert(res.data);
                fetchNotes();
                setNoteTitle('');
                setNoteContent('');
            })
        }
    }

    // 노트 초기화
    const initialization = () => {
        setNoteTitle('');
        setNoteContent('');
        setNoteTitleError(false);
        setNoteContentError(false);
    }

    // 노트 삭제
    const deleteNote = () => {
        axios.delete(`/main/notes/delete/${selectedNote.note_no}`).then((res) => {
            alert('삭제 완료');
            setSelectedNote({});
            closeNoteModal();
            fetchNotes();
        })
    }

    // 노트 수정 창으로 변경
    const updateNoteModal = () => {
        setNoteUpdate(true);
        setNoteUpdateTitle(selectedNote.note_title);
        setNoteUpdateContent(selectedNote.note_content);
    }

    // 노트 수정 취소
    const updateNoteModalCancel = () => {
        setNoteUpdateTitleError(false);
        setNoteUpdateContentError(false);
        setNoteUpdate(false);
    }

    // 노트 수정 변경 여부 검사
    const noteStatus = () => {
        return selectedNote.note_title == noteUpdateTitle 
            && selectedNote.note_content == noteUpdateContent;
    }

    // 노트 수정 빈칸 검사
    const validateNoteUpdate = () => {
        let validated = true;
        if(noteUpdateTitle === ''){
            setNoteUpdateTitleError(true);
            validated = false;
        }
        if(noteUpdateContent === ''){
            setNoteUpdateContentError(true);
            validated = false;
        }
        return validated;
    }

    // 노트 수정
    const updateNote = () => {
        setNoteUpdateTitleError(false);
        setNoteUpdateContentError(false);
        if(validateNoteUpdate()){
            axios.put(`/main/notes/update/${selectedNote.note_no}`, {
                note_no : selectedNote.note_no,
                note_title : noteUpdateTitle,
                note_content : noteUpdateContent
            }).then((res) => {
                alert('수정 완료');
                fetchNotes();
                closeNoteModal();
            })
        }
    }

    // 노트 등록, 수정 후 새로고침
    const fetchNotes = () => {
        axios.get(`/main/notes/list/${user.user_no}`).then((res) => {
          setNotes(res.data);
        });
    };

    return (
        <div>
            {/* <div className="pcoded-main-container">
                <div className="pcoded-content"> */}
            <div className="row setFont">
                <div className="col-md-4 paddingSet">
                    <div className="card" id="mypage">
                        <div className="card-header">
                            <h5 onClick={() => showModal()}>
                                <i className="bi bi-person-circle iconSet"></i>내 정보
                            </h5>
                        </div>
                        <div className="card-body main-card-body" id="attend" style={{ padding: '10' }}>
                            <div id="profileImg">
                                <img className="img-radius" src={user.user_profile} alt="User-Profile-Image" />
                            </div>
                            <div className="lead m-t-0 myinfo" style={{ paddingTop: "5px", paddingBottom: "5px" }}><b>{user.user_name}</b></div>
                            <div className="myinfo">사원번호 {user.user_no}</div>
                            <div className="myinfo">{deptName}/{user.user_position}</div>
                            <div className="myinfo">메일 {user.user_email}</div>
                            <Attendance formattedStartTime={formattedStartTime} formattedEndTime={formattedEndTime} attend={attend} user={user} />
                        </div>
                        <div className="attenBtn">
                            <button type="button" className="btn btn-outline-primary" onClick={() => attendStart(user.user_no)}>
                                <i className="feather mr-2 icon-check-circle"></i>출근
                            </button>
                            <button type="button" className="btn btn-outline-primary" onClick={() => attendEnd(user.user_no)}>
                                <i className="feather mr-2 icon-check-circle"></i>퇴근
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 paddingSet">
                    <div className="card emailBox">
                        <div className="card-header paddingBottomSet">
                            <h5>
                                <i className="bi bi-envelope-check-fill iconSet"></i>수신 메일
                            </h5>
                            <div className="card-header-right">
                                <div className="btn-group card-option">
                                    <button type="button" className="btn dropdown-toggle"
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="feather icon-more-horizontal"></i>
                                    </button>
                                    <ul
                                        className="list-unstyled card-option dropdown-menu dropdown-menu-right">
                                        <li className="dropdown-item full-card"><a href="#!"><span><i
                                            className="feather icon-maximize"></i> maximize</span><span
                                                style={{ display: 'none' }}><i
                                                    className="feather icon-minimize"></i> Restore</span></a></li>
                                        <li className="dropdown-item minimize-card"><a href="#!"><span><i
                                            className="feather icon-minus"></i> collapse</span><span
                                                style={{ display: 'none' }}><i className="feather icon-plus"></i>
                                                expand</span></a></li>
                                        <li className="dropdown-item reload-card"><a href="#!"><i
                                            className="feather icon-refresh-cw"></i> reload</a></li>
                                        <li className="dropdown-item close-card"><a href="#!"><i
                                            className="feather icon-trash"></i> remove</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card-body main-card-body table-border-style">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle" id="emailTable">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">
                                                <div className="chk-option">
                                                    <label
                                                        className="check-task custom-control custom-checkbox d-flex justify-content-center done-task">
                                                        <input type="checkbox" className="custom-control-input" />
                                                        <span className="custom-control-label"></span>
                                                    </label>
                                                </div>
                                            </th>
                                            <th className="align-middle">제목</th>
                                            <th className="align-middle">발신자</th>
                                            <th className="align-middle">수신일</th>
                                        </tr>
                                    </thead>
                                    <MailMainList emails={emails} showMailModal={showMailModal} closeMailModal={closeMailModal}/>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="vbigGroup">
                    <div className="col-lg-8 " id="bigGroup1">
                        <div className="w-100" id="smallGroup">
                            <div className="col-lg-6 paddingSet">
                                <div className="card" id="notice-card">
                                    <div className="card-header">
                                        <h5>
                                            <i className="bi bi-journal-bookmark-fill iconSet"></i>공지사항
                                        </h5>
                                    </div>
                                    <div className="card-body main-card-body readDoc">
                                        <NoticeMainList notices={notices} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 paddingSet">
                                <div className="card" id="approval-card">
                                    <div className="card-header cardList"
                                        style={{ display: 'flex', paddingTop: '15px', alignItems: 'center' }}>
                                        <h5>
                                            <i className="bi bi-file-earmark-check iconSet"></i>결재 목록
                                        </h5>
                                        <ul className="nav nav-pills mb-3 tabBtn"
                                            id="pills-tab" role="tablist">
                                            <li className="nav-item"><a className="nav-link active docBtn"
                                                id="pills-home-tab" data-toggle="pill" href="#pills-home"
                                                role="tab" aria-controls="pills-home" aria-selected="true">대기</a>
                                            </li>
                                            <li className="nav-item"><a className="nav-link docBtn"
                                                id="pills-profile-tab" data-toggle="pill"
                                                href="#pills-profile" role="tab"
                                                aria-controls="pills-profile" aria-selected="false">완료</a></li>
                                        </ul>
                                    </div>
                                    <div id="docComplete" className="card-body main-card-body">
                                        <DocumentMainList documents={documents} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="bigGroup2" >
                            <div className="col-lg-6 paddingSet">
                                <ScheduleMainList schedules={schedules} />
                            </div>
                            <div className="col-lg-6 paddingSet">
                                <div className="card">
                                    <div className="card-header">
                                        <h5><i className="bi bi-search iconSet"></i>사원검색</h5>
                                    </div>
                                    <div className="card-body main-card-body readDoc">
                                        <form id='searchForm'>
                                            <div className="input-group mb-3 mt-3">
                                                <div className="input-group mb-3" id="inputBox">
                                                    <input type="text" style={{ height: '40px' }} name="user_name" id="searchByName"  onChange={(e) => {setSearchName(e.target.value)}}
                                                        className="form-control" placeholder="사원 이름 입력" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                    <div className="input-group-append" style={{ zIndex: "0" }}>
                                                        <button className="btn btn-primary" style={{ height: '40px' }} id="searchUsers" type="button" onClick={() => searchUser()}>검색</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                            {searchStatus && (
                                                <SearchResult searchUsers={searchUsers}/>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-8 col-lg-4 paddingSet">
                        <div className="card" style={{ height: '723px' }}>
                            <div className="card-header cardList"
                                style={{ display: 'flex', paddingTop: '15px', alignItems: 'center' }}>
                                <h5>
                                    <i className="bi bi-sticky iconSet"></i>메모장
                                </h5>
                                <ul className="nav nav-tabs mb-3 tabBtn" id="myTab"
                                    role="tablist">
                                    <li className="nav-item"><a
                                        className="nav-link active text-uppercase" id="home-tab"
                                        data-toggle="tab" href="#home" role="tab" aria-controls="home"
                                        aria-selected="true">조회</a></li>
                                    <li className="nav-item"  onClick={initialization}><a className="nav-link text-uppercase"
                                        id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                                        aria-controls="profile" aria-selected="false">작성</a></li>
                                </ul>
                            </div>
                            <div id="docComplete">
                                <div className="card-body main-card-body">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active readDoc" id="home"
                                            role="tabpanel" aria-labelledby="home-tab">
                                            <NoteMainList notes={notes} showNoteModal={showNoteModal} closeNoteModal={closeNoteModal}/>
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel"
                                            aria-labelledby="profile-tab">
                                            <input type="text" id="noteTitle" placeholder="제목" className={`form-control ${noteTitleError ? 'border-danger' : ''}`} 
                                                onChange={(e) => {setNoteTitle(e.target.value)}} style={{ height: '40px' }} value={noteTitle} />
                                            {noteTitleError && ( <small id="emailHelp" className="form-text text-muted text-danger mb-2"> 제목은 필수입니다.</small> )}
                                            <textarea rows="6" cols="39" id="noteContent" className={`form-control ${noteContentError ? 'border-danger' : ''}`}
                                                onChange={(e) => {setNoteContent(e.target.value)}} placeholder="내용" value={noteContent}></textarea>
                                            {noteContentError && ( <small id="emailHelp" className="form-text text-muted text-danger"> 내용은 필수입니다.</small> )}    
                                            <div
                                                style={{ display: 'inline-block', margin: '0 20px', float: 'right' }}>
                                                <button type="button" className="btn btn-primary align-middle"
                                                    id="noteRegister" onClick={() => registerNote()}>등록</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {modalOpen && (
                    <Modal closeModal={() => closeModal()} message={user.user_name}>
                        모달창입니다.
                    </Modal>
                )}
                {mailModalOpen && (
                    <Modal closeModal={() => closeMailModal()} message={selectedMail.mail_title}>
                        <div>
                            {selectedMail.mail_content}
                        </div>
                    </Modal>
                )}
                {noteModalOpen && !noteUpdate && (
                    <Modal closeModal={() => closeNoteModal()} message={"메모 조회"}>
                        <div className="card mt-1 mb-2" >
                            <div className="card-body" style={{textAlign:"left"}} >
                                <strong>{selectedNote.note_title}</strong>
                            </div>
                        </div>
                        <div className="card" style={{height:"140px", textAlign:"left"}}>
                            <div className="card-body">
                                {selectedNote.note_content}
                            </div>
                        </div>
                        <div className="position-absolute bottom-0 end-0 mb-3 mr-3 noteBtn">
                            <button type="button" className="btn btn-secondary mr-2" onClick={updateNoteModal}>수정</button>
                            <button type="button" className="btn btn-primary" onClick={deleteNote}>삭제</button>
                        </div>
                    </Modal>
                )}
                {noteModalOpen && noteUpdate && (
                    <Modal closeModal={() => closeNoteModal()} message={"메모 수정"}>
                        <div className="card mt-1 mb-2" id="noteUpdateTitleBox">
                            <div className="card-body pt-0 pr-0 pl-0 pb-0" >
                            <input type="text" id="noteUpdateTitle" className={`form-control ${noteUpdateTitleError ? 'border-danger' : ''}`} 
                                onChange={(e) => {setNoteUpdateTitle(e.target.value)}} style={{ height: '55px' }} placeholder="제목" value={noteUpdateTitle} />
                            </div>
                        </div>    
                            {noteUpdateTitleError && ( <small className="form-text text-muted text-danger mb-0"> 제목은 필수입니다.</small> )}
                        <div className="card mb-1" id="noteUpdateContentBox">
                            <div className="card-body pt-0 pr-0 pl-0 pb-0" >    
                            <textarea id="noteUpdateContent" className={`form-control ${noteUpdateContentError ? 'border-danger' : ''}`}
                                onChange={(e) => {setNoteUpdateContent(e.target.value)}} placeholder="내용" value={noteUpdateContent}></textarea>
                            </div>                        
                        </div>
                            {noteUpdateContentError && ( <small className="form-text text-muted text-danger mb-1"> 내용은 필수입니다.</small> )}           
                        <div className="position-absolute bottom-0 end-0 mb-3 mr-3 noteBtn">
                            <button type="button" className="btn btn-primary mr-2" onClick={() => {updateNoteModalCancel()}}>취소</button>
                            <button type="button" className="btn btn-primary" onClick={() => {updateNote()}} disabled={noteStatus()} >완료</button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
        //    </div>
        // </div>
    );
};


export default MainPage;