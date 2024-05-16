using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApiExam.Contexts;
using WebApiExam.Models.Entity;

namespace WebApiExam.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly AppDbContext _context;

        public FilesController(UserManager<UserEntity> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var fileEntity = new FileEntity
            {
                UserId = userId,
                Filename = file.FileName,
                FileType = file.ContentType,
                FileSize = file.Length,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            using (var dataStream = new System.IO.MemoryStream())
            {
                await file.CopyToAsync(dataStream);
                fileEntity.Data = dataStream.ToArray();
            }

            _context.Files.Add(fileEntity);
            await _context.SaveChangesAsync();

            return Ok(new { fileEntity.FileId, fileEntity.Filename, fileEntity.FileType, fileEntity.FileSize });
        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadFile(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var fileEntity = await _context.Files.FirstOrDefaultAsync(f => f.FileId == id && f.UserId == userId);
            if (fileEntity == null)
            {
                return NotFound();
            }

            return File(fileEntity.Data, fileEntity.FileType, fileEntity.Filename);
        }
    }
}
