<?php
// set routes
$routes = array(
    'index' => array(
        'controller' => 'Activity',
        'action' => 'index'
    ),
    'getActivities' => array(
        'controller' => 'Activity',
        'action' => 'getActivities'
    ),
    'checkIsAdmin' => array(
        'controller' => 'Admin',
        'action' => 'checkIsAdmin'
    ),
    'adminSession' => array(
        'controller' => 'Admin',
        'action' => 'adminSession'
    ),
    'removeSession' => array(
        'controller' => 'Admin',
        'action' => 'removeSession'
    ),
    "addActivity" => array(
        "controller" => 'Activity',
        "action" => 'addActivity'
    ),
    "updateActivity" => array(
        "controller" => 'Activity',
        "action" => 'updateActivity'
    ),
    "getActivity" => array(
        "controller" => 'Activity',
        "action" => 'getActivity'
    ),
    "getImagePaths" => array(
        "controller" => 'Activity',
        "action" => 'getImagePaths'
    ),
    "deleteActivity" => array(
        "controller" => 'Activity',
        "action" => 'deleteActivity'
    ),
    "sendInschrijving" => array(
        "controller" => 'Inschrijving',
        "action" => 'sendInschrijving'
    ),
    "getInschrijvingen" => array(
        "controller" => 'Inschrijving',
        "action" => 'getInschrijvingen'
    ),
    "updateInschrijving" => array(
        "controller" => 'Inschrijving',
        "action" => 'updateInschrijving'
    ),
    "getMediaItems" => array(
        "controller" => 'Media',
        "action" => 'getMediaItems'
    ),
    "getActiveMediaItems" => array(
        "controller" => 'Media',
        "action" => 'getActiveMediaItems'
    ),
    "addMediaItem" => array(
        "controller" => 'Media',
        "action" => 'addMediaItem'
    ),
    "updateMediaItem" => array(
        "controller" => 'Media',
        "action" => 'updateMediaItem'
    ),
);

if (empty($_GET['page'])) {
    $_GET['page'] = 'index';
}
if (empty($routes[$_GET['page']])) {
    header('Location: index.php');
    exit();
}

$route = $routes[$_GET['page']];
