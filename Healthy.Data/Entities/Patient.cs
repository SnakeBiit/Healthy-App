using Healthy.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Healthy.Data.Entities
{
    public class Patient: IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Precondition { get; set; }
        public DateTime Birthdate { get; set; }
        public string SocialSecurityNumber { get; set; }
        public string Gender { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public virtual ICollection<PacientDoctor> PacientDoctors { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set;  }


    }
}
