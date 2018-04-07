using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcccess
{
    public abstract class BaseDataAccess<TEntity> where TEntity : class
    {
        public List<TEntity> ListAll()
        {
            using(var context = new SGBContext())
            {
                return context.Set<TEntity>().ToList();
            }
        }

        public TEntity FindById(int id)
        {
            using(var context = new SGBContext())
            {
                return context.Set<TEntity>().Find(id);
            }
        }

        public TEntity Update(TEntity entity)
        {
            using(var context = new SGBContext())
            {
                var actualEntity = context.Set<TEntity>().Find(entity);

                if (actualEntity != null)
                {
                    context.Entry(entity).State = EntityState.Modified;
                }
                else
                {
                    context.Entry(entity).State = EntityState.Added;
                }
                context.SaveChanges();
                return entity;
            }
        }

        public void Delete(TEntity entity)
        {
            using(var context = new SGBContext())
            {
                context.Entry(entity).State = EntityState.Deleted;
            }
        }

        public TEntity Add(TEntity entity)
        {
            using(var context = new SGBContext())
            {
                context.Entry(entity).State = EntityState.Added;
                context.SaveChanges();
                return entity;
            }
        }
    }
}
