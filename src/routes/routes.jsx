import Dashboard from '../pages/CMS/Dashboard';
import PageNotFound from '../components/PageNotFound';
import ManagerTicket from '../pages/CMS/ManagerTicket';
import TicketExchange from '../pages/CMS/TicketExchange';
import Settings from '../pages/CMS/Settings';

export const publicRoute = [{ path: '*', component: PageNotFound }];

export const privateRoute = [
  { path: '/', component: Dashboard },
  { path: '/manager-ticket', component: ManagerTicket },
  { path: '/settings', component: Settings },
];

export const customRoute = [
  { path: '/ticket-exchange', component: TicketExchange },
];
