import HeroCarousel from "./_components/HeroCarousel/HeroCarousel";
import PetCarousel from "./_components/PetCarousel/PetCarousel";
import WannaHelp from "./_components/WannaHelp/WannaHelp";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <WannaHelp />
      <PetCarousel />
    </>
  );
}
