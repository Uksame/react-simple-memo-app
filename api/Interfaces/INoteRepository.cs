using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface INoteRepository
    {
        Task<List<NoteDto>> GetAllAsync();
        Task<NoteDto?> GetById(int id);
        Task<NoteDto?> CreateAsync(Note note);
        Task<NoteDto?> UpdateAsync(int id, UpdateNoteDto UpdatedComment);
        Task<NoteDto?> DeleteAsync(int id);
        // Task<NoteDto?> GetBySymbolAsync(string symbol);
    }
}