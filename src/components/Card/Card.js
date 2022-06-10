import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '~/common/util/format';
import './Card.scss';

const Card = ({ vehicle }) => {
  const priceFormatted = useMemo(() => {
    const priceNumber = Number(vehicle.Price.replace(',', '.'));

    return formatPrice(priceNumber);
  }, [vehicle]);
  return (
    <li className="container-card">
      <img src={vehicle.Image} alt={vehicle.Model} />
      <div className="info">
        <h2>
          {vehicle.Make} {vehicle.Model}
        </h2>
        <h3>{vehicle.Version}</h3>
        <strong>{priceFormatted}</strong>
        <div>
          <span>
            {vehicle.YearFab}/{vehicle.YearModel}
          </span>
          <span>{vehicle.KM}km</span>
        </div>
      </div>
    </li>
  );
}

Card.propTypes = {
  vehicle: PropTypes.shape({
    ID: PropTypes.number,
    Make: PropTypes.string,
    Model: PropTypes.string,
    Version: PropTypes.string,
    Image: PropTypes.string,
    KM: PropTypes.number,
    Price: PropTypes.string,
    YearModel: PropTypes.number,
    YearFab: PropTypes.number,
    Color: PropTypes.string,
  }).isRequired,
};

export default Card;