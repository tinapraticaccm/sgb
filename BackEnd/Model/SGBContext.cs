using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class SGBContext : DbContext
    {
        public SGBContext() : base("SGBContext")
        {

        }
        public DbSet<User> User { get; set; }
    }
}
