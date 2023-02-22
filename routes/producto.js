const { Router } = require('express');
const { check } = require('express-validator');
const { postProducto, putProducto, deleteProducto, getProductos, getProductoPorID } = require('../controllers/producto');
const { existeProductoPorId } = require('../helpers/db-validators');

//Controllers
// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

//Manejo de rutas

//Obtener todas las categorias - publico
router.get('/', getProductos);

router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], getProductoPorID);
    
// ],getCategorias)

//Obtener una categoria por su id - publico
// router.get('/:id', [
//     check('id', 'No es un ID válido').isMongoId(),
// ],
// getCategoriaPorID)

//Crear categoria si el usuario esta logeado - privada - token valido
router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postProducto);

// Actualizar categoria con token valido
router.put('/editar/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], putProducto)

//Eliminar - privado - solo admin puede eliminar
router.delete('/eliminar/:id',[
    validarJWT, 
    esAdminRole,
    //tieneRole('ADMIN_ROLE'),
    check('id', 'No es un id valido.').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],

deleteProducto)


module.exports = router;