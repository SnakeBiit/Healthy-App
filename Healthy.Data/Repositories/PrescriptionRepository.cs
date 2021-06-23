using Healthy.Data.Entities;

namespace Healthy.Data.Repositories
{
    public class PrescriptionRepository : GenericRepository<Prescription>
    {
        public PrescriptionRepository(HealthyDbContext healthyDbContext) : base(healthyDbContext)
        { }
    }

}

