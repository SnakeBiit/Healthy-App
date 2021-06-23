using Healthy.Data.Entities;

namespace Healthy.Api.Models
{
    public class AppointmentRequestDto  
	{
		public int DoctorId { get; set; }
		public int PacientId { get; set; }
		public string Status { get; set; }
		public string AppointmentDate { get; set; }
		public string Symptoms { get; set; }
        public  Prescription Prescription { get; set; }
	}
}
