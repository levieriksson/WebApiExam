using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApiExam.Helpers;
using WebApiExam.Models.Dto;
using WebApiExam.Models.Entity;

namespace WebApiExam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;

        public AuthController(
            UserManager<UserEntity> userManager,
            SignInManager<UserEntity> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto registrationDto)
        {
            var user = new UserEntity { UserName = registrationDto.Email, Email = registrationDto.Email };
            var result = await _userManager.CreateAsync(user, registrationDto.Password);

            if (result.Succeeded)
            {
                var token = TokenGenerator.Generate(
                    new ClaimsIdentity(new[]
                    {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.UserName)
                    }),
                    DateTime.UtcNow.AddDays(7) // Token expiration
                );

                return Ok(new { Username = user.UserName, Token = token });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            var result = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(loginDto.Email);
                var token = TokenGenerator.Generate(
                    new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Name, user.UserName)
                    }),
                    DateTime.UtcNow.AddHours(1) // Token expiration
                );

                return Ok(new { Username = user.UserName, Token = token });
            }

            return BadRequest("Invalid login attempt.");
        }
    }

}
