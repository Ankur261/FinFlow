package com.finflow.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.server.entity.Invoice;
import com.finflow.server.service.InvoiceService;

import lombok.RequiredArgsConstructor;

//
//public class InvoiceController {
//
//}
@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.createInvoice(invoice));
    }

    //get by invoice id , get by user id , get all invoices from table
    @GetMapping("/merchant/{merchantId}")
    public ResponseEntity<List<Invoice>> getMerchantInvoices(@PathVariable Long merchantId) {
        return ResponseEntity.ok(invoiceService.getByMerchantId(merchantId));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Invoice>> getCustomerInvoices(@PathVariable Long customerId) {
        return ResponseEntity.ok(invoiceService.getByCustomerId(customerId));
    }

    @PutMapping("/{invoiceId}/status")
    public ResponseEntity<Invoice> updateInvoiceStatus(
            @PathVariable Long invoiceId,
            @RequestParam String status) {
        return ResponseEntity.ok(invoiceService.markInvoiceStatus(invoiceId, status));
    }
}
