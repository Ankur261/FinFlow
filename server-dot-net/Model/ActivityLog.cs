using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_dot_net.Model
{
    public class ActivityLog
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string? Activity { get; set; }

        public DateTime Timestamp { get; set; }

        public string? PerformedBy { get; set; }
    }

}
