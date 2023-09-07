import CalendarPage from "./page/CalendarPage";
import MainPage from "./page/MainPage";
import NoticePage from "./page/NoticePage";
import EmailPage from "./page/EmailPage";
import AppPage from "./page/AppPage";
import AppViewPage from "./page/AppViewPage";
import AppEditPage from "./page/AppEditPage";

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
  {
    path: '/app/edit',
    component: AppEditPage
  },
  {
    path: '/app/:id',
    component: AppViewPage
  },
]

export default routes;