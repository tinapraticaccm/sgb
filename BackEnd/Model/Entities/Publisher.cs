using System.ComponentModel.DataAnnotations.Schema;


namespace Model.Entities
{
    [Table("Publishers")]
    public class Publisher : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CNPJ { get; set; }
        public string Salesman { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }


        public Publisher()
        {

        }


        public Publisher(string Name, string CNPJ, string Salesman=null, string Phone=null, string Email=null)
        {
            this.Name = Name;
            this.CNPJ = CNPJ;
            this.Salesman = Salesman;
            this.Phone = Phone;
            this.Email = Email;
        }
    }
}