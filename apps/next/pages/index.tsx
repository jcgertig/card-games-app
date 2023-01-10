import { HomeScreen } from 'app/features/home/screen';
import { UserButton } from 'app/utils/clerk.web';

const Home = () => {
  return (
    <>
      <HomeScreen />
      <UserButton />
    </>
  );
};

export default Home;
