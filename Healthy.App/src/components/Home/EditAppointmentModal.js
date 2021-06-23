import React, { useEffect, useState } from "react";
import {
    Button,
    Header,
    Image,
    Modal,
    Form,
    Divider,
    Input,
    Table,
} from "semantic-ui-react";
import "./Home.css";
import PatientImg from "../Assets/patient.svg";
import {postTreatment
} from "../../api";

function ModalExampleModal({
    firstName,
    lastName,
    symptoms,
    prescriptionId
}) {
    const [open, setOpen] = React.useState(false);
    const [assessment, setAssessment] = React.useState("");
    const [diagnostic, setDiagnostic] = React.useState("");
    const [treatment, setTreatment] = React.useState(false);

    const handleSendAppointment = async () => {
        postTreatment(prescriptionId ,treatment , assessment,diagnostic , symptoms )
        setOpen(false);
    };

    const handleChangeTreatment = treatment => {
        setTreatment(treatment);
    };

    return (
        <Modal
            className="modalFixing"
            onClose={() => {
                setOpen(false);
            }}
            onOpen={() => {
                setOpen(true);
            }}
            open={open}
            trigger={
                <Button basic color="blue">
                    Edit Appointment
                </Button>
            }
        >
            <Modal.Header>Edit An Appointment</Modal.Header>
            <Modal.Content image style={{ display: "flex" }}>
                <Image size="medium" src={PatientImg} wrapped />
                <Modal.Description style={{ paddingLeft: 75, width: "100%" }}>
                    <Header>
                        {firstName} {lastName}
                    </Header>
                    <p>
                        <span style={{ opacity: 0.5 }}>Symptoms:</span>{" "}
                        {symptoms}
                    </p>
                    <p>
                        <span style={{ opacity: 0.5 }}>Assessment:</span>{" "}
                        <Input
                            onChange={(e, data) => {
                                setAssessment(data.value);
                            }}
                            fluid
                        />
                    </p>

                    <p>
                        <span style={{ opacity: 0.5 }}>Diagnostic:</span>{" "}
                        <Input
                            onChange={(e, data) => {
                                setDiagnostic(data.value);
                            }}
                            fluid
                        />
                    </p>

                    <Divider />

                    <TreatmentTable
                        handleChangeTreatment={handleChangeTreatment}
                    />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Send treatment"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => handleSendAppointment()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

const TreatmentTable = props => {
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        frequency: "",
        length: "",
        additionalInfo: "",
    });

    useEffect(() => {
        props.handleChangeTreatment(rows);
    }, [rows]);

    const handleChange = (event, data) => {
        setFormData(prevState => ({
            ...prevState,
            [data.name]: data.value,
        }));
    };

    const handleSubmit = () => {
        if (
            formData.name &&
            formData.frequency &&
            formData.length &&
            formData.additionalInfo
        ) {
            setRows(prevState => [...prevState, formData]);
            setFormData({ name: "", frequency: "", length: "", additionalInfo: "" });
        }
    };

    const handleDeleteRow = index => {
        var copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
    };

    return (
        <div>
            <p>Treatment: TODO</p>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Drug</Table.HeaderCell>
                        <Table.HeaderCell>frequency</Table.HeaderCell>
                        <Table.HeaderCell>Prescription Length</Table.HeaderCell>
                        <Table.HeaderCell>Additional Info</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows.map((row, idx) => (
                        <Table.Row key={idx}>
                            <Table.Cell>{row.name}</Table.Cell>
                            <Table.Cell>{row.frequency}</Table.Cell>
                            <Table.Cell>{row.length}</Table.Cell>
                            <Table.Cell>{row.additionalInfo}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    onClick={() => {
                                        handleDeleteRow(idx);
                                    }}
                                >
                                    delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Divider />

            <p>Add Drug</p>

            <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        type="text"
                        name="name"
                        placeholder="Drug Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Form.Input
                        fluid
                        type="number"
                        name="frequency"
                        placeholder="Frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                    />
                    <Form.Input
                        fluid
                        type="number"
                        name="length"
                        placeholder="Prescription Length"
                        value={formData.length}
                        onChange={handleChange}
                    />
                    <Form.Input
                        fluid
                        type="text"
                        name="additionalInfo"
                        placeholder="Additional Info"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Button color="blue" basic>
                    Submit
                </Form.Button>
            </Form>
        </div>
    );
};

export default ModalExampleModal;
