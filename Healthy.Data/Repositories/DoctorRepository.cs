using System.Linq;
using Healthy.Data.Entities;
using Healthy.Data.Interfaces;

namespace Healthy.Data.Repositories
{
    public class DoctorRepository : GenericRepository<Doctor>, IDoctorRepository
    {
        public DoctorRepository(HealthyDbContext healthyDbContext) :base(healthyDbContext)
        {}
        
        public int GetDoctorIdByUserId(int userId)
		{
            var doctorData = database.Set<Doctor>().SingleOrDefault(dbDoctor => dbDoctor.UserId == userId);

            return doctorData.Id;
        }
    }
}
