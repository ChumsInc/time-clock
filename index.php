<?php


/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

require_once ("autoload.inc.php");
require_once ('access.inc.php');

$bodyPath = "/apps/time-clock";
$title = "Chums Time Clock";
$description = "";

$ui = new WebUI($bodyPath, $title, $description, false, 5);
$ui->version = "2020.10.09";
$ui->bodyClassName = 'container';
$ui->AddCSS("public/main.css", true);
$ui->addManifest('public/js/manifest.json');
//$ui->AddJS("public/js/manifest.d41d8cd98f00b204e980.js");
//$ui->addChunkManifest('public/js/chunk-manifest.json');
/**
 * Changelog:
 */

$ui->RequireLogin(false);

$ui->Send();
