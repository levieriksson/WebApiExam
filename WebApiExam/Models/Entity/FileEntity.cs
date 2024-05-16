using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace WebApiExam.Models.Entity
{
    public class FileEntity
    {
        [Key]
        public int FileId { get; set; }

        // Change UserId to string to match UserEntity.Id
        public string UserId { get; set; }
        public virtual UserEntity User { get; set; }

        public string Filename { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public long FileSize { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
