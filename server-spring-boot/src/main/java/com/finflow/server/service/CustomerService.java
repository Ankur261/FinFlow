package com.finflow.server.service;

import com.finflow.server.dto.CustomerDTO;
import java.util.List;
public interface CustomerService {
	
    CustomerDTO createCustomer(CustomerDTO customerDTO);
    CustomerDTO loginCustomer(String email, String password);
    CustomerDTO getCustomerById(Long id);
    List<CustomerDTO> getAllCustomers();
    CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO);

    void deleteCustomer(Long id);
}
