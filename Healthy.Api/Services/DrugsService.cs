using ConsoleApp2.Interfaces;
using Healthy.Api.Interfaces;
using Healthy.Data.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Healthy.Api.Services
{
    public class DrugsService : IDrugsService
    {
        private readonly IRepository<Drug> drugsRepository;
        public DrugsService(IRepository<Drug> drugRepository)
        {
            this.drugsRepository = drugRepository; 
                
        }

        public Drug GetDrugById(int id)
        {
            return drugsRepository.GetById(id); 

        }

        public List<Drug> GetDrugsByPrescriptionId(int id)
        {
            List<Drug> result = new List<Drug>(); 
            foreach (var drug in drugsRepository.GetByAll())
            {
                if(drug.PrescriptionId == id)
                {
                    result.Add(drug); 
                }

            }
            return result; 

        }
    }
}
