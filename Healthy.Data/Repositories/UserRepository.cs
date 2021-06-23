using Healthy.Data.Entities;
using Healthy.Data.Interfaces;
using System;
using System.Linq;

namespace Healthy.Data.Repositories
{
    public class UserRepository: GenericRepository<User> , IUserRepository
    {
        public UserRepository(HealthyDbContext healthyDbContext):base(healthyDbContext)
        {}

        public bool ExistsUserName(User user)
        {
            try
            {
                var result = database.Set<User>().SingleOrDefault(dbUser => dbUser.UserName == user.UserName);
                if (result == null)
                {
                    return false;
                }
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return true;
        }
    }
}
