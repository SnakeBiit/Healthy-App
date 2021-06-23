import React, { useState, useEffect } from "react";
import { Redirect, NavLink, Link } from "react-router-dom";
import "./ProfilePatient.css";
import {
    Form,
    Input,
    TextArea,
    Grid,
    Image,
    Breadcrumb,
} from "semantic-ui-react";
import {
    CountryDropdown,
    RegionDropdown,
} from "react-country-region-selector";
import axios from "axios";
import { Alert, Card } from "reactstrap";
import { getUser, getPatient } from "../../api";
import PatientImg from "../Assets/patient.svg";
import { Prompt } from "react-router";

const ProfilePatient = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [existingPreconditions, setExistingPreconditions] = useState("");
    const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [id, setId] = useState("");
    const [user, setUser] = useState("");
    const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);
    useEffect(() => {
        if (!firstName) {
            setFirstNameError({ content: "Please enter your first name" });
        } else {
            setFirstNameError(false);
        }
        if (!lastName) {
            setLastNameError({ content: "Please enter your last name" });
        } else {
            setLastNameError(false);
        }
    }, [firstName, lastName, country, region]);
    useEffect(() => {
        getUser().then(data => {
            if (!data) return;
            const idPatient = data.id;
            setUser(data);
            getPatient(idPatient)
                .then(json => {
                    setId(json.id);
                    setFirstName(json.firstName);
                    setLastName(json.lastName);
                    setExistingPreconditions(json.precondition);
                    setCountry(json.country);
                    setRegion(json.city);
                    setAddress(json.address);
                    setGender(json.gender);
                    setSocialSecurityNumber(json.socialSecurityNumber);
                    setBirthday(json.birthdate);
                })
                .catch(error => console.log("TODO"));
        });
    }, []);
    useEffect(() => {
        if (shouldBlockNavigation) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = undefined;
        }
    });
    const submit = async e => {
        axios
            .put("https://localhost:5001/api/patient/updatePatient", {
                user: user,
                Id: id,
                FirstName: firstName,
                LastName: lastName,
                Country: country,
                City: region,
                Address: address,
                Precondition: existingPreconditions,
                Gender: gender,
                SocialSecurityNumber: socialSecurityNumber.toString(),
                Birthdate: birthday,
            })
            .then(response => {
                if (response) {
                    setError(false);
                    alert(error);
                    setShouldBlockNavigation(false);
                }
            })
            .catch(error => {
                setError(error.response.data.message);
                alert(error);
            });
    };
    const alert = isOk => {
        if (!isOk) {
            return <Alert color="danger">Succesfully updated</Alert>;
        } else {
            return <Alert color="success"> Something went wrong</Alert>;
        }
    };
    const viewMedicalRecord = () => {
        return <Redirect to="medicalRecord" />;
    };
    return (
        <React.Fragment>
            <div className="contaniner">
                <Prompt
                    when={shouldBlockNavigation}
                    message="You have unsaved changes, are you sure you want to leave?"
                />
                <BreadcrumbExample />
                <Grid>
                    <Grid.Row
                        color="orange"
                        fluid
                        raised
                        style={{
                            padding: "10px",
                            borderRadius: "20px",
                            marginTop: 30,
                        }}
                    >
                        <div className="col-lg-7 col-md-10">
                            <h1 className="display-5 text-black">
                                Hello {firstName}
                            </h1>
                        </div>
                        <div className="imgleft">
                            <Image
                                circular
                                floated="left"
                                size="small"
                                src={PatientImg}
                            />
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                        <Card
                            fluid={true}
                            raised={true}
                            style={{ padding: "10px", borderRadius: "20px" }}
                        >
                            <Form onSubmit={submit}>
                                <Form.Group widths="equal">
                                    <Form.Field
                                        id="form-input-control-first-name"
                                        value={firstName}
                                        control={Input}
                                        label="First name"
                                        placeholder="First name"
                                        onChange={e => {
                                            setFirstName(e.target.value);
                                            setShouldBlockNavigation(true);
                                        }}
                                        error={firstNameError}
                                    />
                                    <Form.Field
                                        id="form-input-control-last-name"
                                        control={Input}
                                        value={lastName}
                                        label="Last name"
                                        placeholder="Last name"
                                        onChange={e => {
                                            setLastName(e.target.value);
                                            setShouldBlockNavigation(true);
                                        }}
                                        error={lastNameError}
                                    />
                                </Form.Group>
                                <Form.Field>
                                    <label>Gender</label>
                                    <div className="gender">{gender}</div>
                                </Form.Field>
                                <Form.Field>
                                    <label> Social security number</label>
                                    <Form.Input>
                                        {socialSecurityNumber}
                                    </Form.Input>
                                </Form.Field>
                                <Form.Field
                                    id="form-textarea-control-opinion"
                                    control={TextArea}
                                    value={existingPreconditions}
                                    label="Existing preconditions"
                                    placeholder="Existing preconditions"
                                    onChange={e => {
                                        setExistingPreconditions(
                                            e.target.value,
                                        );
                                        setShouldBlockNavigation(true);
                                    }}
                                />

                                <Form.Field>
                                    <label>Country</label>
                                    <CountryDropdown
                                        value={country}
                                        onChange={val => {
                                            setCountry(val);
                                            setShouldBlockNavigation(true);
                                        }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Region</label>

                                    <RegionDropdown
                                        country={country}
                                        value={region}
                                        onChange={val => {
                                            setRegion(val);
                                            setShouldBlockNavigation(true);
                                        }}
                                    />
                                </Form.Field>
                                <Form.Input
                                    label="Adress"
                                    type="text"
                                    value={address}
                                    onChange={e => {
                                        setAddress(e.target.value);
                                        setShouldBlockNavigation(true);
                                    }}
                                />
                                <Form.Button
                                    color="blue"
                                    content="Update"
                                    disabled={firstNameError || lastNameError}
                                />
                                <Link to="medicalRecord">
                                    <Form.Button
                                        color="red"
                                        content="View my medical record"
                                    />
                                </Link>
                                {error && <Alert color="danger">{error}</Alert>}
                            </Form>
                        </Card>
                    </Grid.Row>
                </Grid>
            </div>
        </React.Fragment>
    );
};

const BreadcrumbExample = () => (
    <Breadcrumb>
        <Breadcrumb.Section as={NavLink} to="/homepage" link>
            Homepage
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>My Profile</Breadcrumb.Section>
    </Breadcrumb>
);

export default ProfilePatient;
