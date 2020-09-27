const Bebida = require('../models/Bebida');
const Corte = require('../models/Corte');
const Orden = require('../models/Orden');

const resolvers = {
    Query: {
        // Bebidas
        obtenerBebidas: async () => {
            try {
                const bebidas = await Bebida.find();
                return bebidas;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        obtenerBebidasDisponibles: async () => {
            try {
                const bebidas = await Bebida.find({ disponible: true });
                return bebidas;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        obtenerBebidasNoDisponibles: async () => {
            try {
                const bebidas = await Bebida.find({ disponible: false });
                return bebidas;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        obtenerBebida: async (_, { id }) => {
            try {
                const bebida = await Bebida.findById(id);
                if (!bebida) {
                    throw new Error('Esa bebida no existe');
                }
                return bebida;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        // ordenes
        obtenerOrdenes: async () => {
            try {
                const ordenes = await Orden.find();
                return ordenes
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        obtenerOrdenesCompletadas: async () => {
            try {
                const ordenes = await Orden.find({ completada: true });
                return ordenes
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        obtenerOrdenesNoCompletadas: async () => {
            try {
                const ordenes = await Orden.find({ completada: false });
                return ordenes
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        obtenerOrden: async (_, { id }) => {
            try {
                const orden = await Orden.findById(id);
                if (!orden) {
                    throw new Error('La orden no existe');
                }

                return orden;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        // cortes
        obtenerCortes: async () => {
            try {
                const cortes = await Corte.find();
                return cortes;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
    },
    Mutation: {
        // bebidas
        nuevaBebida: async (_, { input }) => {
            console.log(input);
            try {
                const bebida = new Bebida(input);
                await bebida.save();
                return bebida;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        actualizarBebida: async (_, { input, id }) => {
            try {
                let bebida = await Bebida.findById(id);
                if (!bebida) {
                    throw new Error('Esa bebida no existe');
                }
                bebida = await Bebida.findByIdAndUpdate(id, input, { new: true });
                return bebida;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        eliminarBebida: async (_, { id }) => {
            try {
                let bebida = await Bebida.findById(id);
                if (!bebida) {
                    throw new Error('Esa bebida no existe');
                }
                bebida = await Bebida.findByIdAndDelete(id);
                return `La bebida ${bebida.nombre} fue eliminada correctamente`;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        // ordenes
        nuevaOrden: async (_, { input }) => {
            try {
                const orden = new Orden(input);
                await orden.save();
                return orden;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        actualizarOrden: async (_, { input, id }) => {
            try {
                let orden = await Orden.findById(id);
                if (!orden) {
                    throw new Error('No existe esta orden');
                }

                if (orden.proceso) {
                    throw new Error('La orden ya esta en proceso, por lo tanto no se puede modificar');
                }

                if (orden.completada) {
                    throw new Error('La orden ya fue completada, por lo tanto no se puede modificar');
                }

                orden = await Orden.findByIdAndUpdate(id, input, { new: true });
                return orden;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        actualizarOrdenCompletada: async (_, { input, id }) => {
            try {
                let orden = await Orden.findById(id);
                if (!orden) {
                    throw new Error('No existe esta orden');
                }

                if (!orden.proceso) {
                    throw new Error('La orden aún no esta en proceso, por lo tanto no se puede completar');
                }

                orden = await Orden.findByIdAndUpdate(id, input, { new: true });
                return orden;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        eliminarOrden: async (_, { id }) => {
            try {
                let orden = await Orden.findById(id);
                if (!orden) {
                    throw new Error('No existe esta orden');
                }

                if (orden.completada) {
                    throw new Error('La orden ya fue completada, por lo tanto no se puede eliminar');
                }

                orden = await Orden.findByIdAndDelete(id);
                return `La orden del cliente ${orden.cliente} fue eliminada correctamente`;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        // cortes
        nuevoCorte: async () => {
            try {
                let nuevoCorte = {}
                let total = 0;

                const ordenes = await Orden.find({ completada: true, proceso: true, corte: false });

                ordenes.map(async orden => {
                    total = parseFloat(orden.total) + parseFloat(total);
                    await Orden.findByIdAndUpdate(orden.id, { corte: true });
                });

                nuevoCorte.total = parseFloat(total);
                nuevoCorte.ordenes = ordenes;

                const corte = new Corte(nuevoCorte);
                await corte.save();
                return corte
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
    }
}

module.exports = resolvers;