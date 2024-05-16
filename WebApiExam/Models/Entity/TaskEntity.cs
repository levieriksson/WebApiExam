using System.ComponentModel.DataAnnotations;

namespace WebApiExam.Models.Entity
{
    public class TaskEntity
    {
        [Key]
        public int TaskId { get; set; }

        public string UserId { get; set; }
        public virtual UserEntity User { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
