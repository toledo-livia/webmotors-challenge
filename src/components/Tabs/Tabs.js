import React from 'react';
import Link from '@mui/material/Link';
import { FaCar, FaMotorcycle } from 'react-icons/fa';
import Logo from '../../common/assets/img/logo.svg';
import './Tabs.scss';

// GrCar RiMotorbikeLine
const Tabs = ({ children }) => {
  return (
    <div className="container-tabs">
      <img className="logo" src={Logo} alt="logo-webmotors" />
      <div className="header">
        <div>
          <Link className="tab" href="/">
            <FaCar />
            <span>
              <p>COMPRAR</p>
              CARROS
            </span>
          </Link>
          <Link className="tab" href="/motorcycle">
            <FaMotorcycle />
            <span>
              <p>COMPRAR</p>
              MOTOS
            </span>
          </Link>
        </div>
        <button type="button">Vender meu carro</button>
      </div>
      {children}
    </div>
  );
};

export default Tabs;
