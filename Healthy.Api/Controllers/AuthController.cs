using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Healthy.Data.Entities;
using Healthy.Api.Helpers;
using Healthy.Api.Models;
using Healthy.Api.Interfaces;

namespace Healthy.Api.Controllers
{
    public class AuthController : Controller
	{
		private readonly IUserService userService;

		private readonly IDoctorService doctorService;
		private readonly IPatientService patientService;


		public AuthController(IUserService userService, IDoctorService doctorService, IPatientService patientService)
		{

			this.userService = userService;
			this.doctorService = doctorService;
			this.patientService = patientService;
		}
		[Route("api/authenticate/{type}")]
        [HttpPost]
		public IActionResult Authenticate([FromBody] AuthenticateRequest model , string type )
		{

			var response = userService.Authenticate(model,type);

			if (response == null)
			{
				return BadRequest(new { message = "Username or password is incorrect" });
			}
			Response.Cookies.Append("jwt", response.Token, new CookieOptions { HttpOnly = true,Secure = true, SameSite = SameSiteMode.None,   IsEssential = true, Domain = "localhost", Expires = DateTime.Now.AddDays(7) })	;
			

			return Ok(response);
		}

		[Route("api/registerPatient")] 
		[HttpPost]
		public IActionResult RegisterPatient([FromBody] Patient patient )
		{

			if (!patientService.IsNotEmpty(patient))
			{
				return BadRequest(new { message = "Username or password are empty!" }); ;
			}
			if (!patientService.IsValidPassword(patient))
			{
				return BadRequest(new { message = "Weak password!" }); ;
			}
			if (patientService.ExistUsername(patient))
			{
				return BadRequest(new { message = "Try another username!" }); ;
			}
				patientService.InsertPatient(patient);
				return Ok(patient);
		}
		[Route("api/registerDoctor")]
		[HttpPost]
		public IActionResult RegisterDoctor([FromBody] Doctor doctor)
		{
			if (!doctorService.IsNotEmpty(doctor))
			{
				return BadRequest(new { message = "Username or password are empty!" }); ;
			}
			if (!doctorService.IsValidPassword(doctor))
			{
				return BadRequest(new { message = "Weak password!" }); ;
			}
			if (doctorService.ExistUsername(doctor))
			{
				return BadRequest(new { message = "Try another username!" });
			}
				doctorService.InsertDoctor(doctor);
				return Ok(doctor);
		}

		[Authorize]
		[Route("api/user")]
		[HttpGet]
		public IActionResult GetUser()
		{
			var contextUser = HttpContext.Items["User"];
			return Ok(contextUser);
		}

		[Authorize]
		[Route("api/type")]
		[HttpGet]
		public IActionResult GetUserType()
		{
			var contextType = HttpContext.Items["Type"];
			return Ok(contextType);
		}

		[Route("api/logout")]
		[HttpPost]
		public IActionResult Logout()
		{
			Response.Cookies.Delete("jwt");

			return Ok(new { message = "success" });
		}
	}

}
