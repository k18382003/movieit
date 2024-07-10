import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import EventCreate from '../components/Events/EventCreate';
import EventDetail from '../components/Events/EventDetails';
import EventList from '../components/Events/EventList';
import MyEvents from '../components/Events/MyEvent';
import ProfileCard from '../components/Profile/ProfileCard';
import ProfileCardInvite from '../components/Profile/ProfileCardInvite';
import ProfileEditForm from '../components/Profile/ProfileEdit/ProfileEditForm';
import RequireAuth from '../components/Security/RequireAuth';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/profile/:id',
            element: <ProfileCard />,
          },
          {
            path: '/profile/event/:eventId/area/:code',
            element: <ProfileCardInvite />,
          },
          {
            path: '/profile/edit',
            element: <ProfileEditForm />,
          },
          {
            path: '/events',
            element: <EventList />,
          },
          {
            path: '/events/:eventId',
            element: <EventDetail />,
          },
          {
            path: '/events/add',
            element: <EventCreate />,
          },
          {
            path: '/myevents',
            element: <MyEvents />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: '/movieit',
});
