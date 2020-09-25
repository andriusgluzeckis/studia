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
define( 'DB_NAME', 'u619007846_edUwV' );

/** MySQL database username */
define( 'DB_USER', 'u619007846_K2VqJ' );

/** MySQL database password */
define( 'DB_PASSWORD', 'uVnyd81O93' );

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
define( 'AUTH_KEY',          'Mr8pA?9R*h&#wYD44g6hq5I1%@a7j$.GXF=qjD6TF(x ,QKPrW}0O~6a),b1U=P ' );
define( 'SECURE_AUTH_KEY',   '6h<]*9f?`(H?~apQGwZ#ZCiPyEUzYwU.ujtf{!BLU0<3;ge>YWOX/N]A2NAms]D&' );
define( 'LOGGED_IN_KEY',     'OgiN7`c*aDMsUE.IoPr]_n6l5 @t`o3R,nK}Vw5, giv<3GJ7Hwdgb.=H^tv-I,I' );
define( 'NONCE_KEY',         '@*pa(0GmGustn:~,T}_tgWz@Yw(=r,lntF~@``G6~#B[jjr7hlMj9K!>Wx4ZUkEP' );
define( 'AUTH_SALT',         ' xmvk6zYoxG5)-Yvw?_7|xi?=FO_~Wi[UPF,uvUVI+#Uv~LmpviAjQ=N=um=#~>m' );
define( 'SECURE_AUTH_SALT',  '~o0O.^W:f{?bOZbaU.@8ap`K]`#KW4X,6k- cYsd7Po7YuIQx)NqC>p:I~KM,aK6' );
define( 'LOGGED_IN_SALT',    '=6YWZvz2$WrA/dJ,I*[5|H:E:Wq:y{}T.Ar?O9):fwnNLPY3;])_W&==)D@Z0Q4,' );
define( 'NONCE_SALT',        'dLax7L{F:]GN`-ntI$_EgyKrua}wqo.]KS0k(*sZfdc}O?oW3BKSwqd{wqop-#EY' );
define( 'WP_CACHE_KEY_SALT', 'i6L YJwna#]0sM:)^sMt6ks=6|N)/K$s|j;9b^=5` ({J+9S=g39Bub4g,5l?Jin' );

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
