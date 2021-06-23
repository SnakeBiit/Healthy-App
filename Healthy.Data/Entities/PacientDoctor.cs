using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Healthy.Data.Interfaces;

namespace Healthy.Data.Entities
{
    public class PacientDoctor : IEntity
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [ForeignKey("PacientId")]

        public int PacientId { get; set; }
        public Patient Pacient { get; set; }

        [ForeignKey("DoctorId")]
        public int DoctorId { get; set; }
        public Doctor Doctor{ get; set; }

        public string AppointmentDate { get; set; }
        [ForeignKey("PrescriptionId")]
        public int PrescriptionId { get; set; }

        public  Prescription Prescription { get; set; }
        public string Status { get; set; }
        public string Symptoms { get; set; }


    }
}
