import NoticeList from "../../comp/notice/NoticeList";

const NoticeListPage = () =>{
    return (
        <section>
            <div className="pcoded-content" id="noticePage">
                <div className="row">
                    <div className="col-md-12">
                            <NoticeList/>
                    </div>
                </div>
            </div> 
        </section>
    );
};

export default NoticeListPage;