package com.pablo.zapatillas.entity.services;
import java.util.List;
import java.util.Optional;

import com.pablo.zapatillas.entity.models.Zapatilla;


public interface IZapatillaService {
	List<Zapatilla> getAll();
	Optional<Zapatilla> getOne(long idZapatilla);
	void add(Zapatilla zapatilla);
	void delete (long idZapatilla);
	void put(Zapatilla zapatilla, long idZapatilla);
}
