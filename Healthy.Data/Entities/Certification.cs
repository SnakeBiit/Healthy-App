using Healthy.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Healthy.Data.Entities
{
    public class Certification: IEntity
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Information { get; set; }
        public virtual Doctor IdDoctor { get; set; }

        [ForeignKey("DoctorId")]
        public int DoctorId { get; set; }
    }
}