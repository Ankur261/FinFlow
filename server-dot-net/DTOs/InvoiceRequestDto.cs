using System;
namespace server_dot_net.DTOs
{
    public class InvoiceRequestDto
    {
        public string InvoiceNumber { get; set; }
        public double Amount { get; set; }
        public DateTime DueDate { get; set; }
        public long MerchantId { get; set; }
        public long CustomerId { get; set; }
        public string Status { get; set; } = "Unpaid";
    }
}
