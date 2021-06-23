import React from 'react';
import PatientProgress from './PatientProgress';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<PatientProgress />);
});