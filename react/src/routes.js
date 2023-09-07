import CalendarPage from "./page/CalendarPage";
import MainPage from "./page/MainPage";
import LoginPage from "./page/LoginPage";
import NoticeListPage from "./page/notice/NoticeListPage";
import NoticeDetailPage from "./page/notice/NoticeDetailPage";
import NoticeRegisterPage from "./page/notice/NoticeRegisterPage";
import NoticeEditPage from "./page/notice/NoticeEditPage";
import EmailPage from "./page/EmailPage";
import AppPage from "./page/AppPage";

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/notice/list',
    component: NoticeListPage
  },
  {
    path: '/notice/get/:id',
    component: NoticeDetailPage
  },
  {
    path: '/notice/modify/:id',
    component: NoticeEditPage
  },
  {
    path: '/notice/register',
    component: NoticeRegisterPage
  },
  {
    path: '/calendar',
    component: CalendarPage
  },
  {
    path: '/email',
    component: EmailPage
  },
  {
    path: '/app',
    component: AppPage
  },
]

export default routes;