module.exports = (sequelize, DataType) => {

    // Modelo Cliente con campos (dni, nombre, email y capitalSolicitado)
    // Se indican las restricciones de cara a la construcción de la tabla en la bbdd
    const Clientes = sequelize.define('Clientes', {
        dni: {
            type: DataType.STRING,
            primaryKey: true,
            validate: {
                len: 9,

                isDNI(value) {
                    const tablaLetras = 'TRWAGMYFPDXBNJZSQVHLCKE';
                    if (value.charAt(8) != tablaLetras.charAt(parseInt(value.substring(0,8)) % 23)) {
                        throw new Error('El DNI no es correcto.');
                    }
                }
            }
        },
        nombre: {
            type: DataType.STRING,
            allowNul: false,
            validate: {
                notEmpty: true,
                isAlpha: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        capitalSolicitado: {
            type: DataType.INTEGER,
            allowNul: false,
            validate: {
                notEmpty: true,
                min: 10000,
                max: 1000000,
            }
        }
    });

    Clientes.associate = (models) => {
        Clientes.hasMany(models.Hipotecas, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    };

    return Clientes;
};