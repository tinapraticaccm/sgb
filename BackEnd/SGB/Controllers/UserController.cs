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
        User usuario = new User(1, "13237796638", "alan.w.l@hotmail.com", "Alan", "Oliveira", "991611642");

        UserDataAccess userRepository = new UserDataAccess();

        public IHttpActionResult Get()
        {
            if(usuario != null)
            {
                var usuarios = userRepository.ListUsers();
                return Ok(usuarios);
            }
            return Ok("quase....");
        }

        public IHttpActionResult Get(int id)
        {
            var usuario = userRepository.GetById(id);
            return Ok(usuario);
        }

        [HttpPost]
        public IHttpActionResult Add(User newUser)
        {
            var user = userRepository.Add(newUser);
            return Ok(user);
        }

        [HttpPut]
        public IHttpActionResult Update(User user)
        {
            userRepository.Update(user);
            return Ok(User);
        }

        [HttpDelete]
        public IHttpActionResult Delete(User user)
        {
            userRepository.Delete(user);
            return Ok();
        }
    }
}
