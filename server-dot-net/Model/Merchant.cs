using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_dot_net.Model
{
    [Table("merchant")]
    public class Merchant
    {
        [Key]
        public long Id { get; set; }

        [Column("business_name")]
        [Required]
        public string BusinessName { get; set; }

        [Required]
        public string Email { get; set; }

        public string Phone { get; set; }

        [Required]
        public string Password { get; set; }

        [Column("business_type")]
        public string BusinessType { get; set; } // Electricity, Water, Gas

        public string Status { get; set; }

        public ICollection<Invoice> Invoices { get; set; }
    }
}
