using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_dot_net.Model
{
    [Table("customer")]
    public class Customer
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [Column("balance")]
        public double Balance { get; set; }

        [Column("monthly_salary")]
        public double MonthlySalary { get; set; }

        [Column("monthly_budget")]
        public double MonthlyBudget { get; set; }
    }
}
