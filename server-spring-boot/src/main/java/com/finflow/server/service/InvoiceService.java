package com.finflow.server.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.finflow.server.entity.Invoice;
import com.finflow.server.repository.InvoiceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepo;

    public Invoice createInvoice(Invoice invoice) {
        invoice.setStatus("Unpaid");
        invoice.setIssueDate(LocalDate.now());

        // Optional: auto-generate invoiceNumber
        if (invoice.getInvoiceNumber() == null) {
            invoice.setInvoiceNumber("INV-" + System.currentTimeMillis());
        }

        return invoiceRepo.save(invoice);
    }

    public List<Invoice> getByMerchantId(Long merchantId) {
        return invoiceRepo.findByMerchantId(merchantId);
    }

    public List<Invoice> getByCustomerId(Long customerId) {
        return invoiceRepo.findByCustomerId(customerId);
    }

    public Invoice markInvoiceStatus(Long id, String newStatus) {
        Invoice invoice = invoiceRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        invoice.setStatus(newStatus);
        return invoiceRepo.save(invoice);
    }
}

