using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiExam.Models.Entity
{
    public class FileEntity
    {
        [Key]
        public int FileId { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual UserEntity User { get; set; }

        [Required]
        public string Filename { get; set; }

        [Required]
        public string FileType { get; set; }

        [Required]
        public long FileSize { get; set; }

        [Required]
        public byte[] Data { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    

    }
}
