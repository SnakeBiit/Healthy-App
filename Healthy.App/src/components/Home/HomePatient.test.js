import React from "react";
import HomePatient from "./HomePatient";
import { shallow } from "enzyme";
import moxios from "moxios";

const flushPromises = () => new Promise(setImmediate);

describe("Home Patient component", () => {
    let component;
    let handleChange = jest.fn();

    const responseData = [
        {
            id: 1,
            firstName: "Matei",
            lastName: "Popescu",
            birthdate: "1990-11-11",
            socialSecurityNumber: "123123123",
            gender: "male",
            country: "Romania",
            city: "Iasi",
            address: "Str. Independenței, nr 10",
            field: "Medic de familie",
            certifications: null,
            pacientDoctors: null,
            user: null,
            userId: 2,
        },
        {
            id: 2,
            firstName: "Jon",
            lastName: "Snow",
            birthdate: "1990-11-10",
            socialSecurityNumber: "123123123",
            gender: "male",
            country: "Romania",
            city: "Bucuresti",
            address: "str. Dorobanti, nr 20",
            field: "Medicină Dentară",
            certifications: null,
            pacientDoctors: null,
            user: null,
            userId: 3,
        },
        {
            id: 3,
            firstName: "Ion",
            lastName: "Georgescu",
            birthdate: "1990-11-11",
            socialSecurityNumber: "123123123",
            gender: "male",
            country: "Romania",
            city: "Iasi",
            address: "str. Libertatii, nr 20",
            field: "Medic de familie",
            certifications: null,
            pacientDoctors: null,
            user: null,
            userId: 4,
        },
        {
            id: 4,
            firstName: "Alina",
            lastName: "Ionescu",
            birthdate: "1980-11-11",
            socialSecurityNumber: "123123123",
            gender: "female",
            country: "Romania",
            city: "Brasov",
            address: "str. Pacii, nr 12",
            field: "ORL",
            certifications: null,
            pacientDoctors: null,
            user: null,
            userId: 5,
        },
        {
            id: 5,
            firstName: "Alex",
            lastName: "Doctorescu",
            birthdate: "1970-11-11",
            socialSecurityNumber: "123123123",
            gender: "male",
            country: "Romania",
            city: "Bucuresti",
            address: "str. Dorobanti, nr 1",
            field: "Medic de familie",
            certifications: null,
            pacientDoctors: null,
            user: null,
            userId: 6,
        },
    ];

    beforeEach(() => {
        moxios.install();

        component = shallow(<HomePatient />);

        component.update();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("set the passed responseData with an array of 5 doctor objects to state", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(responseData).then(() => {
                expect(component.state("doctors")).toHaveLength(5);
                done();
            });
        });
    });

    it("renders 5 doctor cards", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(responseData).then(() => {
                let doctorCard = component.find("[data-test='doctorCard']");
                expect(doctorCard).toHaveLength(5);
            });
        });
    });

    it("doesn't render any doctor card", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({}).then(() => {
                let doctorCard = component.find("[data-test='doctorCard']");
                expect(doctorCard).toHaveLength(0);
            });
        });
    });
});
