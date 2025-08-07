namespace server_dot_net.DTOs
{
    public class ExpenseRequestDto
    {
        public string Category { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public long CustomerId { get; set; }
    }
}
