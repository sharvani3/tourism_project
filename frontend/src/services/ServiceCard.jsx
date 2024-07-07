import React from 'react';
import './service-card.css';

const ServiceCard = ({ item }) => {
  const { imgUrl, title, desc } = item; // Use imgUrl instead of imgurl

  return (
    <div className='service__item'>
      <div className="service__img">
        <img src={imgUrl} alt='' />
      </div>
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  );
};

export default ServiceCard;
