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
    [Table("Books")]
    public class Book : IEntity
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Autor { get; set; }
        public string Editora { get; set; }
        public int Edicao { get; set; }

        public Book()
        {

        }


        public Book(string Titulo, string Autor, string Editora, int Edicao)
        {
            this.Titulo = Titulo;
            this.Autor = Autor;
            this.Editora = Editora;
            this.Edicao = Edicao;
        }
    }
}
