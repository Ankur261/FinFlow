using BCrypt.Net;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server_dot_net.Data;
using server_dot_net.DTOs;
using server_dot_net.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;



namespace server_dot_net.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }

            // Check in all role tables
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == request.Email);
            var merchant = await _context.Merchants
    .Where(m => m.Email != null && m.Email == request.Email)
    .FirstOrDefaultAsync();

            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Email == request.Email);

            object user = customer ?? (object)merchant ?? admin;

            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });

            string storedPassword = customer?.Password ?? merchant?.Password ?? admin?.Password;

            // Verify password
            if (!BCrypt.Net.BCrypt.Verify(request.Password, storedPassword))
                return Unauthorized(new { message = "Invalid credentials" });

            // Determine role
            string role = customer != null ? "customer" :
                          merchant != null ? "merchant" :
                          "admin";

            // TODO: Generate JWT Token here
            string token = GenerateJwtToken(request.Email, role);

            return Ok(new
            {
                message = "Login successful",
                token,
                role,
                name = customer?.Name ?? merchant?.BusinessName ?? admin?.Name,
                id = customer?.Id ?? merchant?.Id ?? admin?.Id,
            });
        }

        private string GenerateJwtToken(string email, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
{
    new Claim(JwtRegisteredClaimNames.Sub, email),
    new Claim(ClaimTypes.Email, email),
    new Claim(ClaimTypes.Role, role),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
};


            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrEmpty(request.Role) ||
                string.IsNullOrEmpty(request.Email) ||
                string.IsNullOrEmpty(request.Password) ||
                string.IsNullOrEmpty(request.Name))
            {
                return BadRequest(new { message = "All fields are required" });
            }

            // Check if user already exists
            bool exists = await _context.Customers.AnyAsync(c => c.Email == request.Email) ||
                          await _context.Merchants.AnyAsync(m => m.Email == request.Email) ||
                          await _context.Admins.AnyAsync(a => a.Email == request.Email);

            if (exists)
                return BadRequest(new { message = "User already exists" });

            // Hash password using BCrypt
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Save to correct table
            switch (request.Role.ToLower())
            {
                case "customer":
                    _context.Customers.Add(new Customer
                    {
                        Email = request.Email,
                        Password = hashedPassword,
                        Name = request.Name
                    });
                    break;

                case "merchant":
                    _context.Merchants.Add(new Merchant
                    {
                        Email = request.Email,
                        Password = hashedPassword,
                        BusinessName = request.Name
                    });
                    break;

                case "admin":
                    _context.Admins.Add(new Admin
                    {
                        Email = request.Email,
                        Password = hashedPassword,
                        Name = request.Name
                    });
                    break;

                default:
                    return BadRequest(new { message = "Invalid role" });
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful" });
        }
}
    public class RegisterRequest
    {
        public string Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; } // For merchant, this is BusinessName
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

}
