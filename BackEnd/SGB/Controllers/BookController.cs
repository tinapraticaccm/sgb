using DataAcccess.Repository;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SGB.Controllers
{
    public class BookController : ApiController
    {
        BookDataAccess bookRepository = new BookDataAccess();

        public IHttpActionResult Get()
        {
            return Ok(bookRepository.ListBooks());
        }

        public IHttpActionResult Get(int Id)
        {
            return Ok(bookRepository.GetById(Id));
        }

        [HttpPost]
        public IHttpActionResult Add(Book newBook)
        {
            return Ok(bookRepository.AddBook(newBook));
        }

        [HttpPut]
        public IHttpActionResult Update(Book book)
        {
            bookRepository.Update(book);
            return Ok(book);
        }

        [HttpDelete]
        public IHttpActionResult Delete(Book book)
        {

            bookRepository.Delete(book);
            return Ok(book);
        }
    }
}
