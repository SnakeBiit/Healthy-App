import React, { useState, useEffect } from "react";
import "./PatientProgress.css";
import {
    Card,
    Grid,
    Header,
    Divider,
    Table,
    Button,
    Checkbox,
} from "semantic-ui-react";
import {
    getPrescription,
    getDrugsByPrescriptionId,
} from "../../api";

const treatments = [
    {
        date: "23/04/2021",
        drugsInfo: [
            {
                drug: "Ibuprofen #1",
                additionalInfo: "after meals",
            },
            {
                drug: "Ibuprofen #2",
                additionalInfo: "before meals",
            },
        ],
    },
    {
        date: "22/04/2021",
        drugsInfo: [
            {
                drug: "Aspirine",
                additionalInfo: " no",
            },
            {
                drug: "CevaGresit",
                additionalInfo: " da",
            },
        ],
    },
    {
        date: "21/04/2021",
        drugsInfo: [
            {
                drug: "Aspirine2",
                additionalInfo: " no2",
            },
        ],
    },
];

const PatientProgress = () => {
    const [prescription, setPrescription] = useState(null);
    const [drugs, setDrugs] = useState(null);

    useEffect(() => {
        getPrescription(2)
            .then(json => {
                getDrugsByPrescriptionId(2).then(drugs => {
                    setDrugs(drugs);
                });
                setPrescription(json);
            })
            .catch(error => console.log("TODO"));
    }, []);

    return (
        <div className="patientContainer">
            {treatments.map(treatment => (
                <TreatmentCards treatment={treatment} treatments={treatments} />
            ))}
        </div>
    );
};
const TreatmentCards = ({ treatment, treatments }) => {
    const saveProgress = () => {
      // TODO  postPrescription(prescription.id, drugs, prescription.startDate);
    };

    return (
        <Card fluid raised className="patientProgressCard">
            <Card.Content>
                <Grid centered columns="equal">
                    <Grid.Row>
                        <Grid.Column textAlign="left">
                            <Header sub>Date</Header>
                            <span>{treatment.date}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Table compact textAlign="center" unstackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Drug</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Additional info
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {treatment.drugsInfo.map(item => (
                                    <Table.Row>
                                        <Table.Cell>{item.drug}</Table.Cell>
                                        <Table.Cell>
                                            {item.additionalInfo}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Checkbox
                                                disabled={
                                                    !(
                                                        treatments.findIndex(
                                                            x =>
                                                                x === treatment,
                                                        ) === 0
                                                    )
                                                }
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                </Grid>
            </Card.Content>
            <Card.Content extra>
                {treatments.findIndex(x => x === treatment) === 0 && (
                    <Button
                        basic
                        color="green"
                        floated="right"
                        onClick={saveProgress}
                    >
                        Save progress
                    </Button>
                )}
            </Card.Content>
        </Card>
    );
};
export default PatientProgress;
