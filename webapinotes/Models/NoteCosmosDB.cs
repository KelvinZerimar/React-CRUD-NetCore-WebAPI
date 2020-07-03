using System;
using Newtonsoft.Json;

namespace webapinotes.Models
{
    public class Note_
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "createDate")]
        public DateTime CreatedDate { get; set; }

         [JsonProperty(PropertyName = "modifyDate")]
        public DateTime? ModifyDate { get; set; }

         [JsonProperty(PropertyName = "isActive")]
        public bool IsActive { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }

        public Note_(){
            CreatedDate = DateTime.UtcNow;
            IsActive = true;
        }
    }
}