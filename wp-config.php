<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u619007846_SEORM' );

/** MySQL database username */
define( 'DB_USER', 'u619007846_62XzE' );

/** MySQL database password */
define( 'DB_PASSWORD', 'gTFL5lDq8l' );

/** MySQL hostname */
define( 'DB_HOST', 'mysql' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '?R5X|F4PE=u]47fw-{cra7FKg&e7;rUEu-1ZqjMDGN%b[cAA@%Mh<S-zB8s@Zy-$' );
define( 'SECURE_AUTH_KEY',   '33UtV$m(g;%I4`mzl&mRN} g-MS`8cz=<]MuBEcEAfHgC8JM>qF *x*mgUE>/Ky/' );
define( 'LOGGED_IN_KEY',     'j-MnLMt$A{K<^R9=1NI[3pBAz3gN|#)ZavQe4-iie7VFWf_[ei(n4e*-f,4-gbQu' );
define( 'NONCE_KEY',         '8Qtvvl#H?xUg?7/kXiHbo&1%}hKK44G$J<,6cV!3d&KfKy:eJART6@QXF-:m508V' );
define( 'AUTH_SALT',         'kGD&4R+|)4ae[PP26cmeDm&n5bOpy=){+YF95u[Cb}woT[6l1EX&t+~M$GsMq}vk' );
define( 'SECURE_AUTH_SALT',  'WAk`o.H{G/HK9Y=9a5:Utj(jF;Nn.~9 *E&@TyR<PfZisXE.z-~!c:TV>7O1S8Ls' );
define( 'LOGGED_IN_SALT',    'G0`BBVG%kSC+i!)[m.5AV8hvsM$gi6o3q8XFpMG)~P:v%aDA1qS]r9>@Oj4|kY6A' );
define( 'NONCE_SALT',        '|>`w%@y[wc&rq4IbES:Vr/1Dam]/OiBRIS*?QZE18YEsoE`ITV?aQ^LldpeuK2f*' );
define( 'WP_CACHE_KEY_SALT', ']H$({Muh:t_u4Hk6a|f 5M/iw1Sj+acjZ44K.Z&d$La0VSe$w,z~k.*m#y4H.y3m' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
