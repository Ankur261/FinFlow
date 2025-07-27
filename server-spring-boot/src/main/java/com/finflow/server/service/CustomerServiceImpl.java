package com.finflow.server.service;

import com.finflow.server.dto.CustomerDTO;
import com.finflow.server.entity.Customer;
import com.finflow.server.repository.CustomerRepository;
import com.finflow.server.util.CustomerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerUtil converter;

    @Override
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        Customer customer = converter.convertToEntity(customerDTO);
        return converter.convertToDTO(customerRepository.save(customer));
    }

    @Override
    public CustomerDTO loginCustomer(String email, String password) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!customer.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        return converter.convertToDTO(customer);
    }

    @Override
    public CustomerDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return converter.convertToDTO(customer);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(converter::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        existing.setName(customerDTO.getName());
        existing.setEmail(customerDTO.getEmail());
        existing.setPassword(customerDTO.getPassword());
        existing.setBalance(customerDTO.getBalance());
        existing.setMonthlySalary(customerDTO.getMonthlySalary());
        existing.setMonthlyBudget(customerDTO.getMonthlyBudget());

        return converter.convertToDTO(customerRepository.save(existing));
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
