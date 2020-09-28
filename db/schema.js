const { gql } = require("apollo-server");

// Schema
const typeDefs = gql`

    type Bebida {
        id: ID
        nombre: String
        tipoAlcohol: TipoAlcoholBebida
        tipoServicio: String
        precio: Float
        descripcion: String
        disponible: Boolean
        imagen: String
    }

    type Orden {
        id: ID
        bebidas: [BebidaOrden]
        total: Float
        completada: Boolean
        proceso: Boolean
        cliente: String
        corte: Boolean
        creado: String
    }

    type BebidaOrden {
        bebida: ID
        tipoAlcohol: TipoAlcoholBebida
        tipoServicio: String
        cantidad: Int
        nombre: String
        precio: Float
        totalBebida: Float
    }

    type Corte {
        id: ID
        ordenes: [OrdenesCorte]
        creado: String
        total: Float
    }

    type OrdenesCorte {
        orden: ID
        bebidas: [BebidaOrden]
        total: Float
        completada: Boolean
        proceso: Boolean
        cliente: String
        corte: Boolean
        creado: String
    }

    input BebidaInput {
        nombre: String
        tipoAlcohol: TipoAlcoholBebida
        tipoServicio: String
        precio: Float
        descripcion: String
        disponible: Boolean
        imagen: String
    }

    input OrdenInput {
        bebidas: [OrdenBebidasInput]
        total: Float
        completada: Boolean
        proceso: Boolean
        cliente: String
        corte: Boolean
        creado: String
    }

    input OrdenBebidasInput {
        bebida: ID
        cantidad: Int
        nombre: String
        tipoAlcohol: TipoAlcoholBebida
        tipoServicio: String
        precio: Float
        totalBebida: Float
    }

    input CorteInput {
        creado: String
        ordenes: [CorteOrdenesInput]
    }

    input CorteOrdenesInput {
        orden: ID
        bebidas: [OrdenBebidasInput]
        total: Float
        completada: Boolean
        proceso: Boolean
        cliente: String
        corte: Boolean
        creado: String
    }


    enum TipoAlcoholBebida {
        tequila
        mezcal
        whisky
        brandy
        vodka
        ron
        licor
        cocktail
        cerveza
        clamato
        sinAlcohol
    }

    type Query {
        # bebidas
        obtenerBebidas: [Bebida]
        obtenerBebidasDisponibles: [Bebida]
        obtenerBebidasNoDisponibles: [Bebida]
        obtenerBebida(id: ID): Bebida

        # ordenes
        obtenerOrdenes: [Orden]
        obtenerOrdenesCompletadas: [Orden]
        obtenerOrdenesNoCompletadas: [Orden]
        obtenerOrden(id: ID): [Orden]

        # cortes
        obtenerCortes: [Corte]
        obtenerCorte(id: ID): Corte
    }

    type Mutation {
        # bebidas
        nuevaBebida(input: BebidaInput): Bebida
        actualizarBebida(input: BebidaInput, id: ID): Bebida
        eliminarBebida(id: ID): String

        # ordenes
        nuevaOrden(input: OrdenInput): Orden
        actualizarOrden(input: OrdenInput, id: ID): Orden
        actualizarOrdenCompletada(input: OrdenInput, id: ID): Orden
        eliminarOrden(id: ID): String

        # cortes
        nuevoCorte(input: CorteInput): Corte
    }
`;

module.exports = typeDefs;