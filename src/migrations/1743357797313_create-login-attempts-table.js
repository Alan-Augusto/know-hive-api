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
    pgm.createTable("login_attempts", {
        id: { type: "uuid", primaryKey: true, default: pgm.func("gen_random_uuid()") },
        user_id: { type: "uuid", notNull: false, references: "users(id)", onDelete: "SET NULL" },
        email: { type: "varchar(100)", notNull: true },
        success: { type: "boolean", notNull: true },
        ip_address: { type: "varchar(45)" },
        user_agent: { type: "text" },
        attempted_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable("login_attempts");
};
