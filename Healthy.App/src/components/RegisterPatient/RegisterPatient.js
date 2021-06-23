import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./RegisterPatient.css";
import {
    Form,
    Input,
    TextArea,
} from "semantic-ui-react";
import {
    CountryDropdown,
    RegionDropdown,
} from "react-country-region-selector";
import axios from "axios";
import { Alert } from "reactstrap";

const RegisterPatient = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [existingPreconditions, setExistingPreconditions] = useState("");
    const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [genderError, setGenderError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [regionError, setRegionError] = useState(false);
    const [socialSecurityNumberError, setSocialSecurityNumberError] =
        useState(false);
    const [existingPreconditionsError, setExistingPreconditionsError] =
        useState(false);
    const [addressError, setAddressError] = useState(false);
    const [birthdayError, setBirthdayError] = useState(false);

    const submit = async e => {
        setError(false);
        if (!firstName) {
            setFirstNameError({ content: "Please enter your first name" });
        } else {
            setFirstNameError(false);
        }
        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*[#^\s-])[A-Za-z\d@$!%*?&#^].{8,30}$/.test(
                password,
            )
        ) {
            setPasswordError({
                content:
                    "Error: Password must contain a capital letter, a special character (%,!,@) and a number! Minimum 8 characters",
            });
        } else {
            setPasswordError(false);
        }
        if (!/^(?!.*[#^\s-]).{2,30}$/.test(username)) {
            setUsernameError({
                content: "Error: Username/Email can't be empty.",
                pointing: "below",
            });
        } else {
            setUsernameError(false);
        }
        if (confirmPassword != password) {
            setConfirmPasswordError({
                content: "Error: Passwords don t match",
            });
        } else {
            setConfirmPasswordError(false);
        }
        if (!lastName) {
            setLastNameError({ content: "Please enter your last name" });
        } else {
            setLastNameError(false);
        }
        if (!socialSecurityNumber) {
            setSocialSecurityNumberError({
                content: "Please enter your social security number",
            });
        } else {
            setSocialSecurityNumberError(false);
        }
        if (!existingPreconditions) {
            setExistingPreconditionsError({
                content:
                    "Please enter your preconditions or write `no preconditions`.",
            });
        } else {
            setExistingPreconditionsError(false);
        }
        if (!address) {
            setAddressError({ content: "Please enter your address." });
        } else {
            setAddressError(false);
        }
        if (!birthday) {
            setBirthdayError({ content: "Please enter your birthday." });
        } else {
            setBirthdayError(false);
        }

        if (!firstName) {
            setFirstNameError({ content: "Please enter your first name" });
        } else {
            setFirstNameError(false);
        }
        if (!gender || gender.length < 1) {
            setGenderError({ content: "Please enter your gender" });
        } else {
            setGenderError(false);
        }
        if (!country) {
            setCountryError({ content: "Please enter your country" });
        } else {
            setCountryError(false);
        }
        if (!region) {
            setRegionError({ content: "Please enter your region" });
        } else {
            setRegionError(false);
        }
        if (
            !firstNameError &&
            !lastNameError &&
            !usernameError &&
            !passwordError &&
            !genderError &&
            !countryError &&
            !regionError &&
            !confirmPasswordError &&
            !addressError &&
            !existingPreconditionsError &&
            !birthdayError &&
            !socialSecurityNumberError
        ) {
            axios
                .post("https://localhost:5001/api/registerPatient", {
                    user: {
                        UserName: username,
                        Password: password,
                    },
                    FirstName: firstName,
                    LastName: lastName,
                    Birthdate: birthday,
                    Gender: gender,
                    SocialSecurityNumber: socialSecurityNumber.toString(),
                    Country: country,
                    City: region,
                    Address: address,
                    Precondition: existingPreconditions,
                })
                .then(response => {
                    if (response) {
                        setError(false);
                        setRedirect(true);
                    }
                })
                .catch(error => {
                    setError(error.response.data.message);
                });
        }
    };

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <div class="contaniner">
            <Form onSubmit={submit} data-testid="registerForm">
                <Form.Group widths="equal">
                    <Form.Field
                        id="form-input-control-first-name"
                        data-testid="input-first-name"
                        control={Input}
                        label="First name"
                        placeholder="First name"
                        onChange={e => setFirstName(e.target.value)}
                        error={firstNameError}
                    />
                    <Form.Field
                        id="form-input-control-last-name"
                        data-testid="input-last-name"
                        control={Input}
                        label="Last name"
                        placeholder="Last name"
                        onChange={e => setLastName(e.target.value)}
                        error={lastNameError}
                    />
                    <Form.Field error={genderError}>
                        <label for="gender">Gender</label>
                        <select
                            class="ui dropdown"
                            data-testid="input-gender"
                            onChange={e => setGender(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </Form.Field>
                </Form.Group>
                <Form.Field
                    id="form-input-control-error-email"
                    control={Input}
                    data-testid="input-username"
                    label="Username"
                    placeholder="username"
                    onChange={e => setUsername(e.target.value)}
                    error={usernameError}
                />
                <Form.Input
                    data-testid="input-password"
                    label="Enter Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    error={passwordError}
                />
                <Form.Input
                    label="Confirm Password"
                    type="password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    error={confirmPasswordError}
                />

                <Form.Input
                    error={birthdayError}
                    label="Birthday"
                    data-testid="input-birthday"
                    type="date"
                    onChange={e => setBirthday(e.target.value)}
                />
                <Form.Input
                    error={socialSecurityNumberError}
                    label="Social Security Number"
                    data-testid="input-social-security-number"
                    type="number"
                    onChange={e => setSocialSecurityNumber(e.target.value)}
                />
                <Form.Field
                    error={existingPreconditionsError}
                    id="form-textarea-control-opinion"
                    control={TextArea}
                    label="Existing preconditions"
                    data-testid="input-existing-preconditions"
                    placeholder="Existing preconditions"
                    onChange={e => setExistingPreconditions(e.target.value)}
                />
                <Form.Field error={countryError}>
                    <label>Country</label>
                    <CountryDropdown
                        value={country}
                        data-testid="input-country"
                        onChange={val => setCountry(val)}
                    />
                </Form.Field>
                <Form.Field error={regionError}>
                    <label>Region</label>

                    <RegionDropdown
                        country={country}
                        data-testid="input-region"
                        value={region}
                        onChange={val => setRegion(val)}
                    />
                </Form.Field>
                <Form.Input
                    error={addressError}
                    label="Adress"
                    data-testid="input-address"
                    type="text"
                    onChange={e => setAddress(e.target.value)}
                />
                <Form.Checkbox label="I agree to the Terms and Conditions" />
                <Form.Button
                    color="blue"
                    content="Submit"
                    data-testid="button-submit"
                />
                {error && <Alert color="danger">{error}</Alert>}
            </Form>
        </div>
    );
};
export default RegisterPatient;
