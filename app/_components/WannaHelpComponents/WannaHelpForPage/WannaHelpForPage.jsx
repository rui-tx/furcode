"use client";
import "./styles/index.css";
import WannaHelpOption from "../WannaHelpOption/WannaHelpOption";
import WannaHelpSectionStats from "../WannaHelpSectionStats/WannaHelpSectionStats";
import adoptpic from "../../../_images/adoptpic.jpg";
import donatepic from "../../../_images/donatepic.webp";
import volunteerpic from "../../../_images/volunteerpic.jpg";
import sponsorpic from "../../../_images/sponsorpic.jpg";
import WannaHelpForm from "../WannaHelpForm/WannaHelpForm";

const WannaHelp = () => {
  return (
    <div className="wannahelp-container">
      <h1>Queres ajudar os nossos amigos peludos?</h1>
      <WannaHelpSectionStats />
      <div className="wannahelp-introduction">
        Juntos, podemos fazer a diferença na vida de muitos animais! Há várias
        maneiras de ajudar:
      </div>
      <div className="wannahelp-cards-options">
        <WannaHelpOption
          title="Adotar"
          description="Dê um lar amoroso a um animal necessitado. A adoção muda duas vidas: a sua e a do animal!"
          image={adoptpic.src}
        />
        <WannaHelpOption
          title="Voluntariar"
          description="Doe seu tempo e carinho. Precisamos de ajuda para cuidar, passear e socializar os animais."
          image={volunteerpic.src}
        />
        <WannaHelpOption
          title="Doar"
          description="Sua doação ajuda a fornecer comida, abrigo e cuidados médicos aos animais resgatados."
          image={donatepic.src}
        />
      </div>
    </div>
  );
};

export default WannaHelp;
