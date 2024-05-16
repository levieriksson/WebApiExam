using WebApiExam.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using WebApiExam.Models.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
//DBs
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
//repos
builder.Services.AddIdentity<UserEntity, IdentityRole>(options =>
{ options.User.RequireUniqueEmail = true; })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

//services
#region commented
//builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
//{ options.User.RequireUniqueEmail = true; })
//    .AddEntityFrameworkStores<ApplicationDbContext>()
//    .AddDefaultTokenProviders();

////Auth
//#region Authenticate
//builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
//{ options.User.RequireUniqueEmail = true; })
//    .AddEntityFrameworkStores<ApplicationDbContext>()
//    .AddDefaultTokenProviders();

//builder.Services.AddAuthentication(x =>
//{
//    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;


//})
//.AddJwtBearer(x =>
//{
//    x.Events = new JwtBearerEvents
//    {
//        OnTokenValidated = context =>
//        {
//            //if (string.IsNullOrEmpty(context?.Principal?.Identity?.Name))
//            //    context?.Fail("Unauthorized");

//            return Task.CompletedTask;
//        }
//    };

//    x.RequireHttpsMetadata = true;
//    x.SaveToken = true;
//    x.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidIssuer = builder.Configuration.GetSection("TokenValidation").GetValue<string>("Issuer")!,
//        ValidateAudience = true,
//        ValidAudience = builder.Configuration.GetSection("TokenValidation").GetValue<string>("Audience")!,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        IssuerSigningKey = new SymmetricSecurityKey(
//            Encoding.UTF8.GetBytes(builder.Configuration.GetSection("TokenValidation").GetValue<string>("SecretKey")!))
//    };
//});
//#endregion
#endregion

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
