using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly MemoDbContext _context;

        public NoteRepository(MemoDbContext context)
        {
            _context = context;
        }
        public async Task<List<NoteDto>> GetAllAsync()
        {
            var Notes = await _context.Notes.Include(c => c.Category).Where(n => n.Category == null || n.Category.AccessType == AccessType.Public).Select(n => n.ToNoteDto()).ToListAsync();

            return Notes;
        }

        public async Task<NoteDto?> GetById(int id)
        {

            var note = await _context.Notes.Include(c => c.Category).FirstOrDefaultAsync(x => x.Id == id);
            return note?.ToNoteDto();

        }

        public async Task<NoteDto?> CreateAsync(Note note)
        {
            await _context.Notes.AddAsync(note);
            await _context.SaveChangesAsync();
            return note.ToNoteDto();

        }
        public async Task<NoteDto?> DeleteAsync(int id)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(x => x.Id == id);

            if (note == null)
                return null;

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return note.ToNoteDto();
        }

        public async Task<NoteDto?> UpdateAsync(int id, UpdateNoteDto UpdatedNote)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(x => x.Id == id);

            if (note == null)
                return null;

            note.Title = UpdatedNote.Title;
            note.Content = UpdatedNote.Content;
            note.CategoryId = UpdatedNote.CategoryId;
            note.DateTime = DateTime.Now;

            //Check back later if the updated time will be an issue!
            /*    note.DateTime = DateTime.Now; */

            await _context.SaveChangesAsync();
            return note.ToNoteDto();

        }
        //Not implemented yet !
        /* 
        public Task<NoteDto?> GetBySymbolAsync(string symbol)
        {
            throw new NotImplementedException();
        }
         */

    }
}