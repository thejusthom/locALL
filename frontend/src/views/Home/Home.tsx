import TopHome from "./TopHome";
import SecondSection from "./SecondSection";
import HomeItemCards from "./HomeItemCards";
import WeatherView from "../Weather/WeatherViewComp";

// Main Home page
const Home = () => {
  return (
    <>
      {/* Different Sections of the Home Page */}
      <TopHome />
      <SecondSection />
      <HomeItemCards />
      <WeatherView />
    </>
  );
};

export default Home;
