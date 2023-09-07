import axios from "axios";
import { useEffect, useState } from "react";
import "../AutoSearch.css";

const AutoSearch = (props) =>{
    const {setFirstAppUser, setSecondAppUser,first_app, second_app, setRefAddList, title} = props;

    const[userIndex, setUserIndex] = useState([]);
    const[userList, setUserList] = useState([]);
    const[searchValue, setSearchValue] = useState("");
    const[addUser, setAddUser] = useState([]);


    const getUser = () =>{
        axios.get('http://localhost:8081/userlist').then((res)=>{
            console.log(res.data);
            setUserIndex(res.data);
        })
    };
    useEffect(()=>{
        getUser();
    },[]);

    const SearchHandler = (e) =>{
        const data = e.target.value;
        setSearchValue(data);
        listHandler(data);
    }

    const listHandler = (value)=>{
        console.log(value);
        const filterdata = userIndex.filter((data)=>{
            return data.user_email.includes(value) || data.user_name.includes(value) || data.dept.dept_name.includes(value);
        })
        if(value===""){
            setUserList(null);
        }else{
            setUserList(filterdata);
        }
        console.log(filterdata);
    }

    const addList = (id) =>{
        const filterdata = userIndex.filter((data)=>{
            return data.user_no===id;
        });

        const submitdata = addUser.filter((data)=>{
            return data.user_no===id
        }).map(data=>data.user_no);
        if(Number(submitdata)!==id){
            if(first_app===true||second_app===true){
                const indexList = filterdata;
                setAddUser(indexList);
                console.log(indexList);
                if(first_app===true){
                    setFirstAppUser(indexList);
                }else{
                    setSecondAppUser(indexList);
                }
            }else{
                const indexList = [
                    ...addUser,
                    ...filterdata,
                ];
                setAddUser(indexList);
                console.log(indexList);
            }
        };
    };

    const deleteList = (id) =>{
        console.log(id);
        const filterdata = addUser.filter((data)=>{
            return data.user_no!==id;
        });
        console.log(filterdata);
        setAddUser(filterdata);
    }

    useEffect(()=>{
        {setRefAddList&& setRefAddList(addUser)}
    },[addUser]);

    return(
        <div>
            <div id="SelectedRefUser">
                {addUser && addUser.map((data)=>{
                    return(
                        <li key={data.user_no} onClick={()=>deleteList(data.user_no)}> {data.user_name} {data.user_email} {data.dept.dept_name}</li>   
                    );
                })
                    
                }
            </div>
            <div class="form-group">
                <label className="col-form-label">{title} 추가</label>
                <input type="text" className="form-control" value={searchValue} onChange={SearchHandler}/>
            </div>
            <div class="form-group">
                <label for="message-text" className="col-form-label">리스트</label>
                <ul>
                {userList && userList.map((data) => {
                    return (
                     <li className="list-group-item" key={data.user_no} onClick={()=>addList(data.user_no)}> {data.user_name} {data.user_email} {data.dept.dept_name}</li>   
                    );
                })}
                </ul>
            </div>
        </div>
    );
}

export default AutoSearch;