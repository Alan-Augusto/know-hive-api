/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {

    pgm.createTable("users", {
        id: { type: "uuid", default: pgm.func("gen_random_uuid()"), primaryKey: true },
        name: { type: "varchar(100)", notNull: true },
        email: { type: "varchar(100)", notNull: true, unique: true },
        password: { type: "text", notNull: true },
        profile_picture_url: { type: "varchar(255)", default: null }, // URL para foto de perfil
        created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable("users");
};
