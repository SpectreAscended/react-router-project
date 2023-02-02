import { defer, Await, json, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();
  // const events = data.events;

  // return <>{<EventsList events={events} />}</>;
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {loadedEvents => {
          return <EventsList events={loadedEvents} />;
        }}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    // return response;
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}

// We can use the json function, which we import from react-router-dom to throw a message to our error page.  Here we manually set a status.  This status is used in our error page to determine what we output.  We don't necessarily return THAT status in our error, it would actually return the proper status. We just do this to pass a certain message, which we can specify in our json({message: ...}, {status:...})

////////////////////////////////////////////////////
// DEFER, AWAIT, SUSPENSE

// If we want to show part of our page while it is loading we can use defer, which we import from react-router dom.  To do this we move our loader function into its own function, which we name in this case loadEvents.  Inside our loader function we now call a function 'defer'  into defer we pass an object.  in this case we name the events we are loading events: loadEvents().  This is where we execute our actual fetch function.  To use this defered data we must import Await component from react-router-dom.  We return this Await component in our JSX with the prop resolve.

// We still load our events using useLoader.  Into resolve we pass our events that we recieve from useLoader.  useLoader recives the object we pass into our defer object. Inside Await: <Await resolve={events}>(loadedEvents) => {return <EventPage events={loadedEvents} />} </Await> . Inside Await we call a function that recieves the resolve={events} data.  We can use that loadedEvents argument to pass into our EventPage comonent that we are trying to load.

// Suspense- In order for any of this to work we must import Suspense from 'react'.  Wrap the whole Await component in Suspense.  Into Suspense we can pass in a fallback to be shown while the data is being loaded.  <Suspense fallback={<p>Loading...</p>} ></Suspense>

{
  /* <Suspense fallback={<p style={{ textAlign:       'center' }}>Loading...</p>}>
     <Await resolve={events}>
       {loadedEvents => {
         return <EventsList events={loadedEvents} />;
       }}
      </Await>
    </Suspense>; */
}

// This is especially useful if we have multiple http requests on the same page that take various times to load.
