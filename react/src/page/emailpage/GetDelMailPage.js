import { useParams } from "react-router";
import axios from 'axios';
import { useEffect, useState} from "react";
import './get.css';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";




const GetDelMailPage = () =>{
    const {mail_no} = useParams();  // router.js의 id값을 가져옴
    const[mail, setMail] = useState({});
    const[mailNo, setMailNo] = useState();
    //const history = useHistory();
    
    const getMail = async (mail_no) => {
        await axios.get(`/getmail/${mail_no}`).then((res)=> {
         console.log(res.data);
         setMail(res.data);
         console.log(res.data);
         setMailNo(res.data.email.mail_no);
        
         
        });
    }
    console.log(mailNo);
    
    const formattedDate = moment(mail.mail_regdate).format('YYYY년 MM월 DD일 HH시 mm분 ss초');

    const formatDate = (dateString) => {
        const formattedDate = moment(dateString).format("YYYY년 MM월 DD일 HH시 mm분 ss초");
        return formattedDate;
      };


    useEffect(() => {
        getMail(mail_no);
    }, []);

    const restoreSubmit = (e) => {
        e.preventDefault();
        console.log("restore");
       
        
        axios.post(`http://localhost:8081/mailrestore`, mailNo, {
            headers: {
              'Content-Type': 'application/json',
            }})
          .then((response) => {
            console.log("성공");
            window.location.href = "http://localhost:3000/email/all";
          })
          .catch((error) => {
            console.log("실패");
            console.log("zz: " + mailNo);
          
            
          });
        
      };

    
    
    return (
        <div>
            {/* <input id="userinfo_name" type="hidden" value={user.user_name} />
            <input id="userinfo_dept" type="hidden" value={dept} />
            <input id="userinfo_position" type="hidden" value={user.user_position} /> */}
            
                <div className="pcoded-content">
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="page-header-title">
                                        <h5 className="m-b-10">메일조회</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
                                        <li className="breadcrumb-item"><a href="/email/allmail">전체쪽지함</a></li>
                                        <li className="breadcrumb-item"><a href="#!">쪽지조회</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                            <form onSubmit={restoreSubmit} method="post">
                                <div className="card-header">
                                        {/* <input type="hidden" name="user_no" value={getmail.user_no} />
                                        <input type="hidden" name="mail_no" value={getmail.mail_no} /> */}
                                        <button type="submit" className="btn btn-primary" id="deleteButton">복구</button>
                                        
                                </div>
                                <div className="card-body">
                                    <h5>보낸사람 : {mail.email && mail.email.user_name}</h5>
                                    <h5>받는사람 : {mail.receivers && mail.receivers.map((receiver, user_no) => (
                                        <span key={user_no}>{receiver.user_name}</span>
                                    ))}
                                       
                                    </h5>
                                    <h5>{formatDate(mail.email && mail.email.mail_regdate)}</h5>
                                    <h5>제목 : {mail.email && mail.email.mail_title}</h5>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div class="form-group">
                                                    <div className="doc-content-table" dangerouslySetInnerHTML={{__html: mail.email && mail.email.mail_content}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
           
        </div>
    );
};

export default GetDelMailPage ;

