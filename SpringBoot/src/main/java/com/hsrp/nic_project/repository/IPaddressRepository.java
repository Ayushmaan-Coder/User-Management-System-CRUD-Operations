package com.hsrp.nic_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hsrp.nic_project.relation.IPaddress;

@Repository
public interface IPaddressRepository extends JpaRepository<IPaddress, Long>{
	
}
