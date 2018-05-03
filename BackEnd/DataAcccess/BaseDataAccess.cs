using Model;
using Model.DTOs;
using Model.Entities;
using Model.Utils;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAcccess
{
    public abstract class BaseDataAccess<TEntity> where TEntity : class, IEntity
    {
        protected SGBContext Context { get; set; }

        public BaseDataAccess()
        {
            Context = new SGBContext();
        }

        public TEntity Add(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Added;
            Context.SaveChanges();
            return entity;
        }

        public List<TEntity> ListAll(bool includeNestedProperties = false)
        {
            if (includeNestedProperties)
            {
                return FindAllIncludingNestedProperties();
            }
            return Context.Set<TEntity>().ToList();
        }

        public QueryLimitDTO<TEntity> ListAll(QueryLimit queryLimit, bool includeNestedProperties = false)
        {
            if (includeNestedProperties)
            {
                return new QueryLimitDTO<TEntity>(FindAllIncludingNestedProperties(queryLimit), Context.Set<TEntity>().Count());
            }
            return new QueryLimitDTO<TEntity>(Context.Set<TEntity>().ToList(), Context.Set<TEntity>().Count());
        }

        public TEntity GetById(int id)
        {
            return Context.Set<TEntity>().Find(id);
        }

        private List<TEntity> FindAllIncludingNestedProperties()
        {
            var query = Context.Set<TEntity>().AsQueryable();
            var entityType = typeof(TEntity);
            var properties = entityType.GetProperties();
            foreach (var property in properties)
            {
                if (property.GetGetMethod().IsVirtual && property.Name != "Id")
                    query = query.Include(property.Name);
            }
            return query.ToList();
        }

        private List<TEntity> FindAllIncludingNestedProperties(QueryLimit queryLimit)
        {
            var query = Context.Set<TEntity>().AsQueryable();
            var entityType = typeof(TEntity);
            var properties = entityType.GetProperties();
            foreach (var property in properties)
            {
                if (property.GetGetMethod().IsVirtual && property.Name != "Id")
                    query = query.Include(property.Name);
            }
            query = query.OrderBy(e => e.Id)
                .Skip(queryLimit.Limit * (queryLimit.Page - 1))
                .Take(queryLimit.Limit);
            return query.ToList();
        }

        public List<TEntity> ListAllIncluding(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            var query = Context.Set<TEntity>().AsQueryable();
            query = includeProperties.Aggregate(query,
                (current, property) => current.Include(property));
            return query.ToList();
        }
        public virtual TEntity Update(TEntity entity)
        {
            Context.Entry(entity).State = entity.Id == 0 ? EntityState.Added : EntityState.Modified;
            Context.SaveChanges();
            return entity;
        }

        public void Delete(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Deleted;
            Context.SaveChanges();
        }
    }
}
