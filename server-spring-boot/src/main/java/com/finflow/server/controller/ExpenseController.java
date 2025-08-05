package com.finflow.server.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.finflow.server.entity.Expense;
import com.finflow.server.repository.ExpenseRepository;
import com.finflow.server.service.ExpenseService;

@RestController

@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;  

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;  
    }
//
//    @PostMapping("/add")
//    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
//    	 Expense savedExpense = expenseService.addExpense(expense);  
//        return ResponseEntity.ok(savedExpense); 
//    }
    
    @PostMapping("/add")
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }
    @Autowired
    ExpenseRepository repo;
    @GetMapping("/getallexpenses")
    public List<Expense> getAllExpenses(){
    	List<Expense> expense =repo.findAll();
    	return expense;
    }
    
    @GetMapping("/{id}")
   		public Expense getExpense(@PathVariable Long id) {
   			
   			Expense expense = repo.findById(id).get();
   			return expense;
   		}

   
}
