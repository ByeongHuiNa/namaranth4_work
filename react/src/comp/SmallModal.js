const SmallModal = (props) => {
    const closeModal = () => {
        props.closeModal();
    };

    return (
        <div className="modal_background">
        <div className="Modal" onClick={closeModal}>
            <div className="smallModalBody" onClick={(e) => e.stopPropagation()}>
                <div className="col-md-12 modalSet">
                    <div className="card">
                        <div className="card-header">
                            <h5>
                                <i className="bi bi-patch-check iconSet"></i> 모달창입니다
                            </h5>
                            <button id="SmallModalCloseBtn" onClick={closeModal}>
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

export default SmallModal;