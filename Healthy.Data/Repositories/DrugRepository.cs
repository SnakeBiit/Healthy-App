using Healthy.Data.Entities;

namespace Healthy.Data.Repositories
{
    public class DrugRepository: GenericRepository<Drug>
    {
        public DrugRepository(HealthyDbContext healthyDbContext) : base(healthyDbContext)
        { }
    }

  
}
