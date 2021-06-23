using Healthy.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Healthy.Api.Controllers
{
    public class DrugsController : Controller
    {
        private readonly IDrugsService drugsService;
        public DrugsController(IDrugsService drugsService)
        {
            this.drugsService = drugsService; 

        }

        [Route("api/drugs/{prescriptionId}")]
        [HttpGet]
        public IActionResult GetDrugsByPrescription(int prescriptionId)
        {

            var drugs = drugsService.GetDrugsByPrescriptionId(prescriptionId); 
            return Ok(drugs);
        }

    }
}
