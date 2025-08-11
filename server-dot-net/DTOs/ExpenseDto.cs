namespace server_dot_net.DTOs
{
    public class ExpenseDto
    {
        public long Id { get; set; }
        public string Category { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public long CustomerId { get; set; }
        public string CustomerName { get; set; }
    }
}
