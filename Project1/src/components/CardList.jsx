import React from 'react';
import Card from './Card';
import artEvents from '../data';

const CardList = () => {
    return (
        <div className="card-list">
            {artEvents.map((event, index) => (
                <Card 
                key={index}
                title={event.title}
                description={event.description}
                img={event.img}
                link={event.link}
                />
            ))}
        </div>
    );
};
export default CardList;