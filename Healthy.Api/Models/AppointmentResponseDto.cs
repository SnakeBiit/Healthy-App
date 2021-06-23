namespace Healthy.Api.Models
{
    public class AppointmentResponseDto
	{
		public int Id { get; set; }
		public int DoctorId { get; set; }
		public int PacientId { get; set; }
		public string Status { get; set; }
		public string AppointmentDate { get; set; }
		public string Symptoms { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Address { get; set; }
        public int PrescriptionId { get; set; }
	}
}
