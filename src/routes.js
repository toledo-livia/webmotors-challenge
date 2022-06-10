import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import Car from './pages/Car/Car';
import Motorcycle from './pages/Motorcycle/Motorcycle';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Car />} />
        <Route path="/motorcycle" element={<Motorcycle />} />
      </Switch>
    </BrowserRouter>
  );
}
