"use client";
import React from "react";
import "./styles/index.css";

const TestimonialDonationsCards = ({ ...props }) => {
  const { description, author } = props;

  return (
    <div className="testimonial-cards">
      <div className="testimonial-testimonial">
        <p className="description-testimonial">{description}</p>
        <p className="author-testimonial">{author}</p>
      </div>
    </div>
  );
};

export default TestimonialDonationsCards;
