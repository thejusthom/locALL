import TopHome from "./TopHome"
import SecondSection from "./SecondSection";
import HomeItemCards from "./HomeItemCards";
import WeatherView from "../Weather/WeatherView";

const Home = () => {
  return (
    <>
      <TopHome />
      <SecondSection />
      <HomeItemCards />
      <WeatherView />
    </>
  );
};

export default Home;
