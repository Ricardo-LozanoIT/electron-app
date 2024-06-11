/* eslint-disable react/prop-types */
import React from "react";
import "./Abbott.css";
import abbott from "../../assets/icons/abbott.png";

export const Abbott = ({ name, links }) => {
  return (
    <div className="container">
      <img src={abbott} alt={`abbott`} className="avatar" />
      <h1 className="title">{name}</h1>
      <div className="link-list">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-item"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};
