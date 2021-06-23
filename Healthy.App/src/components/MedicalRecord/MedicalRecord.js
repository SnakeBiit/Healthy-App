import React from "react";
import "./MedicalRecord.css";
import {
    Card,
    Grid,
    Header,
    Divider,
    Table,
    Button,
    Breadcrumb,
} from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const genericAppointments = [
    {
        field: "Pediatry",
        doctor: "Marco Polo",
        date: "20/05/2021",
        diagnostic: "Diagnostic",
        prescription: [
            {
                drug: "Ibuprofen",
                frequence: "2/day",
                length: "10 days",
                additionalInfo: "after meals",
            },
            {
                drug: "Paracetamol",
                frequence: "2/day",
                length: "10 days",
                additionalInfo: "after meals",
            },
        ],
    },
    {
        field: "Pediatry",
        doctor: "Marco Polo",
        date: "20/04/2021",
        diagnostic: "Diagnostic",
        prescription: [
            {
                drug: "Ibuprofen",
                frequence: "2/day",
                length: "10 days",
                additionalInfo: "after meals",
            },
        ],
    },
];

function MedicalRecordPagePatient(props) {
    return (
        <div className="patientContainer">
            <BreadcrumbExample />
            {genericAppointments.map((appointment, idx) => (
                <AppointmentCard key={idx} appointment={appointment} />
            ))}
        </div>
    );
}

const AppointmentCard = ({ appointment }) => (
    <Card fluid raised className="appointmentCard">
        <Card.Content>
            <Grid centered columns="equal">
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <Header sub>Field</Header>
                        <span>{appointment.field}</span>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                        <Header sub>Doctor</Header>
                        <span>Dr. {appointment.doctor}</span>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                        <Header sub>Date</Header>
                        <span>{appointment.date}</span>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                        <Header sub>Diagnostic</Header>
                        <span>{appointment.diagnostic}</span>
                    </Grid.Column>
                </Grid.Row>

                <Divider />

                <Grid.Row>
                    <Table compact textAlign="center" unstackable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Drug</Table.HeaderCell>
                                <Table.HeaderCell>Frequence</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Prescription Length
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Additional Info
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {appointment.prescription.map(item => (
                                <Table.Row>
                                    <Table.Cell>{item.drug}</Table.Cell>
                                    <Table.Cell>{item.frequence}</Table.Cell>
                                    <Table.Cell>{item.length}</Table.Cell>
                                    <Table.Cell>
                                        {item.additionalInfo}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid>
        </Card.Content>

        <Card.Content extra>
            <Link to="/patient/treatmentProgress">
                <Button
                    basic
                    color="green"
                    floated="right"
                    data-test="startTreatmentButton"
                >
                    Start Treatment
                </Button>
            </Link>
        </Card.Content>
    </Card>
);

const BreadcrumbExample = () => (
    <Breadcrumb>
        <Breadcrumb.Section as={NavLink} to="/homepage" link>
            Homepage
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section as={NavLink} to="/patient/profile" link>
            My Profile
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>Medical Record</Breadcrumb.Section>
    </Breadcrumb>
);

export default MedicalRecordPagePatient;
