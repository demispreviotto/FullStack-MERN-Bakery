import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
const Card = (props) => {

    return (
        <div className='card'>
            <div className="image container">
                <img src={props.img} alt="" />
            </div>
            <div className="info">
                <h2>{props.title}</h2>
                <div className="list">
                    <p>{props.subTitle}</p>
                    <ul>
                        {props.list.map((item) => <li>{item}</li>)}</ul>
                </div>
                <p className="text">{props.text}</p>
            </div>
            <div className="card-footer">
                <Link to={props.link} />
            </div>
            {child}
        </div>
    )
}

export default Card