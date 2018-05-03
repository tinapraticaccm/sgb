using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Utils
{
    public class QueryLimit
    {
        public int Page { get; set; }
        public int Limit { get; set; }
        public string Order { get; set; }
        public string Orientation { get; set; }
    }
}
