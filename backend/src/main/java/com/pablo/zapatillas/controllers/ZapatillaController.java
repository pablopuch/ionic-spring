package com.pablo.zapatillas.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pablo.zapatillas.entity.models.Zapatilla;
import com.pablo.zapatillas.entity.services.IZapatillaService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin (origins = "http://localhost:8100")
@RestController
public class ZapatillaController {
	
	@Autowired
	IZapatillaService zapatillaService;
	
	@GetMapping("/zapatillas")
	public List<Zapatilla> getAll(){
		return zapatillaService.getAll();
	}
	

	@GetMapping("/zapatillas/{id}")
	Zapatilla getOne(@PathVariable("id") long id) {
		Optional<Zapatilla> b = zapatillaService.getOne(id);
		
		if(b.isPresent()) {
			return b.get();
		};
		
		return null;
	}
	
	@PostMapping("/zapatillas")
	void add(Zapatilla zapatilla) {
		System.out.println(zapatilla.getMarca());
		zapatillaService.add(zapatilla);
	}
	
	@PostMapping(value="/zapatillas", consumes="application/json")
	void addUsingJson(@RequestBody String zapatillaString) {
		ObjectMapper om = new ObjectMapper();
		try {
			Zapatilla zapatilla = om.readValue(zapatillaString, Zapatilla.class);
			zapatillaService.add(zapatilla);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	
	
	@PutMapping("/zapatillas/{id}")
	void put(Zapatilla zapatilla, @PathVariable("id") long id) {
		System.out.println(zapatilla.getMarca());
		zapatillaService.put(zapatilla, id);
		
	}
	
	
	
	
	
	@DeleteMapping("/zapatillas/{id}")
	void delete(@PathVariable("id") long id) {
		zapatillaService.delete(id);
	}
	
	
}
