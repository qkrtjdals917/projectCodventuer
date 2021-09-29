package com.lec.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller	
@RequestMapping("/modacon/admin")
public class AdminController {
	
	@RequestMapping({"", "/"})
	public String adminMain() {
		
		return "admin/main";
	}

}