namespace server_dot_net.DTOs
{
    public class CustomerRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
        public double Balance { get; set; }
        public double MonthlySalary { get; set; }
        public double MonthlyBudget { get; set; }
    }
}
