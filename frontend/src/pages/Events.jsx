import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <>{<EventsList events={events} />}</>;
}

export default EventsPage;

export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    return response;
  }
}

// We can use the json function, which we import from react-router-dom to throw a message to our error page.  Here we manually set a status.  This status is used in our error page to determine what we output.  We don't necessarily return THAT status in our error, it would actually return the proper status. We just do this to pass a certain message, which we can specify in our json({message: ...}, {status:...})
