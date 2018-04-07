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
    public class UserController : ApiController
    {
        User usuario = new User(1, 1, "13237796638", "alan.w.l@hotmail.com", "Alan", "Oliveira", "991611642");

        public IHttpActionResult Get()
        {
            if(usuario != null)
            {
                UserDataAccess userRepository = new UserDataAccess();
                var usuarios = userRepository.GetUsers();
                return Ok(usuarios);
            }
            return Ok("quase....");
        }
    }
}
