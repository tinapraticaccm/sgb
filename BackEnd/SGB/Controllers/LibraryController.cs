using Business.Entities;
using DataAcccess.Repository;
using Model.Entities;
using Model.Utils;
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
        LibraryBusiness libraryBusiness = new LibraryBusiness();
        
        public IHttpActionResult Get()
        {
            return Ok(libraryRepository.ListLibraries() );
        }

        public IHttpActionResult Get(int Id)
        {
            return Ok(libraryRepository.GetById(Id));
        }

        [HttpPost]
        [Route("api/library/getLibraries")]
        public IHttpActionResult Get(QueryLimit queryLimit)
        {
            var libraries = libraryRepository.ListAll(queryLimit, true);
            return Ok(libraries);
        }

        [HttpPost]
        public IHttpActionResult Add(Library newLibrary)
        {
            return Ok(libraryBusiness.Add(newLibrary) );
        }

        [HttpPut]
        public IHttpActionResult Update(Library library)
        {
            libraryBusiness.Update(library);
            return Ok(library);
        }

        [HttpPost]
        [Route("api/library/delete")]
        public IHttpActionResult Delete(Library library)
        {
            libraryBusiness.Delete(library);
            return Ok();
        }
    }
}
