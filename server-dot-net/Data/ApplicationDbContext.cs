using Microsoft.EntityFrameworkCore;
using server_dot_net.Model;

namespace server_dot_net.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Merchant> Merchants { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<LoanRequest> LoanRequests { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }

    }
}
