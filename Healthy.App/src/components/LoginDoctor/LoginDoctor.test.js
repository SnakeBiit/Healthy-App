import React from 'react';
import LoginDoctor from './LoginDoctor';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';

export const flushPromises = () => new Promise(setImmediate);

describe("LoginDoctor component", () =>{
  let component;
  let handleLogin = jest.fn();

  beforeEach(() => {
    moxios.install();

    component = shallow(
        <LoginDoctor handleLogin={handleLogin} />,
    );
    component.update();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("renders correctly", async () => {

    moxios.stubRequest("https://localhost:5001/api/authenticate/doctor", {
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
      target: { name: "username", value: "Laurentiu" },
    });
    passwordInput.simulate("change", {
      persist: () => {},
      target: { name: "password", value: "Distrugatorul123!" },
    });

    loginForm.simulate('submit', { preventDefault () {} });
    await flushPromises();
    expect(handleLogin).toHaveBeenCalled();
    
  });

});