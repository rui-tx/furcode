import React from "react";
import "./styles/index.css";

const Section = ({ title, children }) => (
  <div className="policy-section">
    <h2>{title}</h2>
    {children}
  </div>
);

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Política de Privacidade</h1>

      <Section title="Introdução">
        <p>
          Na PetHub, valorizamos sua privacidade. Esta política descreve como
          coletamos, usamos e protegemos suas informações pessoais.
        </p>
      </Section>

      <Section title="Informações Coletadas">
        <ul>
          <li>Dados de contacto (nome, e-mail, telefone)</li>
          <li>Informações sobre preferências de adoção</li>
          <li>Histórico de interações com o site</li>
        </ul>
      </Section>

      <Section title="Uso das Informações">
        <p>Utilizamos suas informações para:</p>
        <ul>
          <li>Facilitar o processo de adoção</li>
          <li>Melhorar nossos serviços</li>
          <li>Comunicar atualizações e notícias relevantes</li>
        </ul>
      </Section>

      <Section title="Proteção de Dados">
        <p>
          Implementamos medidas de segurança para proteger suas informações
          contra acesso não autorizado e uso indevido.
        </p>
      </Section>

      <Section title="Seus Direitos">
        <p>
          Você tem o direito de acessar, corrigir ou solicitar a exclusão de
          seus dados pessoais a qualquer momento.
        </p>
      </Section>

      <Section title="Contato">
        <p>
          Para questões sobre nossa política de privacidade, entre em contato

          connosco em: <span> pethub@minderacodeacademy.com</span>

        </p>
      </Section>
    </div>
  );
};

export default PrivacyPolicyPage;
