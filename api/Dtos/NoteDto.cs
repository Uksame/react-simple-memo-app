using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos
{

    public class NoteDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public string Title { get; set; } = null!;

        public DateTime DateTime { get; set; }

        public CategoryNoteDto? Category { get; set; }
    }

    public class NewNoteDto
    {
        public string Content { get; set; } = null!;

        [Required, MaxLength(100)]
        public string Title { get; set; } = null!;
        public int? CategoryId { get; set; } = null;
    }

    public class UpdateNoteDto
    {

        [Required]
        public string? Content { get; set; } = null!;

        [Required, MaxLength(100)]
        public string Title { get; set; } = null!;
        public int? CategoryId { get; set; } = null;
    }
}