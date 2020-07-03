using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapinotes.Models;
using webapinotes.Services;

namespace webapinotes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController_ : ControllerBase
    {
        private readonly ICosmosDbService _cosmosDbService;

        public NoteController_(ILogger<NoteController> logger,ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }

        // GET: api/Note
        [HttpGet]
        public async Task<IEnumerable<Note>> GetNotes()
        {
            return await _cosmosDbService.GetItemsAsync("SELECT * FROM c");
        }

        // GET: api/Note/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var note = await _cosmosDbService.GetItemAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // POST: api/Note
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<Note>> CreateAsync(Note note)
        {

            note.Id = Guid.NewGuid().ToString();
            await _cosmosDbService.AddItemAsync(note);

            return CreatedAtAction("GetNote", new { id = note.Id }, note);
        }

        // PUT: api/Note/5
        [HttpPut("{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult> EditAsync(Note item)
        {
            try
            {
                 await _cosmosDbService.UpdateItemAsync(item.Id, item);
            }
            catch (System.Exception)
            {
                if (!NoteExists(item.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE: api/Note/5
        [HttpDelete("{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<Note>> DeleteNoteAsync(string id)
        {
            var note = await _cosmosDbService.GetItemAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            await _cosmosDbService.DeleteItemAsync(id);

            return note;
        }

        private bool NoteExists(string id)
        {
            return false;
        }
    }
}
