import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const NoticeForm = ({editing}) => {
    const [title, setTitle] = useState('');
    const [titleOrigin, setTitleOrigin] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [content, setContent] = useState('');
    const [contentOrigin, setContentOrigin] = useState('');
    const [contentError, setContentError] = useState(false);
    const [user, setUser] = useState({});
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if(editing){
            axios.get(`/notice/modify/${id}`).then((res) => {
                setTitle(res.data.notice.noti_title);
                setTitleOrigin(res.data.notice.noti_title);
                setContent(res.data.notice.noti_content);
                setContentOrigin(res.data.notice.noti_content);
                setUser(res.data.user);
            })
        } else {
            axios.get(`/notice/register`).then((res) => {
                setUser(res.data);
            })
        }
    }, [id, editing]);
 
    const backPage = () => {
        if(editing){
            history.push(`/notice/get/${id}`);
        } else {
            history.push('/notice/list')
        }
    }

    const editStatus = () => {
        return title !== titleOrigin || content !== contentOrigin;
    }

    const validateForm = () => {
        let validated = true;
        if(title === ''){
            setTitleError(true);
            validated = false;
        }
        if(content === ''){
            setContentError(true);
            validated = false;
        }
        return validated;
    }

    const submitForm = () => {
        setTitleError(false);
        setContentError(false);
        if(validateForm){
            if(editing){
                axios.put(`/notice/modify/${id}`, {
                    noti_no : id,
                    noti_title : title, 
                    noti_content : content
                }).then((res) => {
                    alert('수정 완료');
                    history.push(`/notice/get/${id}`);
                });   
            } else {
                axios.post(`/notice/register`, {
                    user : user,
                    noti_title : title, 
                    noti_content : content
                }).then(() => {
                    alert('등록 완료');
                    history.push(`/notice/list`);
                })
            }
        }
    }

    return (
        <div className="pcoded-content" id="registerBox">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="m-b-10">{editing ? '공지사항 수정' : '공지사항 등록'}</h5>
                            <div className="card-header-right">
                                <div className="btn-group card-option">
                                    <button type="button" className="btn dropdown-toggle btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="feather icon-more-horizontal"></i>
                                    </button>
                                    <ul className="list-unstyled card-option dropdown-menu dropdown-menu-right">
                                        <li className="dropdown-item full-card"><a href="#!"><span><i className="feather icon-maximize"></i> maximize</span><span style={{display:"none"}}><i className="feather icon-minimize"></i> Restore</span></a></li>
                                        <li className="dropdown-item minimize-card"><a href="#!"><span><i className="feather icon-minus"></i> collapse</span><span style={{display:"none"}}><i className="feather icon-plus"></i> expand</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="form-group noticeInput">
                                    <label for="exampleInputEmail1">제목</label>
                                    <input type="text" name="noti_title" className={`form-control ${titleError ? 'border-danger' : ''}`} value={title} 
                                            onChange={(e) => {setTitle(e.target.value)}} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="제목"/>
                                    {titleError && ( <small id="emailHelp" className="form-text text-muted text-danger"> 공지사항 제목은 필수입니다.</small> )}
                                </div>
                                <div className="form-group noticeInput">
                                    <label for="exampleInputEmail1">작성자</label>
                                    <input className="form-control" type="text" value={user.user_name} readonly/>
                                    <input type="hidden" name="user.user_no" value={user.user_no}/>
                                </div>                           
                                <div className="form-group" id="noticeContent">
                                    <label for="exampleInputEmail1">내용</label>
                                    <textarea className={`form-control ${contentError ? 'border-danger' : ''}`} name="noti_content" style={{border:"1px solid #ced4da"}}
                                            onChange={(e) => {setContent(e.target.value)}} id="exampleFormControlTextarea1" value={content} rows="30"></textarea>
                                    {contentError && ( <small id="emailHelp" className="form-text text-muted text-danger"> 공지사항 내용은 필수입니다.</small> )}
                                </div>
                                <div className="d-flex justify-content-end" id="updateBtn">
                                    <button type="button" className="btn btn-primary" onClick={backPage}>취소</button>
                                    <button type="submit" className="btn btn-primary" id="getRegister" 
                                        disabled={editing && !editStatus()} onClick={submitForm}>{editing ? "수정" : "등록"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeForm;