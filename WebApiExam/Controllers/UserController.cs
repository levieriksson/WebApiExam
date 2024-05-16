using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApiExam.Models.Dto;
using WebApiExam.Models.Entity;

namespace WebApiExam.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;

        public UserController(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserEntity>> GetUserById(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<UserEntity>> PostUser(CreateUserDto createUserDto)
        {
            var user = new UserEntity
            {
                Email = createUserDto.Email,
                UserName = createUserDto.Username
            };

            var result = await _userManager.CreateAsync(user, createUserDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return CreatedAtAction("GetUserById", new { id = user.Id }, user);
        }
    }
}
