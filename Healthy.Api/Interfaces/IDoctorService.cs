using Healthy.Api.Models;
using Healthy.Data.Entities;
using System.Collections.Generic;

namespace Healthy.Api.Interfaces
{
    public interface IDoctorService
	{
		void InsertDoctor(Doctor doctor);
		bool IsValidPassword(Doctor doctor);
		bool IsNotEmpty(Doctor doctor);
		bool ExistUsername(Doctor doctor);
		public IEnumerable<Doctor> GetDoctors();
		public Doctor GetDoctorById(int id);
		public void UpdateDoctor(Doctor doctor);
		public IEnumerable<AppointmentResponseDto> GetAppointments(int doctorId);
		public void ChangeAppointmentStatusToConfirmed(int id);
		public void ChangeAppointmentStatusToRejected(int id);
	}
}
