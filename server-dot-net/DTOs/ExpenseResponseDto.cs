namespace server_dot_net.DTOs
{
    public class ExpenseResponseDto
    {
        public long Id { get; set; }
        public string Category { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }

        //public  Date { get; set; }

    }
}
