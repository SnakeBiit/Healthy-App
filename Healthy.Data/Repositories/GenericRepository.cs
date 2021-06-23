using ConsoleApp2.Interfaces;
using Healthy.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Healthy.Data.Repositories
{
    public abstract class GenericRepository<TEntity> : IRepository<TEntity>
        where TEntity : class, IEntity
    {
        protected readonly DbContext database;

        public GenericRepository(HealthyDbContext healthyDbContext)
        {
            database = healthyDbContext;
            database.Database.EnsureCreated();
            database.Database.Migrate();
        }

        public void Delete(TEntity entity)
        {
            database.Set<TEntity>().Remove(entity);
            database.SaveChanges();
        }

      

        public IEnumerable<TEntity> GetByAll()
        {
            return database.Set<TEntity>().AsEnumerable();
        }

        public TEntity GetById(int id)
        {
            return database.Set<TEntity>().Find(id);
        }

        public void Insert(TEntity entity)
        {
            database.Set<TEntity>().Add(entity);
            database.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            database.Set<TEntity>().Update(entity);
            database.SaveChanges();
        }
    }
}
