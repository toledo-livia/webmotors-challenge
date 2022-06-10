import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { GoLocation } from 'react-icons/go';
import { MdChevronRight } from 'react-icons/md';
import api from '~/services/api';
import SelectInput from '~/components/Select/Select';
import Card from '~/components/Card/Card';
import Tabs from '~/components/Tabs/Tabs';
import './Car.scss';

const Car = () => {
  const allObj = useMemo(() => ({ value: -1, label: 'TODOS' }), []);

  const radiusOptions = useMemo(
    () => [
      { value: 50, label: '50km' },
      { value: 100, label: '100km' },
      { value: 150, label: '150km' },
      { value: 200, label: '200km' },
    ],
    []
  );

  const yearsOptions = useMemo(
    () => [
      { value: 2014, label: '2014' },
      { value: 2015, label: '2015' },
      { value: 2016, label: '2016' },
      { value: 2017, label: '2017' },
      { value: 2018, label: '2018' },
      { value: 2019, label: '2019' },
      { value: 2020, label: '2020' },
      { value: 2021, label: '2021' },
    ],
    []
  );

  const pricesOptions = useMemo(
    () => [
      { value: 20000, label: 'R$ 20.000,00' },
      { value: 30000, label: 'R$ 30.000,00' },
      { value: 40000, label: 'R$ 40.000,00' },
      { value: 50000, label: 'R$ 50.000,00' },
      { value: 60000, label: 'R$ 60.000,00' },
    ],
    []
  );

  const [isNews, setIsNews] = useState(true);
  const [isUsed, setIsUsed] = useState(false);
  const [location, setLocation] = useState({
    value: 1,
    label: 'São Paulo - SP',
  });
  const [radius, setRadius] = useState(radiusOptions[0]);
  const [brand, setBrand] = useState(allObj);
  const [brands, setBrands] = useState([allObj]);
  const [model, setModel] = useState(allObj);
  const [models, setModels] = useState([allObj]);
  const [version, setVersion] = useState(allObj);
  const [versions, setVersions] = useState([allObj]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function loadBrands() {
      const response = await api.get('/OnlineChallenge/Make');

      const mBrands = await response.data.map((mBrand) => ({
        label: mBrand.Name,
        value: mBrand.ID,
      }));

      setBrands([allObj, ...mBrands]);
    }
    loadBrands();
  }, [allObj]);

  useEffect(() => {
    async function loadModels() {
      const response = await api.get('/OnlineChallenge/Model', {
        params: {
          BrandID: brand.value,
        },
      });

      const mModels = response.data.map((mModel) => ({
        value: mModel.ID,
        label: mModel.Name,
        data: mModel,
      }));

      setModels([allObj, ...mModels]);
    }

    loadModels();
  }, [brand, allObj]);

  useEffect(() => {
    async function loadVersions() {
      const response = await api.get('/OnlineChallenge/Version', {
        params: {
          ModelID: model.value,
        },
      });

      const mVersions = response.data.map((mVersion) => ({
        value: mVersion.ID,
        label: mVersion.Name,
        data: mVersion,
      }));

      setVersions([allObj, ...mVersions]);
    }
    loadVersions();
  }, [model, allObj]);

  const loadVehicles = useCallback(
    async (page = 1) => {
      const response = await api.get('/OnlineChallenge/Vehicles', {
        params: {
          Page: page,
        },
      });

      if (page === 1) {
        setVehicles(response.data);
      } else {
        setVehicles([...vehicles, response.data]);
      }
    },
    [vehicles]
  );

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  function onBrandChange(value) {
    setBrand(value);
    setModel(models[0]);
    setVersion(versions[0]);
  }

  function onModelChange(value) {
    setModel(value);
    setVersion(versions[0]);
  }

  return (
    <Tabs>
      <div className="content-tab">
        <form className="container-car">
          <div className="checkbox-container">
            <div className="checkbox">
              <input
                type="checkbox"
                id="isNews"
                checked={isNews}
                onChange={() => setIsNews(!isNews)}
              />
              <label htmlFor="isNews">Novos</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="isUsed"
                checked={isUsed}
                onChange={() => setIsUsed(!isUsed)}
              />
              <label htmlFor="isUsed">Usados</label>
            </div>
          </div>
          <div className="section">
            <div className="group">
              <div className="inner-group">
                <SelectInput
                  icon={<GoLocation />}
                  label="Onde"
                  placeholder="Cidade / Estado"
                  style={{ flex: 2.5 }}
                  options={[]}
                  value={location}
                  onChange={setLocation}
                />
                <SelectInput
                  label="Raio"
                  placeholder=""
                  options={radiusOptions}
                  value={radius}
                  onChange={setRadius}
                />
              </div>
              <div className="inner-group">
                <SelectInput
                  placeholder="Ano Desejado"
                  options={yearsOptions}
                  style={{ marginRight: '8px' }}
                />
                <SelectInput
                  placeholder="Faixa de Preço"
                  options={pricesOptions}
                />
              </div>
            </div>
            <div className="group">
              <div className="inner-group">
                <SelectInput
                  style={{ marginRight: '8px' }}
                  isClearable={false}
                  label="Marca"
                  placeholder=""
                  value={brand}
                  onChange={onBrandChange}
                  options={brands}
                />
                <SelectInput
                  label="Modelo"
                  isClearable={false}
                  value={model}
                  placeholder=""
                  options={models}
                  onChange={onModelChange}
                />
              </div>
              <SelectInput
                label="Versão"
                placeholder=""
                isClearable={false}
                value={version}
                onChange={setVersion}
                options={versions}
              />
            </div>
          </div>
          <div className="section">
            <button type="button" className="advanced-search">
              <MdChevronRight />
              Busca Avançada
            </button>
            <div className="actions-container">
              <button type="button" className="clean-button">
                Limpar filtros
              </button>
              <button
                type="button"
                className="submit-button"
                onClick={() => loadVehicles(1)}
              >
                VER OFERTAS
              </button>
            </div>
          </div>
        </form>
      </div>
      <ul className="list">
        {vehicles.map((vehicle) => (
          <Card key={String(vehicle.ID)} vehicle={vehicle} />
        ))}
      </ul>
    </Tabs>
  );
};

export default Car;
