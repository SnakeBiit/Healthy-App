import axios from "axios";

export async function getWeatherForecast() {
    try {
        const response = await axios.get(
            "https://localhost:5001/weatherForecast",
        );
        console.log(response);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export async function getUser() {
    try {
        const response = await axios.get("https://localhost:5001/api/user", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export async function getType() {
    try {
        const response = await axios.get("https://localhost:5001/api/type", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getDoctors() {
    try {
        const response = await axios.get(
            "https://localhost:5001/api/doctor/getDoctors",
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPatients() {
    try {
        const response = await axios.get(
            "https://localhost:5001/api/patient/getPatients",
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPatient(id) {
    try {
        const response = await axios.get(
            `https://localhost:5001/api/patient/${id}`,
            {
                withCredentials: true,
            },
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getDoctor(id) {
    try {
        const response = await axios.get(
            `https://localhost:5001/api/doctor/${id}`,
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    axios.post("https://localhost:5001/api/logout").then(function (response) {
        document.cookie =
            "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        sessionStorage.removeItem("jwt");
    });
}

export async function scheduleAppointment(
    doctorId,
    patientId,
    dateTime,
    simptoms,
) {
    try {
        const response = await axios.post(
            "https://localhost:5001/api/scheduleAppointment",
            {
                doctorId: doctorId,
                pacientId: patientId,
                status: "pending",
                appointmentDate: dateTime,
                symptoms: simptoms,
                prescription : { 
                }

            },
            { withCredentials: true },
        );

        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function getPrescription(id) {
    try {
        const response = await axios.get(
            `https://localhost:5001/api/prescription/${id}`,
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export async function postPrescription(id, drugs, startDate) {
    try {
        console.log(id , drugs,startDate )
        const response = await axios.post(
            `https://localhost:5001/api/prescription/updatePrescription`,
            {
                id: id,
                drugs: drugs,
                startDate: startDate,
            },
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getAppointments(doctorId) {
    try {
        const response = await axios.get(
            `https://localhost:5001/api/appointments/${doctorId}`,
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function changeStatusToConfirmed(id) {
    try {
        const response = await axios.get(
            `https://localhost:5001/api/appointments/confirmed/${id}`,
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function changeStatusToRejected(id) {
    try {
        const response = await axios.get(
            `https://localhost:5001/api/appointments/rejected/${id}`,
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function postTreatment(
    id,
    treatment,
    assessment,
    diagnostic,
    symptoms,
    
) {
  
    try {
        const response = await axios.post(
            `https://localhost:5001/api/prescription/updatePrescription`,
            {
                id: id,
                drugs: treatment,
                assessment : assessment,
                diagnostic: diagnostic,
                symptom: symptoms
              
            },
            { withCredentials: true },
        );

        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function getDrugsByPrescriptionId(prescriptionId) {
    try {
        const response = await axios.get(
            `https://localhost:5001/api/drugs/${prescriptionId}`,
        );
        console.log("Asta se apeleaza? ");

        console.log(response);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

