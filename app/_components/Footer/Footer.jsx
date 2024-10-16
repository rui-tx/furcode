import React from "react";
import "./styles/index.css";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaXTwitter,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo-and-icons">
            <div className="footer-logo">
              <div className="footer-image">
                {/* <Link href="/">
                  <img
                    src="https://media.istockphoto.com/id/1179573533/vector/vector-group-of-pets-dog-cat-humming-bird-parrot-chameleon-butterfly-rabbit-isolated-on.jpg?s=612x612&w=0&k=20&c=SFDqjevwsQ00ZoZWFQRhscVxnrrkVDns0KjDH-hUynA="
                    alt="logo"
                  />
                </Link> */}
              </div>
            </div>
          </div>
          <div className="footer-social-icons">
            <p>
              Contacte-nos através:
              <br />

              pethub@minderacodeacademy.com

            </p>
            <ul>
              <li>
                <Link href="https://www.facebook.com/Meta">
                  <span className="facebook-icon">
                    <FaFacebook />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/meta/">
                  <span className="instagram-icon">
                    <FaInstagram />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="https://www.whatsapp.com">
                  <span className="whatsapp-icon">
                    <FaWhatsapp />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="https://x.com/Meta">
                  <span className="twitter-icon">
                    <FaSquareXTwitter />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="https://mindera.com">
                  <img
                    src="https://storage.googleapis.com/mindera-cms-media-uploads/black_minder_4eb8db624b/black_minder_4eb8db624b.png"
                    alt="mindera icon"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://github.com/rui-tx/furcode">
                  <span className="github-icon">
                    <FaGithub />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <Link href="/about">Sobre PetHub</Link>
            </li>
            <li>
              <Link href="/privacy">Política de Privacidade</Link>
            </li>
            <li>
              <Link href="/terms">Termos e Condições</Link>
            </li>
            <li>
              <Link href="/cookie">Política de Cookies</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Mindera Mindswap 7<sup>th</sup>{" "}
        Edition. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
