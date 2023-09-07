import { Modal } from "react-bootstrap";
import "../../Modal.css";
import { useState } from "react";
import AutoSearch from "../AutoSearch";
import axios from "axios";
import { useParams } from "react-router-dom";

const DocumentModal = (props)=>{

    const {isAppModalOpen, isRejModalOpen, isRefModalOpen, isRejContentModalOpen,
        closeAppModal, closeRejModal, closeRefModal, closeRejContentModal,
        rejContent, getDocu
    } = props;

    const {id} = useParams();

    const [refAddList, setRefAddList] = useState([]);
    const submitHandler = ()=>{
        if(refAddList.length!==0){
            axios.post(`/docboard/${id}/post-ref-list`, refAddList
            ).then(()=>{
                closeRefModal();
            });
            getDocu(id);
        }else{
            alert('추가한 참조자가 없습니다.');
        }
    }

    return(
        <div>
            <Modal show={isAppModalOpen} onHide={closeAppModal}>
                <Modal.Header>
                    <Modal.Title>결재</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <label for="recipient-name" className="col-form-label">결재하시겠습니까?</label>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary">확인</button>
                    <button className="btn btn-secondary" onClick={closeAppModal}>닫기</button>
                </Modal.Footer>
            </Modal>

            <Modal show={isRejModalOpen} onHide={closeRejModal}>
                <Modal.Header>
                    <Modal.Title>반려 의견 작성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <input type="hidden" name="doc_no" value="${get.doc_no }"/>
				<label for="message-text" className="col-form-label">의견작성:</label>
                <textarea className="form-control" name="docrej_content" id="message-text"></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary">확인</button>
                    <button className="btn btn-secondary" onClick={closeRejModal}>닫기</button>
                </Modal.Footer>
            </Modal>

            <Modal show={isRefModalOpen} onHide={closeRefModal}>
                <Modal.Header>
                    <Modal.Title>참조 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AutoSearch setRefAddList={setRefAddList} title={"참조자"} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={submitHandler}>확인</button>
                    <button className="btn btn-secondary" onClick={closeRefModal}>닫기</button>
                </Modal.Footer>
            </Modal>

            <Modal show={isRejContentModalOpen} onHide={closeRejContentModal}>
                <Modal.Header>
                    <Modal.Title>반려 의견</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p class="mb-0">{rejContent?rejContent:''}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={closeRejContentModal}>닫기</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DocumentModal;