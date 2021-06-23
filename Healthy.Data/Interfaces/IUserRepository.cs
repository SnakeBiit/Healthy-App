using ConsoleApp2.Interfaces;
using Healthy.Data.Entities;

namespace Healthy.Data.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        bool ExistsUserName(User user);
    }
}
