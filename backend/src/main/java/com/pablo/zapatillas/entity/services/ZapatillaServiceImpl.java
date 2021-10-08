package com.pablo.zapatillas.entity.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pablo.zapatillas.entity.dao.IZapatillaDao;
import com.pablo.zapatillas.entity.models.Zapatilla;

@Service
public class ZapatillaServiceImpl implements IZapatillaService {
	
	@Autowired
	IZapatillaDao zapatillaDao;

	@Override
	public List<Zapatilla> getAll() {
		return (List<Zapatilla>) zapatillaDao.findAll();
	}

	@Override
	public void add(Zapatilla zapatilla) {
		zapatillaDao.save(zapatilla);
	}

	@Override
	public void delete(long idZapatilla) {
		zapatillaDao.deleteById(idZapatilla);
	}

	@Override
	public void put(Zapatilla zapatilla, long idZapatilla) {
		zapatillaDao.findById(idZapatilla).ifPresent((x)->{
			zapatilla.setId(idZapatilla);
			zapatillaDao.save(zapatilla);
		});
	}
	
	@Override
	public Optional<Zapatilla> getOne(long idZapatilla) {
		return zapatillaDao.findById(idZapatilla);
	}

}
