using Healthy.Data.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Healthy.Api.Interfaces
{
    public interface IDrugsService
    {
        public Drug GetDrugById(int id);
        public List<Drug> GetDrugsByPrescriptionId(int id);



    }
}
