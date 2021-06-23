using Healthy.Data.Entities;
using System.Collections.Generic;

namespace Healthy.Api.Interfaces
{
    public interface IPrescriptionService
	{
		void InsertPrescription(Prescription prescription);
		public IEnumerable<Prescription> GetPrescriptions();
		public Prescription GetPrescriptionById(int id);
		public void UpdatePrescription(Prescription prescription);

	}
}
