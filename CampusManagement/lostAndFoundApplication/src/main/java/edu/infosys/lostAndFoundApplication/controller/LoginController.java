package edu.infosys.lostAndFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import edu.infosys.lostAndFoundApplication.bean.CampusUser;
import edu.infosys.lostAndFoundApplication.config.EncoderConfig;
import edu.infosys.lostAndFoundApplication.service.CampusUserService;

@RestController
@RequestMapping("/lost-found/")
@CrossOrigin(origins = "http://localhost:3939")
public class LoginController {
	@Autowired
	private CampusUserService service;

	@Autowired
	private EncoderConfig econfig;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/login")
	public void registerNewUser(@RequestBody CampusUser user) {
		PasswordEncoder bCrypt = econfig.passwordEcoder();
		String encodedPassword = bCrypt.encode(user.getPassword());
		user.setPassword(encodedPassword);
		service.save(user);
	}

	@GetMapping("/login/{userId}/{password}")
	public String validateUser(@PathVariable String userId, @PathVariable String password) {
		String role = "false";
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(userId, password));
			role = service.getRole();
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} catch (Exception ex) {
		}
		return role;
	}

	@GetMapping("/login")
	public CampusUser getUserDetails() {
		return service.getUser();
	}

	@GetMapping("/student")
	public List<CampusUser> getAllStudents() {
		return service.getAllStudents();
	}

	@DeleteMapping("/student/{username}")
	public void deleteStudentByUsername(@PathVariable String username) {
		service.deleteStudentByUsername(username);
	}
	
	@GetMapping("/student/count")
	public int getTotalStudent() {
		return service.getTotalStudents();
	}
}
