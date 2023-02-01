import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const RootLayout = () => {
  // const navigation = useNavigation();
  // navigation.state === 'loading'

  // navigation returns an object, and on that object we can access state which can be loading, idle or submitting.
  // Loading will only return true if the route we are loading is currently loading.

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
