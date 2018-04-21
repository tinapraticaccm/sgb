using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("Libraries")]
    public class Library : IEntity
    {
        public int Id { get; set; }
        public string Location{get; set;}
        public string Name { get; set; }
        public string Description { get; set; }

        public Library()
        {

        }


        public Library(string Location, string Name, string Description)
        {
            this.Location = Location;
            this.Name = Name;
            this.Description = Description;
        }
    }
}
