package com.finflow.server.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Merchant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String businessName;
    private String email;
    private String phone;
    private String password;
    private String businessType; // "Electricity", "Water", "Gas"
    private String status;

    @OneToMany(mappedBy = "merchant")
    private List<Invoice> invoices;
}
