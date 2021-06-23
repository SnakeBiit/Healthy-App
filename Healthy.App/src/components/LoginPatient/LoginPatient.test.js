import React from 'react';
import LoginPatient from './LoginPatient';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';

export const flushPromises = () => new Promise(setImmediate);

describe("Login Patient component", () =>{
  let component;
  let handleLogin = jest.fn();

  beforeEach(() => {
    moxios.install();

    component = shallow(
        <LoginPatient handleLogin={handleLogin} />,
    );
    component.update();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("renders correctly", async () => {

    moxios.stubRequest("https://localhost:5001/api/authenticate/patient", {
      status: 200,
      response: { data: "smth" },
  });

    let usernameInput = component.find("[data-test='usernameInput']");
    let passwordInput = component.find("[data-test='passwordInput']");
    let loginForm = component.find("[data-test='loginForm']");

    expect(usernameInput).toHaveLength(1);
    expect(passwordInput).toHaveLength(1);

    usernameInput.simulate("change", {
      persist: () => {},
      target: { name: "username", value: "Marius" },
    });
    passwordInput.simulate("change", {
      persist: () => {},
      target: { name: "password", value: "Alex12345!" },
    });

    loginForm.simulate('submit', { preventDefault () {} });
    await flushPromises();
    expect(handleLogin).toHaveBeenCalled();
    
  });

});