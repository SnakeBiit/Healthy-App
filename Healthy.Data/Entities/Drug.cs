using Healthy.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Healthy.Data.Entities
{
    public class Drug : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string AdditionalInfo { get; set; }
        public int Length { get; set; }
        public int Frequency { get; set; }
        public bool IsChecked { get; set; }

        public virtual Prescription IdPrescription { get; set; }

        [ForeignKey("PrescriptionId")]
        public int PrescriptionId { get; set; }
    }
}
