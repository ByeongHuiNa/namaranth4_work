import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentView from "../comp/approval/DocumentView";

const AppViewPage = () =>{

    const {id} = useParams();
    const [document, setDocument] = useState({});
    const [refList, setRefList] = useState([]);
    const [firstAppUser, setFirstAppUser] = useState({});
    const [secondAppUser, setSecondAppUser] = useState({});
    const [appList, setAppList] = useState([]);
    const [rejList, setRejList] = useState([]);
    const [firstAppCheck, setFirstAppCheck] = useState("");
    const [secondAppCheck, setSecondAppCheck] = useState("");
    const [rejContent, setRejContent] = useState("");
    const [isRejDocument, setRejDoucment] = useState(false);
    const [isAppCompDocument, setAppCompDoucment] = useState(false);
    
    const getDocu = async (id) =>{
        await axios.get(`/docboard/${id}`).then((res)=>{
            console.log(res.data);
            setDocument(res.data);
        });
        await axios.get(`/docboard/${id}/ref`).then((res)=>{
            console.log(res.data);
            setRefList(res.data);
        });
        await axios.get(`/docboard/${id}/first-app`).then((res)=>{
            console.log(res.data);
            setFirstAppUser(res.data);
        });
        await axios.get(`/docboard/${id}/second-app`).then((res)=>{
            console.log(res.data);
            setSecondAppUser(res.data);
        });
        await axios.get(`/docboard/${id}/get-app-list`).then((res)=>{
            console.log(res.data);
            setAppList(res.data);
        });
        await axios.get(`/docboard/${id}/get-rej-list`).then((res)=>{
            console.log(res.data);
            setRejList(res.data);
        });
        await axios.get(`/docboard/${id}/get-rej-content`).then((res)=>{
            console.log(res.data);
            setRejContent(res.data);
        });
    };
    
    
    useEffect(()=>{
        getDocu(id);
    },[id]);

    const checkFirstApp = () =>{
        if(appList.includes(firstAppUser.user_no)){
            setFirstAppCheck("app");
        }else{
            if(rejList.includes(firstAppUser.user_no)){
                setFirstAppCheck("rej")
            }else{}
        }
    };

    const checkSecondApp = () =>{
        if(appList.includes(secondAppUser.user_no)){
            setSecondAppCheck("app");
        }else{
            if(rejList.includes(secondAppUser.user_no)){
                setSecondAppCheck("rej")
            }else{}
        }
        console.log(appList);
    }

    const checkRejAndAppCompDocument = () => {
        console.log(rejList.length);
        console.log(appList.length);
        if(rejList.length>0){
            setRejDoucment(true);
        }
        if(appList.length===2){
            setAppCompDoucment(true);
        }
    }

    useEffect(()=>{
        checkFirstApp();
        checkSecondApp();
        checkRejAndAppCompDocument();
    },[appList, secondAppUser, firstAppUser, rejList]);
    
    

    return(
        <DocumentView
        document={document} refList={refList} firstAppUser={firstAppUser} secondAppUser={secondAppUser}
        firstAppCheck={firstAppCheck} secondAppCheck={secondAppCheck} rejContent={rejContent} getDocu={getDocu}
        isRejDocument={isRejDocument} isAppCompDocument={isAppCompDocument}
        />
    );
}

export default AppViewPage;