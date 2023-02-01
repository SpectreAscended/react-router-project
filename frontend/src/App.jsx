import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage from './pages/EventDetail';
import EditEventPage from './pages/EditEvent';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import EventsNavigation from './components/EventsNavigation';
import EventsRootLayout from './pages/EventsRoot';
// Challenge / Exercise
import ErrorPage from './pages/Error';

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

//////////////////////////////////////////////////////
// Loader

// If we want to load an http request only as we go to the page we are using it, we can set a property on that element of loader. The benifet of this is that the page won't load until the data is actually there. loader recieves a function, and this can be an async function, and whatever you return from that function will be available within that element. In that element we retrieve this data by using useLoader.  If our function returns a promise, react router will automatically detect that, and you will always get the final data you will yield from that promise as if you used await or .then. We can use this loaded data in any component that is nested within this component. So here we have the function on the EventsPage but we can access useLoader inside its nested EventList component.

// ^ it is best to keep the function within the component that is using it.  So here we move that async function into the Events page and simply export it there and import it here and pass that imported function into our loader prop.

// Infact we do not even need to extract the data like const data = res.json(), we can just return the response object and Loader will take care of that for us.  Loader can return anything we want.

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          { path: ':eventId', element: <EventDetailPage /> },
          { path: 'new', element: <NewEventPage /> },
          { path: ':eventId/edit', element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
