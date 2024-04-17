import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ message, linkPath, linkText }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h1>404 - Not Found</h1>
                    <p>{message}</p>
                    <Link to={linkPath}>{linkText}</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;