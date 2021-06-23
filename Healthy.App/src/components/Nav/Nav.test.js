import React from "react";
import Nav from "./Nav";
import { shallow, mount } from "enzyme";
import ReactRouterEnzymeContext from "react-router-enzyme-context";

describe("Nav component", () => {
    let component;
    let isLoggedIn = true;
    let handleLogout = jest.fn();
    let options;

    beforeEach(() => {
        options = new ReactRouterEnzymeContext();

        component = mount(
            <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />,
            options.get(),
        );
    });

    it("renders correctly", () => {
        let logoutButton = component
            .find("[data-testid='logoutButton']")
            .first();
        //component.debug();

        expect(logoutButton).toHaveLength(1);

        logoutButton.simulate("click");

        expect(handleLogout).toHaveBeenCalled();
    });
});
