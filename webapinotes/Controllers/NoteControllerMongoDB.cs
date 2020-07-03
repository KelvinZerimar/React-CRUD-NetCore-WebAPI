using webapinotes.Models;
using webapinotes.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace webapinotes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly MongoDBService _mongodbService;

        public NoteController(MongoDBService mongodbService)
        {
            _mongodbService = mongodbService;
        }

        [HttpGet]
        public ActionResult<List<Note>> Get() =>
            _mongodbService.Get();

        [HttpGet("{id:length(24)}", Name = "GetNote")]
        public ActionResult<Note> Get(string id)
        {
            var note = _mongodbService.Get(id);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        [HttpPost]
        public ActionResult<Note> Create(Note note)
        {
            _mongodbService.Create(note);

            return CreatedAtRoute("GetNote", new { id = note.Id.ToString() }, note);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Note noteIn)
        {
            var note = _mongodbService.Get(id);

            if (note == null)
            {
                return NotFound();
            }

            _mongodbService.Update(id, noteIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var note = _mongodbService.Get(id);

            if (note == null)
            {
                return NotFound();
            }

            _mongodbService.Remove(note.Id);

            return NoContent();
        }
    }
}