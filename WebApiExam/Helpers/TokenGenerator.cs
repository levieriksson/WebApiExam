using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebApiExam.Helpers
{
    public class TokenGenerator
    {
        private static readonly IConfiguration _configuration;

        static TokenGenerator()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            _configuration = builder.Build();
        }

        public static string Generate(ClaimsIdentity claims, DateTime expiresAt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration.GetSection("TokenValidation").GetValue<string>("Issuer")!,
                Audience = _configuration.GetSection("TokenValidation").GetValue<string>("Audience")!,
                Subject = claims,
                Expires = expiresAt,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("TokenValidation").GetValue<string>("SecretKey")!)),
                    SecurityAlgorithms.HmacSha512Signature)
            };

            return tokenHandler.WriteToken(tokenHandler.CreateToken(securityTokenDescriptor));
        }
    }
}
