using System.ComponentModel.DataAnnotations;

namespace server_dot_net.Model
{
    public class Admin
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
