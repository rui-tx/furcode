import "./styles/index.css";

const DonationCard = ({ ...props }) => {
  const { value, header, line1, line2, line3 } = props;
  return (
    <div className="donation-card">
      <div className="pricing-table gprice-single">
        <div className="head">
          <h4 className="title">{header}</h4>
        </div>
        <div className="content">
          <div className="price">
            <h1>{value}€</h1>
          </div>
          <ul>
            {line1 && <li>{line1}</li>}
            {line2 && <li>{line2}</li>}
            {line3 && <li>{line3}</li>}
          </ul>
          <div className="sign-up">
            <a href="#" className="btn bordered radius">
              Donate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
