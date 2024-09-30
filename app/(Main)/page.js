import HeroCarousel from "../_components/HeroCarousel/HeroCarousel";
import WannaHelp from "../_components/WannaHelp/WannaHelp";
import PetCarousel from "../_components/PetCarousel/PetCarousel";
import "../globals.css";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <WannaHelp />
      <PetCarousel />
    </>
  );
}
