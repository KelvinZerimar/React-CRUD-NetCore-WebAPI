using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace webapinotes.Controllers
{
    [ApiController]
    [Route("[api/controller]")]
    public class NoteController : ControllerBase
    {
        
        private readonly ILogger<NoteController> _logger;
        

        public NoteController(ILogger<NoteController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            await Task.Delay(5000); //_adapter.GetData("test-db", "test-collection");
            return Ok();
        }
    }
}
