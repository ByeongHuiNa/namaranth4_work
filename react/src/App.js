import './App.css';
import Header from './comp/Header';
import Sidebar from './comp/Sidebar';
import routes from './routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
const [isLoading, setIsLoading] = useState(false);
const [loginUser, setLoginUser] = useState({});

useEffect(()=>{
  const token = localStorage.getItem('token');
  setToken(token);
  axios.get('/user').then((res) => {
    console.log(res.data);
    setLoginUser(res.data);
  })
},[])

const setToken = (token) => {
  if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
      delete axios.defaults.headers.common['Authorization'];
  }
  setIsLoading(true);
}

  // const [users, setUsers] = useState([]);

  // const userHandler = () =>{
  //   axios.get('http://localhost:8081/users').then((res)=>{
  //     console.log(res.data);
  //     setUsers(res.data);
  //   });
  // };

  // useEffect(()=>{
  //   userHandler();
  // },[]);

  return (
    <div>
        { isLoading ?
          <Router>
            <AppContent/>
          </Router> : 
          <></> }
    </div>
    )
}

function AppContent() {
  const location = useLocation();
  
  return (
    <div>
      {location.pathname !== '/login' && (
        <div>
          <div>
            <Header />
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      )}
      <div className={location.pathname !== '/login' ?  'pcoded-main-container' : ''}>
        <div className={location.pathname !== '/login' ? 'pcoded-content' : ''}>
          <Switch>
            {routes.map((route) => {
              return <Route
                key={route.path}
                exact path={route.path}
                component={route.component}
              />
            })}
          </Switch>
        </div>
      </div>
      <div className='container mt-3'></div>
    </div>
  );
}

export default App;
