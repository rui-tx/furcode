import "./styles/index.css";

const DonationCard = ({ ...props }) => {
  const { value, header, line1, line2, line3 } = props;
  return (
    <div className="donation-card">
      <div class="pricing-table gprice-single">
        <div class="head">
          <h4 class="title">{header}</h4>
        </div>
        <div class="content">
          <div class="price">
            <h1>{value}€</h1>
          </div>
          <ul>
            {line1 && <li>{line1}</li>}
            {line2 && <li>{line2}</li>}
            {line3 && <li>{line3}</li>}
          </ul>
          <div class="sign-up">
            <a href="#" class="btn bordered radius">
              Donate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
