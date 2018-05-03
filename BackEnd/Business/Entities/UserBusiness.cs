using DataAcccess.Repository;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Entities
{
    public class UserBusiness : BaseBusiness<User>
    {
        public UserBusiness() : base(new UserDataAccess()) { }

        public List<User> ListUsers()
        {
            return _dataAccess.ListUsers(true);
        }
    }
}
