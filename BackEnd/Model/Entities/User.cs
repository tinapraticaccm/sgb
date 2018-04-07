using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("Users")]
    public class User
    {
        public int Id { get; set; }
        public int IdUserType { get; set; }
        public string CodCPF { get; set; }
        public string Email { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Contato { get; set; }

        public User()
        {

        }

        public User(int id, int idUserType, string cpf, string email, string nome, string sobrenome, string contato)
        {
            this.Id = id;
            this.IdUserType = idUserType;
            this.CodCPF = cpf;
            this.Email = email;
            this.Nome = nome;
            this.Sobrenome = sobrenome;
            this.Contato = contato;
        }
    }
}
