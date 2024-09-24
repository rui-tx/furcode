import React from "react";
import DonationCard from "../components/DonationCard/DonationCard";
import "./styles/index.css";
const page = () => {
  return (
    <div>
      <div className="Total">VALOR TOTAL DONATION</div>
      <div className="container-cards">
        <DonationCard value="5" header="Silver" line1="Line 1" />
        <DonationCard value="10" header="Gold" line1="Line 1" />
        <DonationCard value="15" header="Platinum" line1="Line 1" />
      </div>
      <div className="Testemunha"> SLIDE TESTEMUNHA</div>
    </div>
  );
};

export default page;
