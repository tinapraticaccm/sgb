using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("UsersTypes")]
    public class UserType : IEntity
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
    }
}
