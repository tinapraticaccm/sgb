using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class SGBContext : DbContext
    {
        public SGBContext() : base("SGBContext")
        {
            this.Configuration.LazyLoadingEnabled = true;
            this.Configuration.ProxyCreationEnabled = true;
        }

        public DbSet<User> User { get; set; }
        public DbSet<Library> Library { get; set; }
        public DbSet<UserType> UserType { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // configures one-to-many relationship
            modelBuilder.Entity<User>()
                .HasRequired<UserType>(u => u.UserType)
                .WithMany()
                .HasForeignKey(u => u.IdUserType);
        }
    }
}

