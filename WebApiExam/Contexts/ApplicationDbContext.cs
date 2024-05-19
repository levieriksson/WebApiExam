using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApiExam.Models.Entity;

namespace WebApiExam.Contexts
{
    public class AppDbContext : IdentityDbContext<UserEntity, IdentityRole, string>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        public DbSet<FileEntity> Files { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure the FileEntity relationship
            builder.Entity<FileEntity>()
                .HasOne(f => f.User)
                .WithMany(u => u.Files)
                .HasForeignKey(f => f.UserId)
                .IsRequired(true);  // Adjust based on your requirements

            // Configure the TaskEntity relationship
            builder.Entity<TaskEntity>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tasks)
                .HasForeignKey(t => t.UserId)
                .IsRequired(true);  // Adjust based on your requirements

            // Configure the enum conversions
            builder.Entity<TaskEntity>()
                .Property(e => e.Priority)
                .HasConversion<string>();

            builder.Entity<TaskEntity>()
                .Property(e => e.Status)
                .HasConversion<string>();
        }
    }
}
