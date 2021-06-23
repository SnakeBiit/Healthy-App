import React from "react";
import {
    Card,
    Grid,
    Image,
    Button,
    Segment,
    Header,
    Dropdown,
} from "semantic-ui-react";
import PatientImg from "../Assets/patient.svg";
import "./Home.css";
import {
    getAppointments,
    changeStatusToConfirmed,
    changeStatusToRejected,
} from "../../api";
import EditAppointmentModal from "./EditAppointmentModal";

const filterStatusOptions = [
    { key: "all", value: "all", text: "All" },
    { key: "pending", value: "pending", text: "Pending" },
    { key: "confirmed", value: "confirmed", text: "Confirmed" },
    { key: "rejected", value: "rejected", text: "Rejected" },
    { key: "finished", value: "finished", text: "Finished" },
];

class HomeDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            filteredAppointments: [],
            filterOption: "all",
        };
    }

    componentDidMount() {
        getAppointments(this.props.userId)
            .then(json => {
                if (json) {
                    console.log(json)
                    this.setState({
                        appointments: json,
                        filteredAppointments: json,
                    });
                }
            })
            .catch(err => {
                this.setState({
                    appointments: [],
                    filteredAppointments: [],
                });
            });
    }

    getSelectedValue = (event, { value }) => {
        var filteredAppointments = this.filterList(value);
        this.setState({
            filterOption: value,
            filteredAppointments: filteredAppointments,
        });
    };

    filterList = status => {
        let { appointments, filteredAppointments } = this.state;

        if (status == "all") {
            return appointments;
        }

        appointments = appointments.filter(a => a.status == status);

        return appointments;
    };

    render() {
        const { filteredAppointments } = this.state;

        return (
            <React.Fragment>
                <div className="cardPatientContainer">
                    <Segment raised>
                        <Header as="h4">Filter Results by Status</Header>
                        <Dropdown
                            placeholder="Filter by Status"
                            selection
                            options={filterStatusOptions}
                            onChange={this.getSelectedValue}
                        />
                    </Segment>

                    {filteredAppointments.length ? (
                        filteredAppointments.map(appointment => {
                            console.log(appointment)
                            return (
                                <CardPatient
                                    key={appointment.id}
                                    id={appointment.id}
                                    firstName={appointment.firstName}
                                    lastName={appointment.lastName}
                                    symptoms={appointment.symptoms}
                                    address={appointment.address}
                                    dateTime={appointment.appointmentDate}
                                    status={appointment.status}
                                    prescriptionId = {appointment.prescriptionId}
                                />
                            );
                        })
                    ) : (
                        <h4>No results found.</h4>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

class CardPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            symptoms: props.symptoms,
            address: props.address,
            dateTime: props.dateTime,
            doctorId: props.doctorId,
            userId: props.userId,
            status: props.status,
            prescriptionId: props.prescriptionId,
        };
    }

    handleClickConfirm = () => {
        changeStatusToConfirmed(this.props.id);
        this.setState({ status: "confirmed" });
    };

    handleClickReject = () => {
        changeStatusToRejected(this.props.id);
        this.setState({ status: "rejected" });
    };

    handleClickEdit = () => {
        // TODO: send api request to the backend
        alert("TODO");
    };

    render() {
        const {
            firstName,
            lastName,
            symptoms,
            address,
            dateTime,
            doctorId,
            userId,
            status,
            prescriptionId
        } = this.state;

        let color = "grey";

        switch (status) {
            case "rejected":
                color = "red";
                break;
            case "finished":
                color = "blue";
                break;
            default:
                break;
        }

        return (
            <Card color={color} fluid={true} raised={true}>
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
                            src={PatientImg}
                            className="imageCard"
                        />
                        <Card.Header style={{ fontSize: 18, marginTop: 5 }}>
                            <span style={{ opacity: 0.5 }}>Name:</span>{" "}
                            {firstName} {lastName}
                        </Card.Header>
                        <Card.Description>
                            {" "}
                            <span style={{ opacity: 0.5 }}>Address:</span>{" "}
                            {address}
                        </Card.Description>
                        <Card.Description>
                            {" "}
                            <span style={{ opacity: 0.5 }}>DateTime:</span>{" "}
                            {dateTime}
                        </Card.Description>
                        <Card.Description>
                            <span style={{ opacity: 0.5 }}>Symptoms:</span>{" "}
                            {symptoms}
                        </Card.Description>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                        {status == "pending" && (
                            <div className="ui two buttons cardBtn">
                                <Button
                                    basic
                                    color="green"
                                    onClick={this.handleClickConfirm}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    basic
                                    color="red"
                                    onClick={this.handleClickReject}
                                >
                                    Reject
                                </Button>
                            </div>
                        )}
                        {status == "confirmed" && (
                            <div className="ui two buttons cardBtn">
                                <EditAppointmentModal
                                    firstName={firstName}
                                    lastName={lastName}
                                    symptoms={symptoms}
                                    prescriptionId ={prescriptionId}
                                />
                            </div>
                        )}
                        {status == "rejected" && (
                            <div className="ui two buttons cardBtn">
                                <Button disabled basic color="red">
                                    Rejected
                                </Button>
                            </div>
                        )}
                        {status == "finished" && (
                            <div className="ui two buttons cardBtn">
                                <Button disabled basic color="blue">
                                    Finished
                                </Button>
                            </div>
                        )}
                    </Grid.Column>
                </Grid>
            </Card>
        );
    }
}

export default HomeDoctor;
