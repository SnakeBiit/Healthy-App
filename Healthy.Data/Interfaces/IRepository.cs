using Healthy.Data.Interfaces;
using System.Collections.Generic;

namespace ConsoleApp2.Interfaces
{
    public interface IRepository<TEntity> where TEntity : IEntity
    {
      
        TEntity GetById(int id);

        IEnumerable<TEntity> GetByAll();

        void Insert(TEntity entity);

        void Update(TEntity entity);

        void Delete(TEntity entity);
    }
}
