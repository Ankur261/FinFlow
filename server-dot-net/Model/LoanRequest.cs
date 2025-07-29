using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_dot_net.Model
{
    public class LoanRequest
    {
        [Key]
        public long Id { get; set; }

        public double Amount { get; set; }

        public string Reason { get; set; }

        public string Status { get; set; } // pending, approved, rejected

        public DateTime RequestDate { get; set; }

        [ForeignKey("Customer")]
        public long CustomerId { get; set; }

        public Customer Customer { get; set; }
    }
}
