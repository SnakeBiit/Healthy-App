using Healthy.Api.Helpers;
using Healthy.Api.Interfaces;
using Healthy.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Healthy.Api.Controllers
{
    public class DoctorController : Controller
    {
        private readonly IDoctorService doctorService;
        private readonly IPrescriptionService prescriptionService;

        public DoctorController(IDoctorService doctorService, IPrescriptionService prescriptionService)
        {
            this.doctorService = doctorService;
            this.prescriptionService = prescriptionService;
        }


        [Authorize]
        [Route("api/doctor/getDoctors")]
        [HttpGet]
        public IActionResult GetDoctors()
        {
            var doctors = doctorService.GetDoctors();
            return Ok(doctors);
        }

      [Authorize]
        [Route("api/doctor/{id}")]
        [HttpGet]
        public IActionResult GetDoctor(int id)
        {
            return Ok(doctorService.GetDoctorById(id));
        }

        //TODO: move to another controller
        //? is id used? or should we remove it
        [Route("api/appointments/{id}/insertPrescription")]
        [HttpPost]
        public IActionResult InserPrescription(int id, [FromBody] Prescription prescription)
        {
                prescriptionService.InsertPrescription(prescription);
                return Ok(prescription);
        }

        [Authorize]
        [Route("api/appointments/{doctorId}")]
        [HttpGet]
        public IActionResult GetAppointments(int doctorId)
        {
            var appointments = doctorService.GetAppointments(doctorId);

            return Ok(appointments);
        }

        [Route("api/doctor/updateDoctor")]
        [HttpPut]
        public IActionResult UpdatePatient([FromBody] Doctor doctor)
        {
                doctorService.UpdateDoctor(doctor);
                return Ok(new { message = "Succes" });
        }

        [Authorize]
        [Route("api/appointments/confirmed/{id}")]
        [HttpGet]
        public IActionResult ChangeAppointmentStatusToConfirmed(int id)
		{
            doctorService.ChangeAppointmentStatusToConfirmed(id);

            return Ok(new { message = "Success" });
		}

        [Authorize]
        [Route("api/appointments/rejected/{id}")]
        [HttpGet]
        public IActionResult ChangeAppointmentStatusToRejected(int id)
        {
            doctorService.ChangeAppointmentStatusToRejected(id);

            return Ok(new { message = "Success" });
        }

    }
}

