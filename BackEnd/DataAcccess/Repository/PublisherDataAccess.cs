using Model;
using Model.Entities;
using System.Collections.Generic;


namespace DataAcccess.Repository
{
    public class PublisherDataAccess : BaseDataAccess<Publisher>
    {
        public IEnumerable<Publisher> ListPublishers()
        {
            return ListAll();
        }

        public Publisher AddPublisher(Publisher newPublisher)
        {
            return Add(newPublisher);
        }

        private void ConfigContext(SGBContext context)
        {
            context.Configuration.ProxyCreationEnabled = false;
            context.Configuration.LazyLoadingEnabled = false;
        }
    }
}
