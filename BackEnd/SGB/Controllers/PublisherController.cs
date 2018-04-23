using DataAcccess.Repository;
using Model.Entities;
using System.Web.Http;


namespace SGB.Controllers
{
    public class PublisherController : ApiController
    {
        PublisherDataAccess publisherRepository = new PublisherDataAccess();

        public IHttpActionResult Get()
        {
            return Ok(publisherRepository.ListPublishers());
        }

        public IHttpActionResult Get(int Id)
        {
            return Ok(publisherRepository.GetById(Id));
        }

        [HttpPost]
        public IHttpActionResult Add(Publisher newPublisher)
        {
            return Ok(publisherRepository.AddPublisher(newPublisher));
        }

        [HttpPut]
        public IHttpActionResult Update(Publisher publisher)
        {
            publisherRepository.Update(publisher);
            return Ok(publisher);
        }

        [HttpDelete]
        public IHttpActionResult Delete(Publisher publisher)
        {
            publisherRepository.Delete(publisher);
            return Ok(publisher);
        }
    }
}