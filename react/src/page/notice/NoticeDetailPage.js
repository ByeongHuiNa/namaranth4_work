import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import moment from "moment"
import Modal from "../../comp/Modal";
import SmallModal from "../../comp/SmallModal";

const NoticeDetailPage = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState({});
    const [user, setUser] = useState({});
    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    
    const noticeDetail = () => {
        axios.get(`/notice/get/${id}`).then((res) => {
            console.log(res.data)
            setNotice(res.data.notice);
            setUser(res.data.user);
        })
    }

    const regdate = (reg) => {
        return moment(reg).format('YYYY/MM/DD');
    }

    useEffect(() => {
        noticeDetail(id);
    }, [id]);

    const showModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const isWriter = () => {
        return notice.user.user_no == user.user_no ? true : false;
    }

    const goList = () => {
        history.push(`/notice/list`);
    }

    const goEdit = () => {
        if(isWriter()){
            history.push(`/notice/modify/${id}`);
        } else {
            showModal();
        }
    }

    const goDelete = () => {
        if(isWriter()){
            // 작성자가 맞는 경우
            axios.post(`/notice/remove/${id}`).then(() => {
                alert('삭제 완료!');
                history.push(`/notice/list`);
            })
        }else{
            // 작성자가 아닌 경우
            showModal();
        }
    }

    return (
        <div class="pcoded-main-container" id="noticeDetail">
            <div class="pcoded-content">
                <div class="page-header" id="noticeHeader">
                    <div class="page-block">
                        <div class="row align-items-center">
                            <div class="col-md-12">
                                <div class="page-header-title">
                                    <h5 class="m-b-10"><i class="bi bi-journal-bookmark-fill iconSet"></i> <strong>공지사항 조회</strong></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card" id="detailBox">
                            <div class="card-header">
                                <h6 class="align-middle" style={{marginBottom:"0px"}}><small>[title]</small>　<strong>{notice.noti_title}</strong></h6>
                                <div class="card-header-right">
                                    <div class="btn-group card-option">
                                        <small className='text-muted'>{regdate(notice.noti_regdate)}</small>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div>
                                    {notice.noti_content}
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end" id="detailBtn">
                            <div id="getListForm">
                                <button type="button" class="btn btn-primary" onClick={goList}>목록</button>
                            </div>
                            <div id="getModifyForm">
                                <button type="button" class="btn btn-primary" onClick={goEdit}>수정</button>
                            </div>
                            <div id="getDeleteForm">
                                <button type="button" class="btn btn-primary" onClick={goDelete}>삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
                {modalOpen && (
                    <SmallModal closeModal={() => closeModal()}>
                        <div>
                            작성자만 수정/삭제할 수 있습니다.
                        </div>
                    </SmallModal>   
                )}
            </div>
        </div>
    );
};

export default NoticeDetailPage;