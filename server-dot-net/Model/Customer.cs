using Microsoft.AspNetCore.Identity.Data;
using System.ComponentModel.DataAnnotations;

namespace server_dot_net.Model
{
    public class Customer
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public double Balance { get; set; }

        public double MonthlySalary { get; set; }

        public double MonthlyBudget { get; set; }

        public ICollection<Expense> Expenses { get; set; }

        public ICollection<LoanRequest> LoanRequests { get; set; }

        public ICollection<Invoice> Invoices { get; set; }
    }
}
