import React from "react";
import { getDoctors } from "../../api";
import "./Home.css";
import DoctorImg from "../Assets/doctor.svg";
import { Card, Image, Grid } from "semantic-ui-react";
import { Input, Segment, Header } from "semantic-ui-react";
import ScheduleAppointmentModal from "./ScheduleAppointmentModal";

class HomePatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            filteredDoctors: [],
            searchName: "",
            searchField: "",
            searchAddress: "",
        };
    }

    handleChange = event => {
        this.setState(
            { [event.target.name]: event.target.value },
            this.filterList,
        );
    };

    filterList = () => {
        let { doctors, filteredDoctors } = this.state;
        const { searchName, searchField, searchAddress } = this.state;

        doctors = doctors.filter(doctor => {
            const fullname = `${doctor.firstName} ${doctor.lastName}`;

            if (!searchName && !searchAddress && !searchField) return true;

            return (
                fullname
                    .toLowerCase()
                    .includes(searchName.toLowerCase().trim()) &&
                doctor.field
                    .toLowerCase()
                    .includes(searchField.toLowerCase().trim()) &&
                doctor.address
                    .toLowerCase()
                    .includes(searchAddress.toLowerCase().trim())
            );
        });

        this.setState({ filteredDoctors: doctors });
    };

    componentDidMount() {
        getDoctors()
            .then(json => {
                if (json)
                    this.setState({ doctors: json, filteredDoctors: json });
            })
            .catch(error =>
                this.setState({ doctors: [], filteredDoctors: [] }),
            );
    }

    render() {
        const { filteredDoctors, searchName, searchField, searchAddress } =
            this.state;

        return (
            <React.Fragment>
                <div className="cardDoctorContainer">
                    <Segment raised>
                        <Header as="h4">Filter Results</Header>
                        <Input
                            icon="search"
                            iconPosition="left"
                            fluid
                            name="searchName"
                            value={searchName}
                            placeholder="Search by Name..."
                            onChange={this.handleChange}
                        />
                        <Input
                            icon="search"
                            iconPosition="left"
                            fluid
                            name="searchField"
                            value={searchField}
                            placeholder="Search by Field..."
                            onChange={this.handleChange}
                            style={{ margin: "10px 0" }}
                        />
                        <Input
                            icon="search"
                            iconPosition="left"
                            fluid
                            name="searchAddress"
                            value={searchAddress}
                            placeholder="Search by Address..."
                            onChange={this.handleChange}
                        />
                    </Segment>

                    {filteredDoctors.length ? (
                        filteredDoctors.map(doctor => (
                            <CardDoctor
                                key={doctor.id}
                                data-test="doctorCard"
                                userId={this.props.userId}
                                doctorId={doctor.id}
                                firstName={doctor.firstName}
                                lastName={doctor.lastName}
                                field={doctor.field}
                                address={doctor.address}
                            />
                        ))
                    ) : (
                        <h4>No results found.</h4>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

const CardDoctor = ({
    firstName,
    lastName,
    field,
    address,
    doctorId,
    userId,
}) => (
    <Card fluid={true} raised={true}>
        <Grid columns="equal">
            <Grid.Column
                width={10}
                verticalAlign="middle"
                className="customColumn"
            >
                <Image
                    circular
                    floated="left"
                    size="tiny"
                    src={DoctorImg}
                    className="imageCard"
                />
                <Card.Header style={{ fontSize: 18, marginTop: 5 }}>
                    Dr. {firstName} {lastName}
                </Card.Header>
                <Card.Description style={{ margin: "5px 0" }}>
                    <span style={{ opacity: 0.5 }}>Field:</span> {field}
                </Card.Description>
                <Card.Description>
                    {" "}
                    <span style={{ opacity: 0.5 }}>Address:</span> {address}
                </Card.Description>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
                <div className="ui two buttons cardBtn">
                    <ScheduleAppointmentModal
                        userId={userId}
                        doctorId={doctorId}
                        firstName={firstName}
                        lastName={lastName}
                        field={field}
                        address={address}
                    />
                </div>
            </Grid.Column>
        </Grid>
    </Card>
);

export default HomePatient;
