using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Notes", Schema = "Memo")]
    public class Note
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Content { get; set; } = null!;

        [Required, MaxLength(100)]
        public string Title { get; set; } = null!;

        public DateTime DateTime { get; set; } = DateTime.Now;

        public int? CategoryId { get; set; }

        [MaxLength(50)]
        // Navigation property
        public Category? Category { get; set; } 


    }
}