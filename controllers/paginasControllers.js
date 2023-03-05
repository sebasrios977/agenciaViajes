import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

export const paginaInicio = async (req, res) => {
    // Consultar tres viajes del modelo viajes
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3}));
    promiseDB.push(Testimonial.findAll({ limit: 3}));

    try {
        const resultado = await Promise.all( promiseDB );

        res.render('inicio' , {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1],
        });

    } catch (error) {
        console.log(error);
    }
}

export const paginaNosotros = (req, res) => {
    res.render('nosotros' , {
        pagina: 'Nosotros',
    });
}

export const paginaViajes = async (req, res) => {

    // Consultar base de datos
    const viajes = await Viaje.findAll();

    res.render('viajes' , {
        pagina: 'Proximos Viajes',
        viajes,
    });
}

export const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales' , {
            pagina: 'Testimoniales',
            testimoniales,
        });
    } catch (error) {
        console.log(error);
    }
}

// Muestra un viaje por su Slug
export const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne( { where: { slug } } );

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje,
        })
    } catch (error) {
        console.log(error);
    }
}
