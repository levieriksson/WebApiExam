using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApiExam.Contexts;
using WebApiExam.Models.Dto;
using WebApiExam.Models.Entity;

namespace WebApiExam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /Tasks
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var tasks = await _context.Tasks
                                      .Where(t => t.UserId == userId)
                                      .Select(t => new TaskDto
                                      {
                                          TaskId = t.TaskId,
                                          Title = t.Title,
                                          Description = t.Description,
                                          DueDate = t.DueDate,
                                          Priority = t.Priority,
                                          Status = t.Status
                                      }).ToListAsync();

            return Ok(tasks);
        }

        // GET: /Tasks/{id}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTaskById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var task = await _context.Tasks
                                     .Where(t => t.TaskId == id && t.UserId == userId)
                                     .Select(t => new TaskDto
                                     {
                                         TaskId = t.TaskId,
                                         Title = t.Title,
                                         Description = t.Description,
                                         DueDate = t.DueDate,
                                         Priority = t.Priority,
                                         Status = t.Status
                                     }).FirstOrDefaultAsync();

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: /Tasks
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto createTaskDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var task = new TaskEntity
            {
                UserId = userId,
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                DueDate = createTaskDto.DueDate,
                Priority = createTaskDto.Priority,
                Status = createTaskDto.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskById), new { id = task.TaskId }, new TaskDto
            {
                TaskId = task.TaskId,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Priority = task.Priority,
                Status = task.Status
            });
        }

        // PUT: /Tasks/{id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto UpdateTaskDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var task = await _context.Tasks
                                     .Where(t => t.TaskId == id && t.UserId == userId)
                                     .FirstOrDefaultAsync();

            if (task == null)
            {
                return NotFound();
            }

            task.Title = UpdateTaskDto.Title;
            task.Description = UpdateTaskDto.Description;
            task.DueDate = UpdateTaskDto.DueDate;
            task.Priority = UpdateTaskDto.Priority;
            task.Status = UpdateTaskDto.Status;
            task.UpdatedAt = DateTime.UtcNow;

            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new TaskDto
            {
                TaskId = task.TaskId,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Priority = task.Priority,
                Status = task.Status
            });
        }

        // DELETE: /Tasks/{id}
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var task = await _context.Tasks
                                     .Where(t => t.TaskId == id && t.UserId == userId)
                                     .FirstOrDefaultAsync();

            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Task deleted successfully" });
        }

    }
}
