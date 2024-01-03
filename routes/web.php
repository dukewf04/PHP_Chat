<?php

Route::get('/', 'RestrictedController@index')->middleware('auth');

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::post('/', 'HomeController@index')->name('home');