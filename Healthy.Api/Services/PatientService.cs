using ConsoleApp2.Interfaces;
using Healthy.Api.Interfaces;
using Healthy.Api.Models;
using Healthy.Data;
using Healthy.Data.Entities;
using Healthy.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Healthy.Api.Services
{
	public class PatientService : IPatientService
	{
		readonly HealthyDbContext _context;
		private IRepository<Patient> patientRepository;
		private IRepository<PacientDoctor> patientDoctorRepository;
		private IUserRepository userRepository;

        public PatientService(IRepository<Patient> patientRepository, IUserRepository userRepository, IRepository<PacientDoctor> patientDoctorRepository, HealthyDbContext healthyDbContext)
        {
            this.patientRepository = patientRepository;
            this.userRepository = userRepository;
			this.patientDoctorRepository = patientDoctorRepository;
			_context = healthyDbContext;
		}

		public void InsertPatientDoctor(AppointmentRequestDto appointmentRequest)
		{
			try
			{
				this.patientDoctorRepository.Insert(new PacientDoctor() {
                    DoctorId = appointmentRequest.DoctorId, PacientId = appointmentRequest.PacientId, Status = appointmentRequest.Status, AppointmentDate = appointmentRequest.AppointmentDate, Symptoms = appointmentRequest.Symptoms,
                    Prescription = appointmentRequest.Prescription });
			}
			catch (Exception)
			{
				throw;
			}
			
		}

        public void InsertPatient(Patient patient)
		{
			string passwordHash = BCrypt.Net.BCrypt.HashPassword(patient.User.Password);
			patient.User.Password = passwordHash;

			try
			{
				patientRepository.Insert(patient);
			}
			catch (Exception)
            {
				throw;
            }

		}

		public void UpdatePatient(Patient patient)
		{
           
				patientRepository.Update(patient);
			
		}
			
		public Patient GetPatientById(int id)
        {
			var user = userRepository.GetById(id);

			var patients = patientRepository.GetByAll();

			foreach (var p in patients)
			{
				if (p.UserId == id)
				{
					return p;
				}
			}

			return null;

			//return patientRepository.GetById(id);
		}

		public bool IsValidPassword(Patient patient)
		{
			var regex = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*[#^\s-])[A-Za-z\d@$!%*?&#^].{8,30}$";
			var mc = Regex.Match(patient.User.Password, regex, RegexOptions.IgnoreCase);
			if (!mc.Success)
			{
				return false;
			}
			return true;
		}

		public bool IsNotEmpty(Patient patient)
		{
            if (patient == null) return false;
			if (patient.User.UserName == "" && patient.User.Password == "") { return false; }
			return true;
		}

		public bool ExistUsername(Patient patient)
		{
			if (!userRepository.ExistsUserName(patient.User)) { return false; }
			return true;
		}

        public IEnumerable<Patient> GetPatients()
        {
			var patients = patientRepository.GetByAll();
			return patients;
		}
    }
	
}
