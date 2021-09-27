import { Link } from "react-router-dom";
import React from "react";

function BreadcrumbBar({ links = [], currentPage = "" }) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {links.map((link, index) => {
                    return <li className="breadcrumb-item" key={index}><Link to={link.url}>{link.text}</Link></li>
                })}
                <li className="breadcrumb-item active" aria-current="page" key={links.length}>{currentPage}</li>
            </ol>
        </nav>
    );
}

export default BreadcrumbBar;