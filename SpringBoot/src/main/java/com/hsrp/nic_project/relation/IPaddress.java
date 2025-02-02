package com.hsrp.nic_project.relation;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "ipaddress")
public class IPaddress {

    @Id
    @SequenceGenerator(
            name = "IP_sequence",
            sequenceName = "IP_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "IP_sequence"
    )

    private Long id;
    private String ip_address;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    public User user;

    public IPaddress() {

    }

    public IPaddress(Long id, String ip_address) {
        this.ip_address = ip_address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

	public String getIp_address() {
		return ip_address;
	}

	public void setIp_address(String ip_address) {
		this.ip_address = ip_address;
	}
	
}
