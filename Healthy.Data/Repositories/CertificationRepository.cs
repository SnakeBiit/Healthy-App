using Healthy.Data.Entities;

namespace Healthy.Data.Repositories
{
    public class CertificationRepository: GenericRepository<Certification>
    {
        public CertificationRepository(HealthyDbContext healthyDbContext) :base(healthyDbContext)
        {}
    }
}
