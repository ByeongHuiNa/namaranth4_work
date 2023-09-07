import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router";

const GetTsMailPage = () =>{
    const {mailts_no} = useParams();
    const[tsmail, setTsMail] = useState({});

    const [user_no, setSendNo] = useState('')
    const [mailts_title, setMailTsTitle] = useState('');
    const [receiver_no, setReceiverNo] = useState('');
    const [mailts_content, setMailTsContent] = useState('');

    const getTsMail = async (mailts_no) => {
        await axios.get(`/gettsmail/${mailts_no}`).then((res)=> {
         console.log(res.data);
         setTsMail(res.data);
         setSendNo(res.data.user_no);
         setMailTsTitle(res.data.mailts_title);
         setMailTsContent(res.data.mailts_content);
         
        });
    }
    useEffect(() => {
        getTsMail(mailts_no);
    }, []);

    const handleQuillChange = (content) => {
        setMailTsContent(content); // React 상태를 업데이트
      };
    
    
    useEffect(() => {
        // 변경된 값들을 출력하거나 다른 화면 변경 로직을 추가할 수 있습니다.
        console.log('sendNo 변경:', user_no);
        console.log('mailTitle 변경:', mailts_title);
        console.log('receiverNo 변경:', receiver_no);
        console.log('mailContent 변경:', mailts_content);
    
        // 예: 변경된 값을 이용한 화면 갱신 또는 서버로 데이터 전송 등의 로직을 추가할 수 있습니다.
    
      }, [user_no, mailts_title, receiver_no, mailts_content]); 

    const registerSubmit = (e) => {
        e.preventDefault();
        console.log("Reg");
        const formData = {
            user_no: user_no,
            mail_title: mailts_title,
            mail_content: mailts_content,
           
        };
        
        axios.post(`/register/${receiver_no}/${mailts_no}`, formData)
          .then((response) => {
            console.log("성공");
            window.location.href = "http://localhost:3000/email/all";
          })
          .catch((error) => {
            console.log("실패");
            console.log(user_no);
            console.log(mailts_title);
            console.log(receiver_no);
            console.log(mailts_content);
          });
      };


      const tsRegisterSubmit = (e) => {
        e.preventDefault();
        console.log("tsReg");
        const formData = {
            user_no: user_no,
            mail_title: mailts_title,
            mail_content: mailts_content,
           
        };
        
        axios.post(`http://localhost:8081/tsregister`, formData)
          .then((response) => {
            console.log("성공");
            window.location.href = "http://localhost:3000/email/all";
          })
          .catch((error) => {
            console.log("실패");
            console.log(user_no);
            console.log(mailts_title);
            console.log(mailts_content);
          });
      };

     

    return (
        <div>

            {/* [ Main Content ] start */}
            <input id="userinfo_name" type="hidden" /*value={user.user_name}*/ />
            <input id="userinfo_dept" type="hidden" /*value={dept}*/ />
            <input id="userinfo_position" type="hidden" /*value={user.user_position}*/ />
            <section className="container">
                <div className="pcoded-content">
                    {/* [ breadcrumb ] start */}
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="page-header-title">
                                        <h5 className="m-b-10">쪽지작성</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
                                        <li className="breadcrumb-item"><a href="#!">쪽지</a></li>
                                        <li className="breadcrumb-item"><a href="#!">쪽지작성</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* [ breadcrumb ] end */}
                    {/* [ Main Content ] start */}
                    <input id="userinfo_name" type="hidden" /*value={user.user_name}*/ /><input id="userinfo_dept" type="hidden" /*value={dept} *//><input id="userinfo_position" type="hidden" /*value={user.user_position}*/ />

                    <div className="row">

                        {/* [ form-element ] start */}
                        <form onSubmit={registerSubmit} method="post">
                            <div className="col-sm-12">
                                <div className="card" style={{height:"600px"}}>
                                    <div className="card-header">

                                        <button type="submit" className="btn  btn-primary" id="registerButton">전송</button>
                                        <button type="submit" onClick={tsRegisterSubmit} className="btn  btn-primary" id="tsButton">임시저장</button>
                                       
                                    </div>

                                    <div className="card-body" >
                                        보내는 사람<input id="userinfo_no " type="text" value={user_no}  onChange={(e) => setSendNo(e.target.value)}/*value={user.user_no}*/ />
                                        <input type="hidden" name="mailts_no" value={mailts_no}/>
                                        <h5>제목<input type="text" value={mailts_title}  onChange={(e) => setMailTsTitle(e.target.value)} style={{ marginLeft: '35px' }} /> </h5>
                                        <h5>받는사람 <input type="text" id="firstSearchInput" value={receiver_no}  onChange={(e) => setReceiverNo(e.target.value)}/> </h5>
                                        <div id="fisrtSearchResults" style={{ display: 'none' }}>
                                            {/* 검색 결과를 드롭다운으로 표시할 영역 */}
                                        </div>

                                        <hr />
                                        <div className="row">

                                            <div className="col-md-12">
                                                <form>
                                                    
                                                    <ReactQuill 
                                                        style={{height: "300px" }}
                                                        value={mailts_content}
                                                        onChange={handleQuillChange}
                                                        
                                                        />
                                                    {/* <div className="form-group">

                                                        <textarea className="form-control" id="summernote" name="mail_content" rows="3" readOnly="readOnly"></textarea>
                                                    </div> */}
                                                    

                                                </form>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </form>

                    </div>
                    {/* [ form-element ] end */}
                </div>
                {/* [ Main Content ] end */}

            </section>
              {/* { Required Js
              <script src="../../../resources/dist/assets/js/vendor-all.min.js"></script>
            <script src="../../../resources/dist/assets/js/plugins/bootstrap.min.js"></script>
            <script src="../../../resources/dist/assets/js/pcoded.min.js"></script>

            <script src="../../../resources/dist/assets/js/summernote-lite.js"></script>
            <script src="../../../resources/dist/assets/js/lang/summernote-ko-KR.js"></script>
            
            <script src="../../../resources/dist/assets/js/plugins/apexcharts.min.js"></script>

            <script src="../../../resources/dist/assets/js/pages/dashboard-main.js"></script>

            <script type="text/javascript">
                
            </script> } */}
            {/* [ Main Content ] end */}
            {/* <script type="text/javascript">
            $(document).ready(function() {
                $('#summernote').summernote({
                    height: 300,                 // 에디터 높이
                    minHeight: null,             // 최소 높이
                    maxHeight: null,             // 최대 높이
                    focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
                    lang: "ko-KR",					// 한글 설정
                    placeholder: '최대 2048자까지 쓸 수 있습니다'	//placeholder 설정
                    
                })
            });
            </script> */}
            
            
      

           
        </div>
    );
};

export default GetTsMailPage;