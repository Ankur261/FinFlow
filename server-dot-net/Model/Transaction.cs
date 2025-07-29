using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_dot_net.Model
{
    public class Transaction
    {
        [Key]
        public long Id { get; set; }

        public double Amount { get; set; }

        public string Type { get; set; } // credit or debit

        public DateTime Timestamp { get; set; }

        [ForeignKey("Customer")]
        public long CustomerId { get; set; }

        public Customer Customer { get; set; }
    }
}
