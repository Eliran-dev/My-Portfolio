import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';


const Project = ({ key, title, img, imgTitle }) => {
    return (
        <div className={classNames("project", `${title}`)}
            key={key}
        >
            <Link to={`projects/${title}`}>

                <img className="image" style={{width:"30%", height:"30%"}} src={img} alt={imgTitle} />
                <h1 className="title">{title}</h1>

            </Link>

        </div>
    )
};

export default Project;