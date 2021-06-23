using Healthy.Data.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Healthy.Data.Entities
{
    public class User: IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

    }
}
