package com.finflow.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Double balance;
    private Double monthlySalary;
    private Double monthlyBudget;
}
