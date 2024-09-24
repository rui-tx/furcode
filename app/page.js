import HeroImage from "./components/HeroImage/HeroeImage";
import PetCard from "./components/PetCard/PetCard";
import PetCarousel from "./components/PetCarousel/PetCarousel";

export default function Home() {
  return (
    <>
      <HeroImage></HeroImage>
      <div className="text">
        <h1>WANNA HELP</h1>
      </div>

      <PetCarousel />
    </>
  );
}
