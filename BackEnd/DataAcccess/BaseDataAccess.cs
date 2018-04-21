using Model;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcccess
{
    public abstract class BaseDataAccess<TEntity> where TEntity : class, IEntity
    {
        public List<TEntity> ListAll()
        {
            using(var context = new SGBContext())
            {
                return context.Set<TEntity>().ToList();
            }
        }

        public TEntity GetById(int id)
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
                context.Entry(entity).State = entity.Id == 0 ?
                                   EntityState.Added :
                                   EntityState.Modified;
                context.SaveChanges();
                return entity;
            }
        }

        public void Delete(TEntity entity)
        {
            using(var context = new SGBContext())
            {
                context.Entry(entity).State = EntityState.Deleted;
                context.SaveChanges();
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
