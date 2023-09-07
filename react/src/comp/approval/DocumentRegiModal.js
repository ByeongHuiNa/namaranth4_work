import { Modal } from "react-bootstrap";
import AutoSearch from "../AutoSearch";

const DocumentRegiModal = (props)=>{
    const { isFirstAppModalOpen, isSecondAppModalOpen,
        closeFirstAppModal, closeSecondAppModal,
        firstAppUser, setFirstAppUser,
        secondAppUser, setSecondAppUser
    } = props;

    const first_app = true;
    const second_app = true;

    return(
        <div>
            <Modal show={isFirstAppModalOpen} onHide={closeFirstAppModal}>
                <Modal.Header>
                    <Modal.Title>1차 결재선 지정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AutoSearch setFirstAppUser={setFirstAppUser} first_app={first_app} firstAppUser={firstAppUser} title={"결재자"}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={closeFirstAppModal}>확인</button>
                    <button className="btn btn-secondary" onClick={closeFirstAppModal}>닫기</button>
                </Modal.Footer>
            </Modal>

            <Modal show={isSecondAppModalOpen} onHide={closeSecondAppModal}>
                <Modal.Header>
                    <Modal.Title>2차 결재선 지정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AutoSearch setSecondAppUser={setSecondAppUser} second_app={second_app} title={"결재자"}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={closeSecondAppModal}>확인</button>
                    <button className="btn btn-secondary" onClick={closeSecondAppModal}>닫기</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DocumentRegiModal;