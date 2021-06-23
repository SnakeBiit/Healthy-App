using Healthy.Data.Entities;

namespace Healthy.Data.Repositories
{
    public class PatientRepository: GenericRepository<Patient>
    {
        public PatientRepository(HealthyDbContext healthyDbContext) :base(healthyDbContext)
        {}
    }
}
