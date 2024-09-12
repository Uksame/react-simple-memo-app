using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Interfaces;
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
        public async Task<List<Note>> GetAllAsync()
        {
            return await _context.Notes.ToListAsync();
        }
        public async Task<Note?> CreateAsync(Note note)
        {
            await _context.Notes.AddAsync(note);
            await _context.SaveChangesAsync();
            return note;

        }
        public async Task<Note?> DeleteAsync(int id)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(x => x.Id == id);
            if (note == null)
                return null;

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return note;
        }
        public async Task<Note?> GetById(int id)
        {

            return await _context.Notes.FirstOrDefaultAsync(x => x.Id == id) ?? null;

        }
        public async Task<Note?> UpdateAsync(int id, NoteDto UpdatedComment)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(x => x.Id == id);

            if (note == null)
                return null;

            note.Content = UpdatedComment.Content;
            note.Title = UpdatedComment.Title;
            note.Group = UpdatedComment.Group;
            //Check back later if the updated time will be an issue!
            /*    note.DateTime = DateTime.Now; */

            await _context.SaveChangesAsync();
            return note;

        }
        //Not implemented yet !
        public Task<Note?> GetBySymbolAsync(string symbol)
        {
            throw new NotImplementedException();
        }

    }
}