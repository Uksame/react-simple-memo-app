using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class NoteDto
    {

        public string Content { get; set; } = null!;

        [MaxLength(100)]
        public string Title { get; set; } = null!;

        public string? Group { get; set; }

    }
}