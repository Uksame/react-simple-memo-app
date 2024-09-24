using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Categories", Schema = "Memo")]

    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Name { get; set; } = null!;


        [Required]
        [Range(0, 1, ErrorMessage = "AccessType must be either 0 (Public) or 1 (Private).")]
        public AccessType AccessType { get; set; } = AccessType.Public;

        public string? PassCode { get; set; }

        public ICollection<Note>? Notes { get; set; }


        public bool IsAccessValid(string? passCode )
        {
            if (AccessType == AccessType.Public) return true;
            if (AccessType == AccessType.Private && PassCode == passCode) return true;
            return false;

        }

    }
}