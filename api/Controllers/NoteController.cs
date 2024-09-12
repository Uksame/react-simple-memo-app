using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/notes")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;

        // Constructor
        public NoteController(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var Notes = await _noteRepository.GetAllAsync();

            return Ok(Notes);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var note = await _noteRepository.GetById(id);

            return note != null ? Ok(note) : NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, NoteDto note)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var UpdatedNote = await _noteRepository.UpdateAsync(id, note);

            return UpdatedNote != null ? Ok(UpdatedNote) : NotFound();



        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var DeletedNote = await _noteRepository.DeleteAsync(id);

            return DeletedNote != null ? Ok(DeletedNote) : NotFound();
        }

        [HttpPost]


        public async Task<IActionResult> Add([FromBody] NoteDto note)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newNote = note.ToNoteFromCreate(); // Use the extension method

            newNote = await _noteRepository.CreateAsync(newNote);

            return newNote != null ? Ok(newNote) : StatusCode(500, "An error has occurred while adding this note ");
        }

    }

}