package com.finflow.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finflow.server.entity.Expense;
import com.finflow.server.repository.ExpenseRepository;
@Service
public class ExpenseService {
	@Autowired
	ExpenseRepository expenseRepository;
		public Expense addExpense(Expense expense) {
			 return expenseRepository.save(expense);
		}
}
