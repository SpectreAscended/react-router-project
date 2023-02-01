import React from 'react';
import { json, redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';

const NewEventPage = () => {
  return (
    <>
      <EventForm />
    </>
  );
};

export default NewEventPage;

// on the form we must import and use the Form component from react-router-dom.  In there we need to specify the 'name' attribute on all fields.  With that we can await request.formData().  From that we can create an object with all of the info fields by using data.get('title').  In our router we import our action function and set it as an action attribute on the component we need it in.
// We can handle what happens when the form is submitted by importing redirect from react-router-dom and just pass in the page we want to redirect to.

export async function action({ request, params }) {
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return redirect('/events');
}
