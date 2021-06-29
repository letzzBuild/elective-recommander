import React from 'react';
import '../style.css'

export default function Cards(props) {
    return (

        <div className="cardContainer"
            style={{ backgroundColor: props.color }}>
            
                <h4>Elective subject: {props.sub}</h4>
                <h4>Faculty name: {props.faculty}</h4>
                <h4>Ratings:{props.rating}</h4>
                


            </div>
        
    );
}