import React from "react";
import "./styles/index.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo-and-icons">
            <div className="footer-logo">
              <div className="footer-image">
                <Link href="/">
                  <img
                    src="https://media.istockphoto.com/id/1179573533/vector/vector-group-of-pets-dog-cat-humming-bird-parrot-chameleon-butterfly-rabbit-isolated-on.jpg?s=612x612&w=0&k=20&c=SFDqjevwsQ00ZoZWFQRhscVxnrrkVDns0KjDH-hUynA="
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-social-icons">
            <p>
              Contacte-nos através:
              <br />
              furcode@minderacodeacademy.com
            </p>
            <ul>
              <li>
                <Link href="https://www.facebook.com/Meta">
                  <img
                    src="https://banner2.cleanpng.com/20200525/hor/transparent-facebook-round-logo-1713861749674.webp"
                    alt="facebook icon"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/meta/">
                  <img
                    src="https://img.freepik.com/premium-photo/round-instagram-logo-isolated-white-background_469489-1037.jpg"
                    alt="instagram icon"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.whatsapp.com">
                  <img
                    src="https://i.pinimg.com/736x/55/aa/49/55aa499fe77aa4cdfaa56fc4cee4ba8b.jpg"
                    alt="whatsapp icon"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://x.com/Meta">
                  <img
                    src="https://img.freepik.com/premium-psd/black-brand-new-twitter-x-logo-icon-round_1129635-4.jpg"
                    alt="x icon"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://mindera.com">
                  <img
                    src="https://static.siliconmilkroundabout.com/prod/logos/5798/3cfd3551cb-copy-of-mindera-symbol3x-1.png"
                    alt="mindera icon"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://github.com/rui-tx/furcode">
                  <img
                    src="https://e7.pngegg.com/pngimages/1009/39/png-clipart-github-computer-icons-repository-github-white-cat-like-mammal-thumbnail.png"
                    alt="github icon"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <Link href="/about">Sobre Furcode</Link>
            </li>
            <li>
              <Link href="/shelterRegister">Registe a sua Associação</Link>
            </li>
            <li>
              <Link href="/wannaHelp">Ajude a Ajudar</Link>
            </li>
            <li>
              <Link href="/privacy">Política de Privacidade</Link>
            </li>
            <li>
              <Link href="/cookie">Política de Cookies</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Mindera Mindswap 7th Edition. All
        Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
