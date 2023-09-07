
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import DocumentRegiModal from "./DocumentRegiModal";
import "../../Document.css"

const DocumentRegi = () =>{

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [firstAppUser, setFirstAppUser] = useState([]);
    const [secondAppUser, setSecondAppUser] = useState([]);
    const [isFirstAppModalOpen, setFirstAppModalOpen] = useState(false);
    const [isSecondAppModalOpen, setSecondAppModalOpen] = useState(false);
    
    const openFirstAppModal = () => setFirstAppModalOpen(true);
    const closeFirstAppModal = () => setFirstAppModalOpen(false);

    const openSecondAppModal = () => setSecondAppModalOpen(true);
    const closeSecondAppModal = () => setSecondAppModalOpen(false);

    const getTitle = (e) =>{
        setTitle(e.target.value);
        console.log(e.target.value);
        console.log(firstAppUser);
    }
    const getContent = (data)=>{
        setContent(data);
    };

    const selectTemplate = (e) =>{
        console.log(e.target.value);
        const replcaeContent = content.replace(/<p><br><\/p>/gi, '');
        console.log(replcaeContent);
        if(replcaeContent){
            const confirm = window.confirm('값이 존재합니다 바꾸시겠습니까?');
            if(confirm){
                templateList(e);
            }else{}
        }else{
            templateList(e);
        }
    }

    const templateList = (e) =>{
        const template = e.target.value;
        if (template === 'expense_report') {
            const tableHtml = `<table class="table table-bordered"><tbody><tr><td colspan="3" style="text-align: center; "><b><span style="font-size: 28px;">지출결의서</span></b></td></tr><tr><td style="text-align: center; ">총 지출 금액</td><td colspan="2" style="text-align: right; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 000,000,000원&nbsp;</td></tr><tr><td rowspan="10" style="text-align: center; ">내역</td><td style="text-align: center; ">적요</td><td style="text-align: center;">금액</td></tr><tr><td><br></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></tbody></table>`;
            setContent(tableHtml);
        }
        if (template === 'vacation_app') {
            const tableHtml = `<table class="table table-bordered"><tbody><tr><td colspan="3" style="text-align: center; "><b><span style="font-size: 28px;">휴가신청서</span></b></td></tr><tr><td style="text-align: center; ">휴가 신청일</td><td colspan="2" style="text-align: center; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; @@일&nbsp;</td></tr><tr><td style="text-align: center; ">시작일</td><td colspan="2">00월 00일</td></tr><tr><td style="text-align: center; ">종료일</td><td colspan="2">00월 00일</td></tr><tr><td style="text-align: center; ">계획</td><td colspan="2"></td></tr></tbody></table>`;
            setContent(tableHtml);
        }
        if (template === 'round_robin') {
            const tableHtml = `<table class="table table-bordered"><tbody><tr><td colspan="3" style="text-align: center; "><b><span style="font-size: 28px;">지출품의서</span></b></td></tr><tr><td style="text-align: center; ">품의 금액</td><td colspan="2" style="text-align: right; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;000,000,000원</td></tr><tr><td colspan="3" style="text-align: center; ">품의 사유 및 상세 내역</td></tr><tr><td colspan="3"></td></tr></tbody></table>`;
            setContent(tableHtml);
        }
    }

    const submitHandler = () =>{
        let check = false
        const replcaeContent = content.replace(/<p><br><\/p>/gi, '');
        if(!title){
            check = true;
            alert('제목을 작성해주세요');
        }
        if(!replcaeContent){
            check = true;
            alert('내용을 작성해주세요');
        }
        if(firstAppUser.length===0){
            check = true;
            alert('결재자가 비어있습니다.');
        }
        if(secondAppUser.length===0){
            check = true;
            alert('결재자가 비어있습니다.');
        }
        if(!check){
            console.log('등록');
        }
    }

    

    return(
        <div>
            <div className="page-header">
                <div className="page-block">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="page-header-title m-t-20">
                                <h5 className="m-b-10">문서</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
                                <li className="breadcrumb-item"><a href="#!">기안문서</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="card borderless">
                        <div className="card-header">
                            <h5>문서</h5>
                        </div>


                        <div className="card-body">


                            <div className="main_header">
                                <div className="main_left">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>제목</td>
                                            <td className="title_length"><input type="text" value={title} onChange={getTitle}/></td>
                                        </tr>
                                        <tr>
                                            <td>기안자</td>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <select id="templateDropdown" onChange={selectTemplate}>
                                        <option value="" disabled selected>양식선택</option>
                                        <option value="expense_report">지출결의서</option>
                                        <option value="vacation_app">휴가신청서</option>
                                        <option value="round_robin">품의서</option>
                                    </select>
                                </div>

                                <div className="main_right">
                                    <button type="button" className="btn  btn-primary" style={{marginRight: 20}} onClick={openFirstAppModal}>1차 결재자</button>
                                    <button type="button" className="btn  btn-primary" onClick={openSecondAppModal}>2차 결재자</button>

                                    <br />

                                    <table id="tb">
                                        <tr>
                                            <th>1차 결재</th>
                                            <td className="sec_tb" style={{borderTop: 'none', borderBottom: 'none', width: 20}}></td>
                                            <th>2차 결재</th>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td className="sec_tb" style={{borderTop: 'none', borderBottom: 'none', width: 20, height: 90}}></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td id="firstSelectedApprovalUser" className="selected-boxs">{firstAppUser&& firstAppUser.map(data=>{return  `${data.user_position} ${data.user_name}`})}</td>
                                            <td className="sec_tb" style={{borderTop: 'none', borderBottom: 'none', width: 20, height: 25}}></td>
                                            <td id="secondSelectedApprovalUser" className="selected-boxs">{secondAppUser&& secondAppUser.map(data=>{return  `${data.user_position} ${data.user_name}`})}</td>
                                        </tr>
                                    </table>
                                </div>



                                <br />
                            </div>
                            <br />
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    getContent(data);
                                    //console.log( { event, editor, data } );
                                    console.log(content);
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                            <div className="mt-3">
                                <button type="button" className="btn btn-primary" onClick={submitHandler}>작성</button>
                                <button type="button" className="btn btn-secondary" style={{marginLeft: '10px'}}>임시저장</button>
                            </div>
                            <input type="hidden" name="first_app" id="first_app_input" />
                            <input type="hidden" name="second_app" id="second_app_input" />
                        </div>


                    </div>
                </div>
            </div>
            <div>
                <DocumentRegiModal 
                isFirstAppModalOpen={isFirstAppModalOpen} isSecondAppModalOpen={isSecondAppModalOpen}
                closeFirstAppModal={closeFirstAppModal} closeSecondAppModal={closeSecondAppModal}
                firstAppUser={firstAppUser} setFirstAppUser={setFirstAppUser}
                secondAppUser={secondAppUser} setSecondAppUser={setSecondAppUser}
                />
            </div>
        </div>
    );
}

export default DocumentRegi;