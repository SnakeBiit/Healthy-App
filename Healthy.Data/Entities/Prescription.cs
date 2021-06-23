using Healthy.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Healthy.Data.Entities
{
    public class Prescription : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public ICollection<Drug> Drugs { get; set; }
        public DateTime StartDate { get; set; }
        public  string Symptom { get; set;  }
        public string Diagnostic { get; set; }
        public string Assessment { get; set; }

        public virtual PacientDoctor PacientDoctor { get; set; }

    }
}