using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_dot_net.Model
{
    public class Invoice
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string InvoiceNumber { get; set; }

        public double Amount { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime DueDate { get; set; }

        [ForeignKey("Merchant")]
        public long MerchantId { get; set; }

        public Merchant Merchant { get; set; }

        [ForeignKey("Customer")]
        public long CustomerId { get; set; }

        public Customer Customer { get; set; }

        public string Status { get; set; } // Paid, Unpaid, Overdue
    }
}
