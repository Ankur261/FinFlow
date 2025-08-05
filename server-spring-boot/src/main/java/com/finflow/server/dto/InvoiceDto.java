package com.finflow.server.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDto {
    private Long id;
    private String invoiceNumber;
    private Double amount;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private Long merchantId;
    private Long customerId;
    private String status;
}
