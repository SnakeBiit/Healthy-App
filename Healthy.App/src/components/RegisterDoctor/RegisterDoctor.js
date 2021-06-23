import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./RegisterDoctor.css";
import {
    Form,
    Input,
    List,
} from "semantic-ui-react";
import {
    CountryDropdown,
    RegionDropdown,
} from "react-country-region-selector";
import { Alert } from "reactstrap";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const RegisterDoctor = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [certification, setCertification] = useState("");

    const [redirect, setRedirect] = useState(false);
    const [field, setField] = useState("");
    const [error, setError] = useState(false);
    const [birthdayError, setBirthdayError] = useState("");
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
    const [fieldError, setFieldError] = useState(false);
    const [addressError, setAddressError] = useState(false);

    const [certificationError, setCertificationError] = useState(false);
    const [certificationList, setCertificationList] = useState([]);

    useEffect(() => {
        if (!certification) {
            setCertificationError({
                content: "Please enter your certification",
            });
        } else {
            setCertificationError(false);
        }
    }, [certification, certificationList]);
    const submit = async e => {
      setError(false);
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

        if (!firstName) {

            setFirstNameError({ content: "Please enter your first name" });
        } else {
            setFirstNameError(false);
        }
        if (!socialSecurityNumber) {
            setSocialSecurityNumberError({
                content: "Please enter your social security number ",
            });
        } else {
            setSocialSecurityNumberError(false);
        }
        if (!field) {
            setFieldError({ content: "Please enter your field " });
        } else {
            setFieldError(false);
        }
        if (!address) {
            setAddressError({ content: "Please enter your adress " });
        } else {
            setAddressError(false);
        }
        if (!lastName) {
            setLastNameError({ content: "Please enter your first name" });
        } else {
            setLastNameError(false);
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
            parseInt(birthday.substring(0, 4)) >=
                new Date().getFullYear() - 25 ||
            !birthday
        ) {
            setBirthdayError({
                content: "Error: You must be at least 25 years old!",
                pointing: "below",
            });
        } else {
            setBirthdayError(false);
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
            !birthdayError &&
            !socialSecurityNumberError &&
            !fieldError &&
            !addressError
        ) {


            axios
                .post("https://localhost:5001/api/registerDoctor", {
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
                    Field: field,
                    Certifications: sendCertifications(),
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
    const sendCertifications = () => {
        let Certifications = [];
        for (let i = 0; i < certificationList.length; i++) {
            let newItem = { Information: certificationList[i].certification };
            Certifications.push(newItem);
        }

        return Certifications;
    };
    const addCertification = () => {
        let newItem = {
            certification: certification,
            id: uuidv4(),
        };
        const newList = certificationList.concat(newItem);
        setCertificationList(newList);
        setCertification("");
    };

    if (redirect) {
        return <Redirect to="/login" />;
    }
    return (
        <div class="contaniner">
            <Form onSubmit={addCertification} >
                <Form.Group>
                    <Form.Button
                        content="Add Certification"
                        icon="add circle"
                        labelPosition="left"
                        color="blue"
                        size="small"
                        disabled={certificationError}
                    />
                    <Form.Field
                        size="small"
                        control={Input}
                        placeholder="Certification"
                        onChange={e => setCertification(e.target.value)}
                        data-testid="input-certifications"
                    />
                </Form.Group>
                <div className="certifications"> Certifications</div>
                <List>
                    {certificationList.map(item => (
                        <List.Item key={item.id}>
                            {item.certification}
                        </List.Item>
                    ))}
                </List>
                <br></br>
            </Form>
            <Form onSubmit={submit} data-testid="registerForm">
                <Form.Group widths="equal">
                    <Form.Field
                        control={Input}
                        label="First name"
                        placeholder="First name"
                        onChange={e => setFirstName(e.target.value)}
                        error={firstNameError}
                        data-testid="input-first-name"
                    />
                    <Form.Field
                        control={Input}
                        label="Last name"
                        placeholder="Last name"
                        onChange={e => setLastName(e.target.value)}
                        error={lastNameError}
                        data-testid="input-last-name"
                    />
                    <Form.Field error={genderError}>
                        <label for="gender">Gender</label>
                        <select
                            class="ui dropdown"
                            onChange={e => setGender(e.target.value)}
                            data-testid="input-gender"
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
                    label="Username"
                    placeholder="username"
                    data-testid="input-username"
                    error={{
                        content: "Please enter a valid email address",
                        pointing: "below",
                    }}
                    onChange={e => setUsername(e.target.value)}
                    error={usernameError}
                />
                <Form.Field
                    error={fieldError}
                    id="form-input-control-field"
                    control={Input}
                    label="Field"
                    placeholder="Field"
                    onChange={e => setField(e.target.value)}
                    data-testid="input-field"
                />
                <Form.Input
                    label="Enter Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    error={passwordError}
                    data-testid="input-password"
                />
                <Form.Input
                    label="Confirm Password"
                    type="password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    error={confirmPasswordError}
                />

                <Form.Input
                    label="Birthday"
                    type="date"
                    onChange={e => setBirthday(e.target.value)}
                    error={birthdayError}
                    data-testid="input-birthday"
                />
                <Form.Input
                    error={socialSecurityNumberError}
                    label="Social Security Number"
                    type="number"
                    onChange={e => setSocialSecurityNumber(e.target.value)}
                    data-testid="input-social-security-number"
                />
                <Form.Field error={countryError}>
                    <label>Country</label>
                    <CountryDropdown
                        value={country}
                        onChange={val => setCountry(val)}
                        data-testid="input-country"
                    />
                </Form.Field>
                <Form.Field error={regionError}>
                    <label>Region</label>

                    <RegionDropdown
                        country={country}
                        value={region}
                        onChange={val => setRegion(val)}
                        data-testid="input-region"
                    />
                </Form.Field>
                <Form.Input
                    error={addressError}
                    label="Adress"
                    type="text"
                    onChange={e => setAddress(e.target.value)}
                    data-testid="input-address"
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
export default RegisterDoctor;
