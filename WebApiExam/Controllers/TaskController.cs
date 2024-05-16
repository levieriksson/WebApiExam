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
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            var tasks = await _context.Tasks
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
            var task = await _context.Tasks
                .Select(t => new TaskDto
                {
                    TaskId = t.TaskId,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    Priority = t.Priority,
                    Status = t.Status
                }).FirstOrDefaultAsync(t => t.TaskId == id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: /Tasks
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask([FromBody] CreateTaskDto createTaskDto)
        {
            var task = new TaskEntity
            {
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                DueDate = createTaskDto.DueDate,
                Priority = createTaskDto.Priority,
                Status = createTaskDto.Status,
                //Hardcoded, fix later. 
                //UserId = "c266e967-3988-4331-8edb-b1fba8cc0a37"
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier) // Set the UserId to the current user's ID
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
    }
}
