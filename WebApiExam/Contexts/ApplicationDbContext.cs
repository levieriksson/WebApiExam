using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApiExam.Models.Entity;

namespace WebApiExam.Contexts
{
    public class ApplicationDbContext : IdentityDbContext<UserEntity, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<FileEntity> Files { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<FileEntity>()
                .HasOne(f => f.User)
                .WithMany(u => u.Files)
                .HasForeignKey(f => f.UserId);

            modelBuilder.Entity<TaskEntity>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tasks)
                .HasForeignKey(t => t.UserId);
        }
    }
}
