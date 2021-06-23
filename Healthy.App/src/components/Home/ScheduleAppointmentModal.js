import React, { useEffect } from "react";
import { Button, Header, Image, Modal, Form, Divider } from "semantic-ui-react";
import "./Home.css";
import DoctorImg from "../Assets/doctor.svg";
import { DateTimeInput } from "semantic-ui-calendar-react";
import { scheduleAppointment, getPatient, getUser } from "../../api";

function ModalExampleModal({
    firstName,
    lastName,
    field,
    address,
    doctorId,
    userId,
}) {
    const [open, setOpen] = React.useState(false);
    const [dateTime, setDateTime] = React.useState("");
    const [simptoms, setSimptoms] = React.useState("");
    const [patientId, setPatientId] = React.useState("");

    const handleDateTimeChange = value => {
        setDateTime(value);
    };

    const clearInputs = () => {
        setDateTime("");
        setSimptoms("");
    };

    const handleSendAppointment = async () => {
        await scheduleAppointment(doctorId, patientId, dateTime, simptoms);
        setOpen(false);
    };

    useEffect(() => {
        getUser().then(data => {
            if (!data) return;
            const idPatient = data.id;
            getPatient(idPatient).then(json => {
          
                setPatientId(json.id);
            });
        });
    }, []);

    return (
        <Modal
            className="modalFixing"
            onClose={() => {
                setOpen(false);
                clearInputs();
            }}
            onOpen={() => {
                setOpen(true);
                clearInputs();
            }}
            open={open}
            trigger={
                <Button basic color="green">
                    Schedule Appointment
                </Button>
            }
        >
            <Modal.Header>Schedule An Appointment</Modal.Header>
            <Modal.Content
                image
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Image size="medium" src={DoctorImg} wrapped />
                <Modal.Description style={{ paddingLeft: 75 }}>
                    <Header>
                        Dr. {firstName} {lastName}
                    </Header>
                    <p>
                        <span style={{ opacity: 0.5 }}>Field:</span> {field}
                    </p>
                    <p>
                        {" "}
                        <span style={{ opacity: 0.5 }}>Address:</span> {address}{" "}
                    </p>

                    <Divider />

                    <p>Select Date and Time:</p>
                    <DateTimeForm
                        handleChange={handleDateTimeChange}
                        value={dateTime}
                    />

                    <Form>
                        <p>Type your simptoms:</p>

                        <Form.TextArea
                            placeholder="Simptoms"
                            onChange={(e, { value }) => setSimptoms(value)}
                        />
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    disabled={!dateTime || !simptoms}
                    content="Send appointment"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => handleSendAppointment()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

class DateTimeForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event, { name, value }) => {
        this.props.handleChange(value);
    };

    getNextOccurringSaturday = date => {
        var lastday = date.getDate() - (date.getDay() - 1) + 5;
        return new Date(date.setDate(lastday));
    };

    getNextOccurringSunday = date => {
        var lastday = date.getDate() - (date.getDay() - 1) + 6;
        return new Date(date.setDate(lastday));
    };

    GetCurrentDatePlus30Days = () => {
        var date = new Date();
        date.setDate(date.getDate() + 30);
        return date;
    };

    render() {
        return (
            <Form>
                <DateTimeInput
                    name="dateTime"
                    placeholder="Pick the date and time"
                    value={this.props.value}
                    iconPosition="left"
                    onChange={this.handleChange}
                    minDate={new Date()}
                    maxDate={this.GetCurrentDatePlus30Days()}
                    disableMinute
                    closable
                    popupPosition="bottom left"
                    clearable
                    disable={[
                        this.getNextOccurringSaturday(new Date()),
                        this.getNextOccurringSunday(new Date()),
                    ]}
                />
            </Form>
        );
    }
}

export default ModalExampleModal;
