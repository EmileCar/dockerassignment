<?php

//allow all origins
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Credentials: true');

ini_set('display_errors', true);
error_reporting(E_ALL);

session_set_cookie_params([
    'samesite' => 'None',
    'secure' => true,
]);
session_start();

require_once "./vendor/autoload.php";
require_once "./bootstrap/database.php";

require_once "./bootstrap/router.php";

$controllerName = $route['controller'] . 'Controller';

require_once __DIR__ . '/controller/' . $controllerName . ".php";

$controllerObj = new $controllerName();
$controllerObj->route = $route;
$controllerObj->filter();