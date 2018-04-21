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
    public class LibraryController : ApiController
    {
        LibraryDataAccess libraryRepository = new LibraryDataAccess();
        
        public IHttpActionResult Get()
        {
            return Ok(libraryRepository.ListLibraries() );
        }

        public IHttpActionResult Get(int Id)
        {
            return Ok(libraryRepository.GetById(Id));
        }

        [HttpPost]
        public IHttpActionResult Add(Library newLibrary)
        {
            return Ok(libraryRepository.AddLibrary(newLibrary) );
        }

        [HttpPut]
        public IHttpActionResult Update(Library library)
        {
            libraryRepository.Update(library);
            return Ok(library);
        }

        [HttpDelete]
        public IHttpActionResult Delete(Library library)
        {

            libraryRepository.Delete(library);
            return Ok(library);
        }
    }
}
