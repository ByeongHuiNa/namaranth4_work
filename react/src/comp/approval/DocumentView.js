import { useState } from "react";
import DocumentModal from "./DocumentModal";

const DocumentView = (props) =>{
    const {document, refList, firstAppUser, secondAppUser, firstAppCheck, secondAppCheck, rejContent, getDocu,
        isRejDocument, isAppCompDocument} = props;
    const [isAppModalOpen, setAppModalOpen] = useState(false);
    const [isRejModalOpen, setRejModalOpen] = useState(false);
    const [isRefModalOpen, setRefModalOpen] = useState(false);
    const [isRejContentModalOpen, setRejContentModalOpen] = useState(false);

    // 모달 열기/닫기 함수 정의
    const openAppModal = () => {setAppModalOpen(true); console.log("click")};
    const closeAppModal = () => setAppModalOpen(false);

    const openRejModal = () => setRejModalOpen(true);
    const closeRejModal = () => setRejModalOpen(false);

    const openRefModal = () => setRefModalOpen(true);
    const closeRefModal = () => setRefModalOpen(false);

    const openRejContentModal = () => setRejContentModalOpen(true);
    const closeRejContentModal = () => setRejContentModalOpen(false);
    return(
        <div className="col-md-12">
            {/* [ breadcrumb ] start */}
            <div className="page-header">
                <div className="page-block">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="page-header-title m-t-20">
                                <h5 className="m-b-10">문서</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="index.html"><i className="feather icon-home"></i></a>
                                </li>
                                <li className="breadcrumb-item"><a href="#!">기안문서</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* [ breadcrumb ] end */}

            {/* [ Main Content ] start */}
            <div className="row">
                <div className="col-sm-12">
                    <div className="card borderless">
                        <div className="card-header">
                            <div className="header-info">
                                <table style={{ marginBottom: 20 }}>
                                    <tbody>
                                        <tr>
                                            <td className="tb_title" style={{ fontSize: 20, fontWeight: 'bold', paddingRight: 28, marginBottom: 10 }}>제목</td>
                                            <td style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 10 }}>{document.doc_title}</td>
                                        </tr>
                                        <tr>
                                            <td className="tb_title" style={{ fontSize: 20, fontWeight: 'bold', paddingRight: 28, marginBottom: 10 }}>문서 번호</td>
                                            <td style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 10 }}>{document.doc_no}</td>
                                        </tr>
                                        <tr>
                                            <td className="tb_title" style={{ fontSize: 20, fontWeight: 'bold', paddingRight: 28, marginBottom: 10 }}>기안자</td>
                                            <td style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 10 }}>{document.user && document.user.user_name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <p style={{ marginBottom: 2 }}>참조자 목록</p>
                                    <div style={{ overflow: 'scroll', overflowX: 'hidden', width: '500px', height: '50px', padding: '10px', backgroundColor: '#EAEAEA' }}>
                                        {refList&& refList.map((list, index) => (
                                            <div className="refList" key={index}>
                                                {list.user_name} {list.user_email} {list.dept.dept_name} {list.user_position}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div class="tbl_wrap">
                                <table id="tb">
                                    <tr>
                                        <th>1차 결재</th>
                                        <td className="sec_tb" style={{ borderTop: 'none', borderBottom: 'none', width: 20 }}></td>
                                        <th>2차 결재</th>
                                    </tr>
                                    <tr>
                                        <td id="firstApprovalimg" style={{ height: 90 }}>
                                            {firstAppCheck === "app" ? <img src='/bootstrap/images/app/app.png' style={{width: 90, height: 90}}/> : firstAppCheck === "rej" ? <img src='/bootstrap/images/app/rej.png' style={{width: 90, height: 90}}/> : ""}

                                        </td>
                                        <td className="sec_tb" style={{ borderTop: 'none', borderBottom: 'none', width: 20, height: 90 }} ></td>
                                        <td id="secondApprovalimg">
                                            {secondAppCheck === "app" ? <img src='/bootstrap/images/app/app.png' style={{width: 90, height: 90}}/> : secondAppCheck === "rej" ? <img src='/bootstrap/images/app/rej.png' style={{width: 90, height: 90}}/> : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="firstApprovalUser" className="selected-boxs" style={{ height: 25 }}>{firstAppUser&&firstAppUser.user_position} {firstAppUser&&firstAppUser.user_name}</td>
                                        <td className="sec_tb" style={{ borderTop: 'none', borderBottom: 'none', width: 20 }}></td>
                                        <td id="secondApprovalUser" className="selected-boxs">{secondAppUser&&secondAppUser.user_position} {secondAppUser&&secondAppUser.user_name}</td>
                                    </tr>
                                </table>
                                {rejContent!==""?
                                <div className="rc_btn">
                                    <button type="button" id="rc_modal_btn" className="btn  btn-primary" onClick={openRejContentModal}>반려 의견</button>
                                </div>
                                :<div className="rc_btn"></div>}
                            </div>
                        </div>
                        {/* Document contents */}
                        <div className="card-body">
                            <div className="on_body" style={{ padding: "30" }}>
                                <div className="doc-content-table" dangerouslySetInnerHTML={{ __html: document.doc_content }}></div>
                            </div>
                            {(isRejDocument===false&&isAppCompDocument===false)?
                            <>
                            <button type="button" id="app_modal_btn" className="btn btn-primary ml-1" onClick={openAppModal}>결재</button>
                            <button type="button" id="rej_modal_btn" className="btn btn-primary ml-1" onClick={openRejModal}>반려</button>
                            </> : <></>}
                            <button type="button" id="ref_modal_btn" className="btn btn-primary ml-1" onClick={openRefModal}>참초</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal 및 Hidden Inputs */}
            <DocumentModal
                isAppModalOpen={isAppModalOpen} isRejModalOpen={isRejModalOpen} isRefModalOpen={isRefModalOpen} isRejContentModalOpen={isRejContentModalOpen}
                closeAppModal={closeAppModal} closeRejModal={closeRejModal} closeRefModal={closeRefModal} closeRejContentModal={closeRejContentModal}
                rejContent={rejContent} getDocu={getDocu}
            />

        </div>
    );
}

export default DocumentView;