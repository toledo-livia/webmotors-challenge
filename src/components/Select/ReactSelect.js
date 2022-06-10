import styled from 'styled-components';
import Async from 'react-select/async';
import ReactSelect from 'react-select';

export const AsyncSelect = styled(Async)`
  background: transparent;
  border: none;
  font-size: 18px;
  color: #333;
  font-weight: bold;
  width: 100%;
  align-self: stretch;
`;

export const ReactSelectInput = styled(ReactSelect)`
  background: transparent;
  border: none;
  flex: 1;
  font-size: 18px;
  color: #333;
  font-weight: bold;
  width: 100%;
  align-self: stretch;
`;
