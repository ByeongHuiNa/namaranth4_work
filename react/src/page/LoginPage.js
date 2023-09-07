import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LoginPage = () =>{
    const history = useHistory();
    const [id, setid] = useState('');
    const [pwd, setPwd] = useState('');

    const login = () => {
        axios.post("/login", {
            user_email : id,
            user_pwd : pwd
        }).then((res) => {
            console.log('로그인 성공');
            console.log(res.headers.token);
            // 토큰을 localStorage에 set
            localStorage.setItem('token', res.headers.token);
            setToken(res.headers.token);
            history.push(`/`);
            // 토큰을 localStorage에서 get
            localStorage.getItem('token');
        }).catch((error) => {
            console.log(error);
        })
    }

    const setToken = (token) => {
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    return (
        <div className="auth-wrapper">
            <div id="loginBox" className="auth-content text-center">
                <img src="./bootstrap/images/logow1.png" id="loginLogo" className="img-fluid"/>
                <div id="loginBox" className="card borderless">
                    <div className="row align-items-center ">
                        <div className="col-md-12">
                            <div className="card-body">
                                <div>
                                    <h3 id='loginMsg'>환영합니다</h3>
                                    <br/>
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control loginInput" name="username" 
                                            onChange={(e) => {setid(e.target.value)}} id="id" placeholder="이메일"/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <input type="password" className="form-control loginInput" name="password" 
                                            onChange={(e) => {setPwd(e.target.value)}}id="password" placeholder="비밀번호"/>
                                    </div>
                                    <div className="custom-control custom-checkbox text-left mb-4 mt-2">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                        <label className="custom-control-label loginMsg2" for="customCheck1"> 아이디 저장</label>
                                    </div>
                                    <br/>
                                    <button type="submit" id="loginBtn" className="btn btn-block btn-primary mb-4" onClick={() => login()}>로그인</button>
                                    {/* <input type="hidden" name="${_csrf.parameterName}" value="${_csfr.token}"/> */}
                                </div>
                                <br/>
                                <Link to='' className="mb-0 text-muted loginMsg2">아이디 찾기</Link>
                                <span className="mb-0 text-muted loginMsg2"> | </span>
                                <Link to='' className="mb-0 text-muted loginMsg2">비밀번호 찾기</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;