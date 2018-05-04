using DataAcccess.Repository;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Entities
{
    public class LibraryBusiness : BaseBusiness<Library>
    {
        public LibraryBusiness() : base(new LibraryDataAccess()) { }

        public List<Library> ListLibraries()
        {
            return _dataAccess.ListLibraries(true);
        }

    }
}
