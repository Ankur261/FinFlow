package com.finflow.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finflow.server.entity.Invoice;

//public class InvoiceRepository {
	@Repository
	public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
	    List<Invoice> findByMerchantId(Long merchantId);
	    List<Invoice> findByCustomerId(Long customerId);
	}

//}//
