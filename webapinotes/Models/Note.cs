using System;
//using Newtonsoft.Json;

namespace webapinotes.Controllers
{
    public class Note
    {
        public string id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime? dateCreate { get; set; }
        public DateTime? dateModify { get; set; }
        public bool IsActive { get; set; }

        public override string ToString()
        {
            return ""; //JsonConvert.SerializeObject(this);
        }

        public Note(){
            dateCreate = DateTime.UtcNow;
            IsActive = true;
        }
    }
}