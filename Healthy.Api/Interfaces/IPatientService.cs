using Healthy.Api.Models;
using Healthy.Data.Entities;
using System.Collections.Generic;

namespace Healthy.Api.Interfaces
{
    public interface IPatientService
	{
		void InsertPatient(Patient patient);
		bool IsValidPassword(Patient patient);
		bool IsNotEmpty(Patient patient);
		bool ExistUsername(Patient patient);
		public void UpdatePatient(Patient patient);
		public Patient GetPatientById(int id);
		public void InsertPatientDoctor(AppointmentRequestDto appointmentRequest);
		public IEnumerable<Patient> GetPatients();
	}
}
