package com.finflow.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finflow.server.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
