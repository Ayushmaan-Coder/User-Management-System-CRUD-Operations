package com.hsrp.nic_project.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.hsrp.nic_project.relation.IPaddress;
import com.hsrp.nic_project.relation.User;
import com.hsrp.nic_project.repository.IPaddressRepository;
import com.hsrp.nic_project.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class DataService {

    private final UserRepository userRepository;
    private final IPaddressRepository ipaddressRepository;

    
    public DataService(UserRepository userRepository, IPaddressRepository ipaddressRepository) {
        this.userRepository = userRepository;
        this.ipaddressRepository = ipaddressRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    
    public Optional<User> getUser(Long id)
    {
    	return userRepository.findById(id);
    }

    @Transactional
    public User createUser(User user) {
    	
        User savedUser = userRepository.save(user);
        List<IPaddress> ipAddresses = savedUser.getIpaddress();
        
        for (IPaddress ipAddress : ipAddresses) {
            ipAddress.setUser(savedUser);
            ipaddressRepository.save(ipAddress);
        }

        return savedUser;
    }



    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setOrganization_name(user.getOrganization_name());
            existingUser.setUser_name(user.getUser_name());
            existingUser.setPassword(user.getPassword());
            existingUser.setPhone_num(user.getPhone_num());
            existingUser.setEmail(user.getEmail());
            existingUser.setRegistration_num(user.getRegistration_num());
            
            return userRepository.save(existingUser);
        }
        return null; // Handle not found scenario
    }

    @Transactional
    public void deleteUser(Long id) {
        boolean exists = userRepository.existsById(id);

        if (!exists) {
            throw new IllegalStateException("User with ID " + id + " does not exist");
        }
        
        userRepository.deleteById(id);
    }


}
