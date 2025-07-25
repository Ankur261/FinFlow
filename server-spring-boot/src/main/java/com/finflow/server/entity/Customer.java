package com.finflow.server.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private Double balance;
    private Double monthlySalary;
    private Double monthlyBudget;

    @OneToMany(mappedBy = "customer")
    private List<Expense> expenses;

    @OneToMany(mappedBy = "customer")
    private List<LoanRequest> loanRequests;

    @OneToMany(mappedBy = "customer")
    private List<Invoice> invoices;
}
