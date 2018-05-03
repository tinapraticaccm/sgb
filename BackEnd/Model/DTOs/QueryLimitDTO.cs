using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.DTOs
{
    public class QueryLimitDTO<T> where T : class
    {
        public List<T> Result { get; set; }
        public int Count { get; set; }

        public QueryLimitDTO(List<T> listResult, int count)
        {
            this.Result = listResult;
            this.Count = count;
        }
    }
}
