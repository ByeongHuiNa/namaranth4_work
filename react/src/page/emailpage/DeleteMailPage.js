
import MailDelList from "../../comp/email/MailDelList";



const DeleteMailPage = () =>{
    return (
        <div>
        <h5 className="m-b-10">휴지통</h5>
        <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
            <li className="breadcrumb-item"><a href="#!">쪽지함</a></li>
            <li className="breadcrumb-item"><a href="#!">휴지통</a></li>
        </ul>
        <MailDelList />
    </div>
    );
};

export default DeleteMailPage;

