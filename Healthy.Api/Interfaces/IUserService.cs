using Healthy.Api.Models;
using Healthy.Data.Entities;
using System.Collections.Generic;

namespace Healthy.Api.Interfaces
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model, string type);
        IEnumerable<User> GetAll();
        User GetById(int id);
    }
}
