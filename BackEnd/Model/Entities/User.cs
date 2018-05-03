using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("Users")]
    public class User : IEntity
    {
        public int Id { get; set; }

        [ForeignKey("UserType")]
        public int IdUserType { get; set; }
        public string CodCPF { get; set; }
        public string Email { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Contato { get; set; }

        public virtual UserType UserType { get; set; }
    }
}
