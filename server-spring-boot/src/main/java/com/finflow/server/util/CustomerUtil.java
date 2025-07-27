package com.finflow.server.util;

import com.finflow.server.dto.CustomerDTO;
import com.finflow.server.entity.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerUtil {

    public CustomerDTO convertToDTO(Customer customer) {
        return CustomerDTO.builder()
                .id(customer.getId())
                .name(customer.getName())
                .email(customer.getEmail())
                .password(customer.getPassword())
                .balance(customer.getBalance())
                .monthlySalary(customer.getMonthlySalary())
                .monthlyBudget(customer.getMonthlyBudget())
                .build();
    }

    public Customer convertToEntity(CustomerDTO dto) {
        return Customer.builder()
                .id(dto.getId())
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .balance(dto.getBalance())
                .monthlySalary(dto.getMonthlySalary())
                .monthlyBudget(dto.getMonthlyBudget())
                .build();
    }
}
