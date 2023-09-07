import MailList from "../../comp/email/MailList";
import MailTsList from "../../comp/email/MailTsList";



const TsMailPage = () =>{
    return (
        <div>
        <h5 className="m-b-10">임시보관함</h5>
        <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
            <li className="breadcrumb-item"><a href="#!">쪽지함</a></li>
            <li className="breadcrumb-item"><a href="#!">임시보관함</a></li>
        </ul>
        <MailTsList/>
    </div>
    );
};

export default TsMailPage;

