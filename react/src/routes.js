import CalendarPage from "./page/CalendarPage";
import MainPage from "./page/MainPage";
import NoticePage from "./page/NoticePage";
import AllMailPage from "./page/emailpage/AllMailPage";
import SendMailPage from "./page/emailpage/SendMailPage";
import ReceiveMailPage from "./page/emailpage/ReceiveMailPage";
import TsMailPage from "./page/emailpage/TsMailPage";
import DeleteMailPage from "./page/emailpage/DeleteMailPage";
import RegisterMailPage from "./page/emailpage/RegisterMailPage";
import GetMailPage from "./page/emailpage/GetMailPage";
import GetTsMailPage from "./page/emailpage/GetTsMailPage";
import GetDelMailPage from "./page/emailpage/GetDelMailPage";
import AppPage from "./page/AppPage";


const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/notice',
    component: NoticePage
  },
  {
    path: '/calendar',
    component: CalendarPage
  },
  {
    path: '/email/all',
    component: AllMailPage
  },
  
  {
    path: '/email/send',
    component: SendMailPage
  },
  {
    path: '/email/receive',
    component: ReceiveMailPage
  },
  {
    path: '/email/ts',
    component: TsMailPage
  },
  {
    path: '/email/del',
    component: DeleteMailPage
  },
  {
    path: '/email/register',
    component: RegisterMailPage
  },
  {
    path: '/email/getmail/:mail_no',
    component: GetMailPage
  },
  {
    path: '/email/gettsmail/:mailts_no',
    component: GetTsMailPage
  },
  {
    path: '/email/getdelmail/:mail_no',
    component: GetDelMailPage
  },
  {
    path: '/app',
    component: AppPage
  },
 
  
]

export default routes;