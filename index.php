<?php
/**
 * The main template file.
 * Template Name: Index/Homepage
 * Description: Index/Homepage
 * @package Fresh Theme
 */

get_header(); ?>

	<h1>menu</h1>
	<div ng-controller="Menu">

		<div ng-repeat="item in menu">
		    <a href="{{ item.url }}">
		        {{ item.title }}
		    </a> | 
		</div>

	</div>

	<h1>content</h1>
	<div ng-view></div>

<?php
get_footer();