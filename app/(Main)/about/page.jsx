import React from "react";
import "./styles/index.css";

const Section = ({ title, children }) => (
  <div className="policy-section">
    <h2>{title}</h2>
    {children}
  </div>
);

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <Section title="Sobre a PetHub">
        <p>
          A PetHub é uma plataforma que oferece uma maneira simples e eficaz de
          adotar ou anunciar para adoção um animal que foi encontrado ou que
          está em risco de abandono. O nosso objetivo é ser o elo de ligação
          entre os animais que precisam de um lar e as pessoas dispostas a
          acolhê-los, proporcionando uma nova oportunidade para animais em
          situação de risco.
          <br /><br />
          Não somos uma associação e não dispomos de instalações próprias, como
          canis ou gatis. Através dos anúncios publicados no nosso site,
          ajudamos a conectar os animais disponíveis para adoção com quem os
          procura, promovendo assim a adoção responsável e o bem-estar animal.
          <br /><br />
          Na PetHub, acreditamos que a adoção é mais do que apenas um ato de
          amor; é também uma forma de combater o abandono e criar um impacto
          positivo na vida de muitos animais. Todos os anos, muitos animais são
          deixados para trás, mas juntos podemos fazer a diferença, oferecendo
          uma alternativa de adoção em vez de compra.
        </p>
      </Section>

      <Section title="Quem Somos">
        <p>
          Somos a turma da Mindswap 7th Edition da Mindera Code Academy, e esta
          página faz parte do nosso projeto final, onde aplicamos todo o
          conhecimento adquirido durante o curso, tanto em backend como em
          frontend. A PetHub representa o culminar do nosso esforço e
          aprendizagem, e foi desenvolvida com a missão de facilitar o processo
          de adoção e promover o bem-estar dos animais.
        </p>
      </Section>

      <Section title="A Nossa Missão">
        <p>
          A nossa missão é facilitar o processo de adoção, dando a oportunidade
          a mais animais de encontrarem uma família. A plataforma permite que
          qualquer pessoa se registe e insira a sua associação, ajudando a
          conectar quem procura um novo membro para a sua família com os animais
          que esperam por um lar.
          <br /><br />
          Além disso, na PetHub, oferecemos a possibilidade de apoiar
          financeiramente os abrigos e associações de proteção animal,
          permitindo que continuem o seu importante trabalho de cuidar e
          proteger os animais mais necessitados.
          <br /><br />
          Se queres fazer parte desta missão e ajudar-nos a proporcionar novas
          oportunidades para os animais, junta-te a nós na PetHub e faz a
          diferença!
        </p>
      </Section>
    </div>
  );
};

export default AboutUsPage;
