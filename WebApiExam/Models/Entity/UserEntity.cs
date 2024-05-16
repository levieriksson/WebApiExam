using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiExam.Models.Entity
{
    public class UserEntity : IdentityUser<int>
    {
        public ICollection<FileEntity> Files { get; set; }
        public ICollection<TaskEntity> Tasks { get; set; }
    }
}
