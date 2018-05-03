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
    public class UserController : ApiController
    {
        UserDataAccess UserRepository = new UserDataAccess();
        UserBusiness UserBusiness = new UserBusiness();

        public IHttpActionResult Get()
        {
            var usuarios = UserBusiness.ListUsers();
            return Ok(usuarios);
        }

        [HttpPost]
        [Route("api/user/getUsers")]
        public IHttpActionResult Get(QueryLimit queryLimit)
        {
            //var usuarios = UserBusiness.ListUsers();
            var usuarios = UserRepository.ListAll(queryLimit, true);
            return Ok(usuarios);
        }

        public IHttpActionResult Get(int id)
        {
            var usuario = UserBusiness.GetById(id);
            return Ok(usuario);
        }

        [HttpPost]
        public IHttpActionResult Add(User newUser)
        {
            var user = UserBusiness.Add(newUser);
            return Ok(user);
        }

        [HttpPut]
        public IHttpActionResult Update(User user)
        {
            UserBusiness.Update(user);
            return Ok(User);
        }

        [HttpPost]
        [Route("api/user/delete")]
        public IHttpActionResult Delete(User user)
        {
            UserBusiness.Delete(user);
            return Ok();
        }
    }
}
