import React from 'react';
import './Header.css';

// Header component receives name and contact info as props
function Header({ name, phone, email, linkedin, github }) {
  return (
    <header className="header">
      <h1 className="name">{name}</h1>
      <div className="contact-info">
        <span>{phone}</span>
        <span>|</span>
        <span>{email}</span>
        <span>|</span>
        <span>{linkedin}</span>
        <span>|</span>
        <span>{github}</span>
      </div>
    </header>
  );
}

export default Header;
