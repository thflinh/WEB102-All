import React from 'react';

const Card = ({title, description, img, link}) => {
    return (
        <div className="card">
            <img src={img} alt={title}/>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>
    );
};

export default Card;