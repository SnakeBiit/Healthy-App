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
	public class DoctorService : IDoctorService
	{
		private readonly IDoctorRepository doctorRepository;
        private readonly IUserRepository userRepository;
        private readonly IRepository<PacientDoctor> patientDoctorRepository;
        private readonly IRepository<Patient> patientRepository;


        public DoctorService(IDoctorRepository doctorRepository, IUserRepository userRepository,
            IRepository<PacientDoctor> patientDoctorRepository, IRepository<Patient> patientRepository, HealthyDbContext _context)
		{
			this.doctorRepository = doctorRepository;
			this.userRepository = userRepository;
			this.patientDoctorRepository = patientDoctorRepository;
			this.patientRepository = patientRepository;

        }

		public void ChangeAppointmentStatusToConfirmed(int id)
		{
			var appointment = patientDoctorRepository.GetById(id);

			appointment.Status = "confirmed";

			patientDoctorRepository.Update(appointment);
		}

		public void ChangeAppointmentStatusToRejected(int id)
		{
			var appointment = patientDoctorRepository.GetById(id);

			appointment.Status = "rejected";

			patientDoctorRepository.Update(appointment);
		}

		public IEnumerable<AppointmentResponseDto> GetAppointments(int userId)
		{
            if (userId != 0)
            {
                var doctorId = doctorRepository.GetDoctorIdByUserId(userId);

                var allAppointments = patientDoctorRepository.GetByAll();

                var filteredAppointments = new List<AppointmentResponseDto>();

                foreach (var a in allAppointments)
                {
                    if (a.DoctorId == doctorId)
                    {
                        var patientData = patientRepository.GetById(a.PacientId);

                        AppointmentResponseDto appointmentResponse;
                        appointmentResponse = new AppointmentResponseDto()
                        {
                            Id = a.Id,
                            FirstName = patientData.FirstName,
                            LastName = patientData.LastName,
                            Address = patientData.Address,
                            AppointmentDate = a.AppointmentDate,
                            Status = a.Status,
                            Symptoms = a.Symptoms,
                            DoctorId = a.DoctorId,
                            PacientId = a.PacientId,
                            PrescriptionId = a.PrescriptionId
                        };


                        filteredAppointments.Add(appointmentResponse);
                    }
                }

                return filteredAppointments;
            }
            return null; 
		}

		public void InsertDoctor(Doctor doctor)
		{
			string passwordHash = BCrypt.Net.BCrypt.HashPassword(doctor.User.Password);
            try
            {
				doctorRepository.Insert(new Doctor()
				{
					Id = doctor.Id,
					User = new User() { Password = passwordHash, UserName = doctor.User.UserName },
					Address = doctor.Address,
					Birthdate = doctor.Birthdate,
					City = doctor.City,
					Country = doctor.Country,
					Gender = doctor.Gender,
					FirstName = doctor.FirstName,
					LastName = doctor.LastName,
					Field = doctor.Field,
					SocialSecurityNumber = doctor.SocialSecurityNumber,
					Certifications = doctor.Certifications
				});
			}
			catch(Exception)
            {
				throw;
			}
			
		}
		public IEnumerable<Doctor> GetDoctors()
		{
			var doctors = doctorRepository.GetByAll();
			return doctors;
		}

		public Doctor GetDoctorById(int id)
		{
			var doctors = doctorRepository.GetByAll();

			foreach (var p in doctors)
			{
				if (p.UserId == id)
				{
					return p;
				}
			}

			return null;
			//return doctorRepository.GetById(id);
		}
		public bool IsValidPassword(Doctor doctor)
		{
			var regex = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*[#^\s-])[A-Za-z\d@$!%*?&#^].{8,30}$";
			var mc = Regex.Match(doctor.User.Password, regex, RegexOptions.IgnoreCase);
			if (!mc.Success) return false;
			return true;

		}

		public void UpdateDoctor(Doctor doctor)
		{
            try
            {
				doctorRepository.Update(doctor);
			}
			catch (Exception)
            {
				throw;
            }
		}

		public bool IsNotEmpty(Doctor doctor)
		{
            if (doctor == null) return false;
			if (doctor.User.UserName == "" && doctor.User.Password == "")
			{
				return false;
			}
			return true;
		}
		public bool ExistUsername(Doctor doctor)
		{
			return userRepository.ExistsUserName(doctor.User);
		}


	}
}
