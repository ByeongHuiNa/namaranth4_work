

const GetMail = () =>{
  
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
                                        <li className="breadcrumb-item"><a href="/email/allmail">전체메일함</a></li>
                                        <li className="breadcrumb-item"><a href="#!">메일조회</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <form role="form" action="/email/maildel" method="post">
                                        {/* <input type="hidden" name="user_no" value={getmail.user_no} />
                                        <input type="hidden" name="mail_no" value={getmail.mail_no} /> */}
                                        <button type="submit" className="btn btn-primary" id="deleteButton">삭제</button>
                                        <button type="button" className="btn btn-primary">전달</button>
                                        <button type="button" className="btn btn-primary">답장</button>
                                    </form>
                                </div>
                                <div className="card-body">
                                    <h5>보낸사람 : {/*getmail.user_name*/} {/*getmail.user_email*/}</h5>
                                    <h5>받는사람 : 
                                        {/* {getreceiver.map((receiver) => (
                                            <span key={receiver.user_email}>{receiver.user_name} {receiver.user_email} </span>
                                        ))} */}
                                    </h5>
                                    <h5>(날짜)</h5>
                                    <h5>제목 : {/*getmail.mail_title*/}</h5>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form>
                                                내용
                                                <div className="form-group">
                                                    <div className="doc-content-table">{/*getmail.mail_content*/}</div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           
        </div>
    );
};

export default GetMail;

