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
    public class LibraryDataAccess : BaseDataAccess<Library>
    {
        public IEnumerable<Library> ListLibraries()
        {
            return ListAll();
        }

        public Library AddLibrary(Library newLibrary)
        {
            return Add(newLibrary);
        }

<<<<<<< HEAD
        public void DeleteLibrary(Library library)
        {
            Library Deletedlibrary = GetById(library.Id);
            Delete(Deletedlibrary);
        }

        private void ConfigContext(SGBContext context)
        {
            context.Configuration.ProxyCreationEnabled = false;
            context.Configuration.LazyLoadingEnabled = false;
        }
=======
>>>>>>> develop
    }
}
