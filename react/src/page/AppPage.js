import { useEffect, useState } from "react";
import DocumentList from "../comp/approval/DocumentList";
import axios from "axios";
import moment from "moment";

const AppPage = () =>{
    const [list, setList] = useState([]);

    const getList = async () =>{
        await axios.get('/docboard').then((res)=>{
            console.log(res.data);
            const formatList = res.data.map((document)=>{
                const formatDate = moment(document.doc_regdate).format('YYYY년 MM월 DD일 HH:mm');
                
                return{
                    ...document,
                    doc_regdate:formatDate,
                };
            });
            setList(formatList);
        })
    }

    useEffect(()=>{
        getList();
    },[])

    return (
        <DocumentList list={list}/>
    );
};

export default AppPage;

