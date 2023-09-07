import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";

const MailDelList = () =>{

    const [mails, setMails] = useState([]);

    const getMail = async () => {
      await axios.get("/delmail").then((res) => {
        console.log(res.data);
        setMails(res.data);
      })
    }
    

    useEffect(() => {
      getMail();
    }, [])

    const handleLinkClick = () => {
        window.scrollTo(0, 0); // 페이지 이동 후 상단으로 스크롤 이동
      };
    
    const formatDate = (dateString) => {
        const formattedDate = moment(dateString).format("YYYY년 MM월 DD일 HH시 mm분 ss초");
        return formattedDate;
      };

      
    return (
        <div>
            
            {/* Pre-loader */}
            
            {/* <div className="loader-bg">
                <div className="loader-track">
                    <div className="loader-fill"></div>
                </div>
            </div> */}

            {/* Main Content */}
            
            <div className="container">
                
                <div className="pcoded-content">
                    {/* Breadcrumb */}
                    <div className="page-header">
                        {/* Breadcrumb content here */}
                    </div>

                    {/* 전체메일함 부분 */}
                    {/* <div>
                        <h5 className="m-b-10">전체메일함</h5>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
                            <li className="breadcrumb-item"><a href="#!">메일함</a></li>
                            <li className="breadcrumb-item"><a href="#!">전체메일함</a></li>
                        </ul>
                    </div> */}

                    {/* Table and buttons */}
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                            <form method="post">
                                <button type="button" className="btn btn-primary">복구</button>
                                <button type="button" className="btn btn-primary">답장</button>
                                <button type="button" className="btn btn-primary">전달</button>
                                
                            </form>
                            </div>
                            <div className="card-body table-border-style">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" /></th>
                                                <th>발신자</th>
                                                <th>제목</th>
                                                <th>날짜</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {mails.map((mail) => (
                                                
                                            <tr key={mail.mail_no}>
                                                
                                                
                                                <td><input type="checkbox"/></td>
                                                <td>{mail.user_name}</td>
                                                <td><Link to={`/email/getdelmail/${mail.mail_no}`} onClick={handleLinkClick}>{mail.mail_title}</Link></td>
                                                <td>{formatDate(mail.mail_regdate)}</td>
                                                
                                            </tr>
                                           
                                            ))}

                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MailDelList;

