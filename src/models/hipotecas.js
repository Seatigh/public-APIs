module.exports = (sequelize, DataType) => {

    const Hipotecas = sequelize.define('Hipotecas', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cliente: {
            type: DataType.STRING,
            allowNull: false,
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
        cuota: {
            type: DataType.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        importeTotal: {
            type: DataType.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    return Hipotecas;
}