import React from "react";
import "./styles/index.css";

const Section = ({ title, children }) => (
  <div className="policy-section">
    <h2>{title}</h2>
    {children}
  </div>
);

const CookiesPolicyPage = () => {
  return (
    <div className="cookies-policy-container">
      <h1>Política de Cookies</h1>

      <Section title="O que são cookies?">
        <p>
          Os cookies são pequenos ficheiros de texto que são armazenados no seu
          computador ou dispositivo móvel quando visita um website. Estes
          ficheiros são amplamente utilizados para garantir o funcionamento
          correto e eficiente do site, bem como para fornecer informações úteis
          aos proprietários do site.
        </p>
        <br />
        <p>Existem duas principais categorias de cookies:</p>
        <ul>
          <li>
            <strong>Cookies próprios:</strong> utilizados diretamente por nós, a
            PetHub, no seu dispositivo.
          </li>
          <li>
            <strong>Cookies de terceiros:</strong> utilizados por terceiros
            através do nosso site.
          </li>
        </ul>
      </Section>

      <Section title="Como são utilizados os cookies?">
        <p>
          Durante as visitas ao nosso site, os cookies são utilizados para
          melhorar a sua experiência de navegação e otimizar o desempenho da
          PetHub. Estes cookies ajudam-nos a identificar as preferências de
          navegação, como o tipo de navegador utilizado (por exemplo, Google
          Chrome, Mozilla Firefox), a região geográfica do acesso e a forma como
          os utilizadores interagem com o nosso site.
        </p>
      </Section>

      <Section title="Porque é que utilizamos cookies?">
        <p>A PetHub utiliza cookies para:</p>
        <br />
        <ul>
          <li>
            Melhorar a experiência do utilizador, permitindo uma navegação mais
            rápida e eficiente.
          </li>
          <li>
            Eliminar a necessidade de introduzir repetidamente as mesmas
            informações.
          </li>
          <li>
            Recolher dados anónimos para fins estatísticos e analíticos, com o
            objetivo de aprimorar os nossos serviços e funcionalidades.
          </li>
        </ul>
      </Section>

      <Section title="Gestão de Cookies">
        <p>
          Pode aceitar, recusar ou eliminar cookies a qualquer momento,
          configurando as opções do seu navegador. No entanto, ao desativar os
          cookies, algumas funcionalidades do site PetHub podem não funcionar
          corretamente ou a sua experiência de navegação pode ser afetada.
        </p>
      </Section>

      <Section title="Tipos de Cookies que utilizamos">
        <ul>
          <li>
            <strong>Cookies Estritamente Necessários:</strong> Essenciais para o
            funcionamento do site PetHub. Sem estes cookies, o site não
            funcionaria corretamente.
          </li>
          <li>
            <strong>Cookies Analíticos:</strong> Utilizados de forma anónima
            para fins de monitorização e análise estatística, ajudando-nos a
            compreender como os utilizadores interagem com o nosso site.
          </li>
          <li>
            <strong>Cookies de Funcionalidade:</strong> Permitem melhorar a sua
            experiência ao utilizar a PetHub, recordando as suas preferências
            de navegação e configurações.
          </li>
        </ul>
      </Section>

      <Section title="Cookies de terceiros">
        <p>
          A PetHub pode utilizar serviços externos para exibir conteúdos em
          algumas páginas, como vídeos ou interações com redes sociais. Estes
          serviços podem armazenar os seus próprios cookies no seu dispositivo.
          Por exemplo:
        </p>
        <br />
        <ul>
          <li>
            <strong>Google Analytics:</strong> Utilizado para análise e
            estatísticas do site.
          </li>
          <li>
            <strong>YouTube:</strong> Para a exibição de vídeos relacionados com
            a adoção de animais.
          </li>
          <li>
            <strong>Twitter / X:</strong> Para partilhas e interação com redes
            sociais.
          </li>
        </ul>
      </Section>

      <Section title="Como nos contactar">
        <p>
          Se tiver alguma dúvida sobre a nossa Política de Cookies ou desejar
          mais informações sobre o tratamento dos seus dados, entre em contacto
          connosco através do email: pethub@minderacodeacademy.com.
        </p>
      </Section>

      <Section title="Alterações à Política de Cookies">
        <p>
          A PetHub reserva-se o direito de, a qualquer momento e sem aviso
          prévio, alterar, adicionar ou atualizar esta Política de Cookies. Por
          isso, recomendamos que consulte esta página periodicamente para se
          manter informado sobre as nossas práticas.
        </p>
      </Section>
    </div>
  );
};

export default CookiesPolicyPage;
