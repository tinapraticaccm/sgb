﻿using Model;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcccess.Repository
{
    public class UserDataAccess : BaseDataAccess<User>
    {

        public IEnumerable<User> ListUsers()
        {
            return ListAll();
        }

        public User AddUser(User newUser)
        {
            return Add(newUser);
        }

        private void ConfigContext(SGBContext context)
        {
            context.Configuration.ProxyCreationEnabled = false;
            context.Configuration.LazyLoadingEnabled = false;
        }
    }
}
