using Healthy.Api.Interfaces;
using Healthy.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Healthy.Api.Controllers
{
    public class PrescriptionController : Controller
    {
		private readonly IPrescriptionService prescriptionService;

		[Route("api/prescription/{id}")]
		[HttpGet]
		public IActionResult GetPrescriptionById(int id)
		{
			return Ok(prescriptionService.GetPrescriptionById(id)); 
		}


        public PrescriptionController(IPrescriptionService prescriptionService)
        {
			this.prescriptionService = prescriptionService; 

        }
		[Route("api/prescription/updatePrescription")]
		[HttpPost]
		public IActionResult UpdatePrescription([FromBody] Prescription prescription)
		{

				prescriptionService.UpdatePrescription(prescription);
				return Ok(new { message = "Succes" });
		}
	}
}
