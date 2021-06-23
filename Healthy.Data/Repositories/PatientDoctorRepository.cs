using Healthy.Data.Entities;

namespace Healthy.Data.Repositories
{
    public class PatientDoctorRepository : GenericRepository<PacientDoctor>
	{
		public PatientDoctorRepository(HealthyDbContext healthyDbContext) : base(healthyDbContext)
		{ }

    }
}
