import React from 'react';
import Main from './Main';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Main />);
});