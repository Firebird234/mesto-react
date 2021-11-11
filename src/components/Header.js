import React from 'react';
import logo from '../images/logo.svg';


function Header(props) {
return (
<header className="header">
    <img alt = "Logo" className="header__logo" src = {logo}/>
    <div className="header__line"></div>
</header>
);
}

export default Header;