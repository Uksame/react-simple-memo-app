using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Models;

namespace api.Dtos
{
    public class CategoryDto
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public AccessType AccessType { get; set; }

        public List<int>? NoteIds { get; set; }

        // public List<NoteDto>? Notes { get; set; }

    }

    public class NewUpdateCategoryDto
    {

        [Required]
        [StringLength(40)]
        public string Name { get; set; }

        [Required]
        [Range(0, 1, ErrorMessage = "AccessType must be either 0 (Public) or 1 (Private).")]
        public AccessType AccessType { get; set; } = AccessType.Public;

        public string? PassCode { get; set; } = string.Empty;

    }

    public class CategoryNotesListDto
    {

        public int Id { get; set; }

        public List<NoteDto>? Notes { get; set; }

    }


    public class CategoryNoteDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AccessType AccessType { get; set; } = AccessType.Public;
    }

    // public class CategoryDtoViewModel
    // {
    //     public int Id { get; set; }

    //     public string Name { get; set; }

    //     public List<int> NoteIds { get; set; }


    // }
}
