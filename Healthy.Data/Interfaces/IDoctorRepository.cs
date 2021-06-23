using ConsoleApp2.Interfaces;
using Healthy.Data.Entities;

namespace Healthy.Data.Interfaces
{
    public interface IDoctorRepository : IRepository<Doctor>
	{
		public int GetDoctorIdByUserId(int userId);
	}
}
