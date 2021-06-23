import React from "react";
import RegisterDoctor from "./RegisterDoctor";
import { shallow, render, mount, configure } from "enzyme";
import Enzyme from "enzyme";
import moxios from "moxios";

import Adapter from "enzyme-adapter-react-16";

configure({ Adapter: new Adapter() });
export const flushPromises = () => new Promise(setImmediate);

describe("RegisterDoctor", () => {
    let wrapper;

    beforeEach(() => {
        moxios.install();
        wrapper = Enzyme.mount(<RegisterDoctor />);
        wrapper.update();
    });

    afterEach(() => {
        jest.clearAllMocks();
        moxios.uninstall();
    });

    it("renders without crashing", () => {
        shallow(<RegisterDoctor />);
    });

    it("error occurs when first name is invalid", () => {
        const formSubmit = wrapper
        .find("[data-testid='registerForm']")
        .first();       
        formSubmit.simulate("submit", { preventDefault() {} });
        expect(wrapper.find("[data-testid='input-first-name']").find('Label').props().content).toEqual( "Please enter your first name")


    });
    it("register correctly", async () => {
        
        const formSubmit = wrapper
        .find("[data-testid='registerForm']")
        .first();     
        const firstNameInput = wrapper
            .find("[data-testid='input-first-name']").first();
        const lastNameInput = wrapper
            .find("[data-testid='input-last-name']")
            .first();
        const genderInput = wrapper
            .find("[data-testid='input-gender']")
            .first();
        const usernameInput = wrapper
            .find("[data-testid='input-username']")
            .first();
        const passwordInput = wrapper
            .find("[data-testid='input-password']")
            .first();
        const birthdayInput = wrapper
            .find("[data-testid='input-birthday']")
            .first();
        const SocialSecurityNumberInput = wrapper
            .find("[data-testid='input-social-security-number']")
            .first();
        const countryInput = wrapper
            .find("[data-testid='input-country']")
            .first();
        const regionInput = wrapper
            .find("[data-testid='input-region']")
            .first();
        const addressInput = wrapper
            .find("[data-testid='input-address']")
            .first();
        const fieldInput = wrapper
            .find("[data-testid='input-field']")
            .first();
        const certificationsInput = wrapper
            .find("[data-testid='input-certifications']")
            .first();
        function makeChanges(input, targetValue) {
            input.simulate("change", {
                persist: () => {},
                target: { value: targetValue },
            });
        }
        makeChanges(usernameInput, "Alex12345");
        makeChanges(passwordInput, "Alex12345!");
        makeChanges(firstNameInput, "Maria");
        makeChanges(lastNameInput, "JosReact");
        makeChanges(genderInput, "female");
        makeChanges(fieldInput, "medicina");
        makeChanges(birthdayInput, "11/11/2020");
        makeChanges(SocialSecurityNumberInput, "23323232");
        makeChanges(countryInput, "Romania");
        makeChanges(regionInput, "Arges");
        makeChanges(addressInput, " peste tot si nicaieri");
        makeChanges(certificationsInput, [
            { Information: "doctorul anului" },
            { Information: "doctorul mileniului" },
        ]);
        formSubmit.simulate("submit", { preventDefault() {} });
        await flushPromises();
        let request = moxios.requests.mostRecent();
        let result = false;
        if (request) {
            result = true;
        }
        expect(result).toBe(true);
    });
});
