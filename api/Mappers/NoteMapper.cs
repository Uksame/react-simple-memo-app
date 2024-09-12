using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;

namespace api.Mappers
{
    public static class NoteMapper
    {
        public static Note ToNoteFromCreate(this NoteDto noteDto)
        {
            return new Note
            {
                Content = noteDto.Content,
                Title = noteDto.Title,
                Group = noteDto.Group,
            };
        }
    }
}