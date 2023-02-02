import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  const inputRef = useRef();

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
      inputRef.current.value = '';
    }
  }, [data, state]);

  // useFetcher should be used whenever we want to trigger an action, or a loader, without actually navigating to the patch in which the loader or action belongs.  fetcher returns an object, which we can access a special fetcher.Form (among other things).

  //  Here, we have a newsletter signup form in our mainNavigation. If we used regular Form: If we were on a different page, like, events and we submitted our email address to the form, it would take us to the newsletter signup page, because that's where the action is taking place.
  // If we use fetcher.Form it will not do that. We simply pass the directory as a prop into the fetcher.Form. So this will still trigger the action(or loader), but will not trigger the route transition like regular Form would.

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        ref={inputRef}
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
