import CalendarPage from "./page/CalendarPage";
import MainPage from "./page/MainPage";
import NoticePage from "./page/NoticePage";
import EmailPage from "./page/EmailPage";
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
    path: '/email',
    component: EmailPage
  },
  {
    path: '/app',
    component: AppPage
  },
]

export default routes;