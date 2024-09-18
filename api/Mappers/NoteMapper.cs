using api.Dtos;
using api.Models;

namespace api.Mappers
{
    public static class NoteMapper
    {


        public static NoteDto ToNoteDto(this Note note)
        {
            return new NoteDto
            {
                Id = note.Id,
                Content = note.Content,
                Title = note.Title,
                DateTime = note.DateTime,
                Category = note.Category?.ToCategoryNoteDto(),
            };
        }

        public static Note ToNoteFromCreate(this NewNoteDto noteDto)
        {
            return new Note
            {
                Content = noteDto.Content,
                Title = noteDto.Title,
                CategoryId = noteDto.CategoryId,
                DateTime = DateTime.Now,

            };
        }

        // public static Note ToNoteFromDto(this NoteDto noteDto)
        // {
        //     return new Note
        //     {
        //         Id = noteDto.Id,
        //         Content = noteDto.Content,
        //         Title = noteDto.Title,
        //         DateTime = noteDto.DateTime,
        //         CategoryId = noteDto.CategoryId,

        //     };
        // }


        // public static Note ToNoteFromUpdate(this UpdateNoteDto noteDto)
        // {
        //     return new Note
        //     {
        //         Content = noteDto.Content,
        //         Title = noteDto.Title,
        //         CategoryId = noteDto.CategoryId,
        //         DateTime = DateTime.Now,
        //     };
        // }

    }
}