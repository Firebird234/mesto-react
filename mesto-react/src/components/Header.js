import React from 'react';
import logo from '../images/logo.svg';
console.log({logo})

function Header(props) {
return (
<header className="header">
    <img className="header__logo" src = {logo}/>
    <div className="header__line"></div>
</header>
);
}

export default Header;