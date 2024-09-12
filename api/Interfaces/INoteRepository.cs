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
        Task<List<Note>> GetAllAsync();
        Task<Note?> CreateAsync(Note note);
        Task<Note?> UpdateAsync(int id, NoteDto UpdatedComment);
        Task<Note?> DeleteAsync(int id);
        Task<Note?> GetById(int id);
        Task<Note?> GetBySymbolAsync(string symbol);
    }
}