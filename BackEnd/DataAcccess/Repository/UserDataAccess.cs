using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcccess.Repository
{
    public class UserDataAccess
    {

        public IEnumerable<User> GetUsers()
        {
            
            using (var context = new SGBContext())
            {
                
                try
                {
                    ConfigContext(context);
                    IEnumerable<User> usuarios;
                    usuarios = context.User.ToList();
                    return usuarios;
                }
                catch (SqlException)
                {
                    IEnumerable<User> usuarios = new List<User>();
                    return usuarios;
                }
            }
        }
        
        private void ConfigContext(SGBContext context)
        {
            context.Configuration.ProxyCreationEnabled = false;
            context.Configuration.LazyLoadingEnabled = false;
        }
    }
}
