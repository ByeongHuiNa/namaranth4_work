import { useHistory } from "react-router-dom";

const DocumentList = (props) => {
    const {list} = props
    const history=useHistory();

    const getDocument = (id) => {
        history.push(`app/${id}`);
        //axios.get(`/docboard/${id}`);
    }
    
    const editDocument = () =>{
        history.push(`app/edit`);
    }

    return (
        <div className="col-md-12">
            {/* Breadcrumb */}
            <div className="page-header">
                <div className="page-block">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="page-header-title m-t-20">
                                <h5 className="m-b-10">기안문서함</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
                                <li className="breadcrumb-item"><a href="#!">기안문서함</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="row">
                <div className="col-sm-12">
                    <div className="card borderless">
                        <div className="card-header">
                            <div className="subtt">
                                <h5>기안문서</h5>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary" onClick={editDocument}>기안작성</button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="card-body table-border-style">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>문서번호</th>
                                            <th>제목</th>
                                            <th>기안자</th>
                                            <th>결재상태</th>
                                            <th>기안일자</th>
                                        </tr>
                                    </thead>
                                    <tbody id="doc_list">
                                        {list.map((document) => (
                                            <tr className="list_btn" key={document.doc_no} onClick={()=>getDocument(document.doc_no)}>
                                                <td className="doc_no">{document.doc_no}</td>
                                                <td>{document.doc_title}</td>
                                                <td>{document.user.user_name}</td>
                                                <td>{document.doc_status}</td>
                                                <td>{document.doc_regdate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        {/* {props.pageMaker.prev && (
                                            <li className="page-item paginate_button">
                                                <a className="page-link" href={props.pageMaker.startPage - 1}>Previous</a>
                                            </li>
                                        )}
                                        {props.pageMaker.pages.map((num) => (
                                            <li className={`page-item paginate_button ${props.pageMaker.cri.pageNum === num ? "active" : ""}`} key={num}>
                                                <a className="page-link" href={num}>{num}</a>
                                            </li>
                                        ))}
                                        {props.pageMaker.next && (
                                            <li className="page-item paginate_button">
                                                <a className="page-link" href={props.pageMaker.endPage + 1}>Next</a>
                                            </li>
                                        )} */}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentList;