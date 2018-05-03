using DataAcccess;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public abstract class BaseBusiness<T> where T : class, IEntity
    {
        public readonly dynamic _dataAccess;

        public BaseBusiness(BaseDataAccess<T> dataAccesss)
        {
            _dataAccess = dataAccesss;
        }

        public virtual T Update(T entity)
        {
            return _dataAccess.Update(entity);
        }

        public virtual T Add(T entity)
        {
            return _dataAccess.Add(entity);
        }

        public virtual void Delete(T entity)
        {
            _dataAccess.Delete(entity);
        }

        public T GetById(int id)
        {
            return _dataAccess.GetById(id);
        }
    }
}