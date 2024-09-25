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
            <ul>
              <li>
                <Link href="https://www.facebook.com/Meta">
                  <img
                    src="https://scontent.fopo6-2.fna.fbcdn.net/v/t39.8562-6/275949698_3248957128655833_369430323747988984_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=IvATGsLjSfUQ7kNvgHg-AVg&_nc_ht=scontent.fopo6-2.fna&_nc_gid=Atf94PCUYRpexH5Ny8teqcc&oh=00_AYB2A-olnby4ogDj1UnMUa_ZKCGYI9mBNkYZf7AY1M0bww&oe=66F9122E"
                    alt="facebook icon"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/meta/">
                  <img
                    src="https://scontent.fopo6-2.fna.fbcdn.net/v/t39.8562-6/276079790_239645664974434_7595452976573962628_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=nNfKEAWEUEIQ7kNvgHKBxUc&_nc_ht=scontent.fopo6-2.fna&_nc_gid=Atf94PCUYRpexH5Ny8teqcc&oh=00_AYDyNnzAKunHLuaJuCls1tqusCYxhIt6bxYXG6WL3RLQAA&oe=66F8ECB1"
                    alt="instagram icon"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.whatsapp.com">
                  <img
                    src="https://w7.pngwing.com/pngs/507/666/png-transparent-computer-icons-whatsapp-whatsapp-text-logo-silhouette-thumbnail.png"
                    alt="whatsapp icon"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://x.com/Meta">
                  <img
                    src="https://scontent.fopo6-2.fna.fbcdn.net/v/t39.8562-6/434686573_965393648261200_4295680538668886162_n.png?_nc_cat=105&ccb=1-7&_nc_sid=f537c7&_nc_ohc=5nHpcEyhWSMQ7kNvgE-jKDG&_nc_ht=scontent.fopo6-2.fna&_nc_gid=Atf94PCUYRpexH5Ny8teqcc&oh=00_AYBn7GAFe2Pppi0nBQrhH_WuRgZciaJUOSRAHW38hlENcQ&oe=66F902A1"
                    alt="x icon"
                  />
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
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
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
              <Link href="/contact">Contatos</Link>
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
