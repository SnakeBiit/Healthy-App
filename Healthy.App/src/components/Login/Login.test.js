import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';
import moxios from 'moxios'

describe('mocking axios requests', function () {

  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('renders without crashing', () => {
    shallow(<Login />);

    moxios.wait(async function () {
      let request = await moxios.requests.get("GET", 'https://localhost:5001/weatherForecast')
      request.respondWith({
        status: 200,
        response: [
          { date: '2021-04-29T00:22:43.59746+03:00', temperatureC: '19', summary: 'Cool' },
          { date: '2021-04-30T00:22:43.5974663+03:00', temperatureC: '42', summary: 'Mild' }
        ]
      })
        .then(function () {
          let list = document.querySelector('div[data-test="login-test"]')
          equal(list.rows.length, 2)
          done()
        })
    })
  })
})
