const Modal = (props) => {
    const closeModal = () => {
        props.closeModal();
    };

    return (
        <div className="modal_background">
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                <div className="col-md-12 modalSet">
                    <div className="card">
                        <div className="card-header">
                            <h5>
                                <i className="bi bi-patch-check iconSet"></i>{props.message}
                            </h5>
                            <button id="modalCloseBtn" onClick={closeModal}>
                                ✖
                            </button>
                        </div>
                        <div className="card-body main-card-body" style={{padding: '10'}}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Modal;