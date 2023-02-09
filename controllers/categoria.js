const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Categoria = require('../models/categoria');

const getCategoria = async(req = request, res = response) => {
    const query = {estado: true}

    const listaCategorias = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ])

    res.json({
        msg: 'get Api - Controlador Categoria',
        listaCategorias
    })
}

const postCategoria = async(req = request, res = response) => {
    const { nombre, descripcion} = req.body;
    const categoriaGuardada = new Categoria({ nombre, descripcion });

    await categoriaGuardada.save();

    res.json({
        msg: 'get Api - categoria (POST)',
        categoriaGuardada
    })
}

const putCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, img, ... resto } = req.body;
    const categoriaEditar = await Categoria.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'PUT editar user',
        id,
        categoriaEditar
    })
}

const deleteCategoria = async(req = request, res = response) => {
    const { id } = req.params
    const categoriaEliminada = await Categoria.findByIdAndDelete(id)

    res.json({
        msg: 'get Api - Controlador Categoria (DELETE)',
        categoriaEliminada
    })
}

module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}