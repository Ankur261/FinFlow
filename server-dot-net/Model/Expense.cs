using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_dot_net.Model
{
    public class Expense
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string Category { get; set; }

        public double Amount { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        [ForeignKey("Customer")]
        public long CustomerId { get; set; }

        public Customer Customer { get; set; }
    }
}
