import { Modal } from "react-bootstrap";

const DeleteModal = ({show, closeDeleteModal}) => {
    return (
        <Modal show={show} onHide={closeDeleteModal} 
        centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>공유 멤버 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={closeDeleteModal}
          >
            취소
          </button>
          <button 
            type="button" 
            className="btn btn-primary ml-2" 
            id="cPartiOk" 
            
          >
            선택
          </button>
        </div>
      </Modal.Footer>
    </Modal>
    );
}

export default DeleteModal;