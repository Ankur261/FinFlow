using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_dot_net.Model
{
   // [Table("invoice")]
    public class Invoice
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]

        [Column("invoice_number")]
        public string InvoiceNumber { get; set; }//  = string.Empty;

        [Column("amount")]
        public double Amount { get; set; }

        [Column("issue_date")]
        public DateTime IssueDate { get; set; }
        [Column("due_date")]
        public DateTime DueDate { get; set; }

        [ForeignKey("Merchant")]
        [Column("merchant_id")]
        public long MerchantId { get; set; }

        public Merchant Merchant { get; set; }

        [ForeignKey("Customer")]
        [Column("customer_id")]
        public long CustomerId { get; set; }

        public Customer Customer { get; set; }

        public string Status { get; set; } // Paid, Unpaid, Overdue
    }
}
