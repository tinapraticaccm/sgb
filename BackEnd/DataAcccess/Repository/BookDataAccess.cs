using Model;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcccess.Repository
{
    public class BookDataAccess : BaseDataAccess<Book>
    {
        public IEnumerable<Book> ListBooks()
        {
            return ListAll();
        }

        public Book AddBook(Book newBook)
        {
            return Add(newBook);
        }
    }
}
