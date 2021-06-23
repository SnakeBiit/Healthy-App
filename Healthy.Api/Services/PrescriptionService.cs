using ConsoleApp2.Interfaces;
using Healthy.Api.Interfaces;
using Healthy.Data;
using Healthy.Data.Entities;
using System;
using System.Collections.Generic;

namespace Healthy.Api.Services
{
	public class PrescriptionService: IPrescriptionService
    {
		private readonly IRepository<Prescription> prescriptionRepository;
	

		public PrescriptionService(IRepository<Prescription> prescriptionRepository)
        {
            this.prescriptionRepository = prescriptionRepository;
        }

		public void InsertPrescription(Prescription prescription)
		{
            try
            {
				prescriptionRepository.Insert(new Prescription()
				{
					Id = prescription.Id,
					Drugs = prescription.Drugs,
					StartDate = prescription.StartDate


				});
			}
            catch (Exception)
            {
				throw;
            }
		}

		public IEnumerable<Prescription> GetPrescriptions()
		{
			var prescriptions = prescriptionRepository.GetByAll();
			return prescriptions;
		}
		public Prescription GetPrescriptionById(int id)
		{
			return prescriptionRepository.GetById(id);
		}
		public void UpdatePrescription(Prescription prescription)
		{
            
                prescription.StartDate = DateTime.Now;
				prescriptionRepository.Update(prescription);
			
		}


    }
}
