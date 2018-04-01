<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link www.freshttheme.com
 * @package Fresh Theme
 */

?><!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php if(is_home()) bloginfo('name'); else wp_title(''); ?></title>
<!--         <title>Fresh theme</title> -->
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="<?php bloginfo( 'template_url' ); ?>/favicon.ico" type="image/x-icon"/>

        <script type="text/javascript">
            var templateUrl = '<?= get_bloginfo("template_url"); ?>';
            // var localized = {"partials":"http:\/\/localhost\/wp_api\/wp-content\/themes\/fresh_theme\/partials\/"};
        </script>

        <base href="<?php $url_info = parse_url( home_url() ); echo trailingslashit( $url_info['path'] ); ?>">

        <?php wp_head(); ?>

    </head>

    <body <?php body_class(); ?>>

        <main ng-app="wp">
