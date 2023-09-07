import MailList from "../../comp/email/MailList";



const ReceiveMailPage = () =>{
    return (
        <div>
        <h5 className="m-b-10">받은쪽지함</h5>
        <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
            <li className="breadcrumb-item"><a href="#!">쪽지함</a></li>
            <li className="breadcrumb-item"><a href="#!">받은쪽지함</a></li>
        </ul>
        <MailList getUrl="http://localhost:8081/receivemail"/>
    </div>
    );
};

export default ReceiveMailPage;

