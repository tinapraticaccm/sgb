using DataAcccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SGB.Controllers
{
    public class UserTypeController : ApiController
    {
        UserTypeDataAccess userTypeRepository = new UserTypeDataAccess();
    }
}