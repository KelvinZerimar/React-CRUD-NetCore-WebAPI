using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace webapinotes.Models
{
    public class Note
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? ModifyDate { get; set; }
        public bool IsActive { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }

        public Note(){
            CreatedDate = DateTime.UtcNow;
            IsActive = true;
        }
    }
}