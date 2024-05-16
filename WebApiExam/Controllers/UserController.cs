using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        // Use string for ID to match the string type of UserEntity.Id
        [HttpGet("{id}")]
        public async Task<ActionResult<UserEntity>> GetUserById(string id)
        {
            // Use FindByIdAsync with a string ID
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        [Authorize]
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

            // Use nameof to refer to the GetUserById action correctly
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }
    }
    }

