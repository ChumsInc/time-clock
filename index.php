<?php


use chums\ui\WebUI2;
require_once 'autoload.inc.php';

$ui = new WebUI2([
    'title' => 'Chums Time Clock',
    'bodyClassName' => 'container',
    'contentFile' => 'body.inc.php',
    'requiredRoles' => [],
    'requireLogin'  => false,
]);
$ui->addManifestJSON('public/js/manifest.json')
    ->render();
