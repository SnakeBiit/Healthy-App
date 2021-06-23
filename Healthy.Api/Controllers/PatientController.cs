using Healthy.Api.Helpers;
using Healthy.Api.Interfaces;
using Healthy.Api.Models;
using Healthy.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Healthy.Api.Controllers
{

    public class PatientController : Controller
	{
	
		private IDoctorService doctorService ;
		private IPatientService patientService ;

        public PatientController(IDoctorService doctorService, IPatientService patientService)
        { 
            this.doctorService = doctorService;
            this.patientService = patientService;
        }


		[Authorize]
		[Route("api/doctor/getPatients")]
		[HttpGet]
		public IActionResult GetPatients()
		{
			var patients = patientService.GetPatients();
			return Ok(patients);
		}

		[Route("api/patient/getDoctors")]
		[HttpGet]
		public IActionResult GetDoctors()
		{
				var doctors = doctorService.GetDoctors();
				return Ok(doctors);
		}
		[Route("api/patient/updatePatient")]
		[HttpPut]
		public IActionResult UpdatePatient([FromBody] Patient pacient)
		{
				patientService.UpdatePatient(pacient);
				return Ok(new { message = "Succes" });
		}

		[Route("api/patient/{id}")]
		[HttpGet]
		public IActionResult GetPatient(int id)
		{
				return Ok(patientService.GetPatientById(id));
		}

		[Authorize]
		[Route("api/scheduleAppointment")]
		[HttpPost]
		public IActionResult ScheduleAppointment([FromBody] AppointmentRequestDto appointmentRequest)
		{
			if (appointmentRequest.Status != "pending")
			{
				return BadRequest();
			}

				patientService.InsertPatientDoctor(appointmentRequest);

				return Ok(new { message = "Success " });		
		}

	}
}