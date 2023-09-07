import moment from "moment"

const DocumentMainList = ({ documents }) => {
    return (
        <div className="card-body">
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active readDoc"
                    id="pills-home" role="tabpanel"
                    aria-labelledby="pills-home-tab">
                    <ul>
                        {
                            documents.map((document) => {
                                let formattedDocTimeW = moment(document.doc_regdate).format('YYYY/MM/DD');
                                return(
                                    document.doc_status == '결재 대기' && (
                                        <li><i className="bi bi-stop-fill listIconSet"></i>
                                        <strong>{document.doc_title}</strong>　<small>{formattedDocTimeW} (대기중)</small></li>
                                    )
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="tab-pane fade readDoc" id="pills-profile"
                    role="tabpanel" aria-labelledby="pills-profile-tab">
                    <ul>
                        {
                            documents.map((document) => {
                                let formattedDocTimeC = moment(document.doc_regdate).format('YYYY/MM/DD');
                                if(document.doc_status == '결재 완료'){
                                    return (
                                        <li><i className="bi bi-stop-fill listIconSet"></i>
                                        <strong>{document.doc_title}</strong>　<small>{formattedDocTimeC} (승인)</small></li>
                                    )   
                                } else if (document.doc_status == '반려'){
                                    return (
                                        <li><i className="bi bi-stop-fill listIconSet"></i>
                                        <strong>{document.doc_title}</strong>　<small>{formattedDocTimeC} (반려)</small></li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default DocumentMainList;