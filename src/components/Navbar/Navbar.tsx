import React from "react";
import "./Navbar.scss";
import { ReactComponent as LogoIc } from "../../assets/tedooo-logo.svg";
import { ReactComponent as HomeIc } from "../../assets/home-ic.svg";
import { ReactComponent as BellIc } from "../../assets/bell-ic.svg";
import { ReactComponent as MessagingIc } from "../../assets/message-ic.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar" role="navigation">
      <div className="nav-wrapper">
        <div>
          <LogoIc alt="logo"/>
          <input placeholder="Search"></input>
        </div>
        <div>
          <a href="/">
            <HomeIc alt="home page icon"/>
            <span>Home</span>
          </a>
          <button>
            <MessagingIc alt="messaging icon"/>
            <span>Messaging</span>
          </button>
          <button>
            <BellIc alt="notification icon"/>
            <span>Notifications</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
