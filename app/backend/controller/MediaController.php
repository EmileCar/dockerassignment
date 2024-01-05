<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../model/MediaItem.php';
use Carbon\Carbon;

class MediaController extends Controller {
	
	public function getMediaItems() {
		print_r($_SESSION);
		if (empty($_SESSION["admin"])) {
			header("HTTP/1.0 401 Unauthorized");
			exit("Not authorized to perform this action.");
		}

		$mediaItems = MediaItem::get();
		echo json_encode($mediaItems);
	}

	public function getActiveMediaItems() {
		$mediaItems = MediaItem::where("active", 1)->get();
		echo json_encode($mediaItems);
	}

	public function addMediaItem() {
		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
			header('Access-Control-Allow-Methods: POST');
			header('Access-Control-Allow-Headers: Content-Type');
			header('Access-Control-Max-Age: 86400'); // 24 hours
			http_response_code(200);
			return;
		}
	
		if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
			header("HTTP/1.0 405 Method Not Allowed");
			exit("POST method is required for this endpoint.");
		} 
		else if (empty($_SESSION["admin"])) {
			header("HTTP/1.0 401 Unauthorized");
			exit("Not authorized to perform this action.");
		}

		$return = [];
		
		if(empty($_FILES["file"]["name"])){
			$return["error"] = "Er was geen bestand geupload";
			echo json_encode($return);
			return;
		}
	
		$target_dir = "../assets/media/hoogtepunten/";
		$target_file = $target_dir . basename($_FILES["file"]["name"]);
		$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
	
		if (file_exists($target_file)) {
			$return["error"] = "Deze bestandsnaam bestaat al";
			echo json_encode($return);
			return;
		}
	
		if ($_FILES["file"]["size"] > 2000000) {
			$return["error"] = "Bestand mag niet groter zijn dan 2MB";
			echo json_encode($return);
			return;
		}
	
		if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
			try{
				$mediaItem = new MediaItem();
				$data = json_decode($_POST["newMediaItem"], true);
				$mediaItem = $this->_checkEventProps($data, $mediaItem);
				$mediaItem->save();
				$return["success"] = "Het hoogtepunt is succesvol geupload";
			} catch (Exception $e){
				print_r($e);
				$return["error"] = "Er was een probleem met het opslaan van het hoogtepunt, de afbeelding is wel geupload";
			}
		} else {
			$return["error"] = "Er was een probleem met het uploaden van het bestand";
		}

		echo json_encode($return);
	}
	


	public function updateMediaItem() {
		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: PUT');
			header('Access-Control-Allow-Headers: Content-Type');
			header('Access-Control-Max-Age: 86400'); // 24 hours
			http_response_code(200);
			return;
		}

		if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
			header("HTTP/1.0 405 Method Not Allowed");
			exit("PUT method is required for this endpoint.");
		}
		//   else if (empty($_SESSION["admin"])){
		// 	header("HTTP/1.0 401 Unauthorized");
		// 	exit("Not authorized to perform this action.");
		// }

		$data = json_decode(file_get_contents('php://input'), true);
	
		if (!empty($data["id"])) {
			$mediaItem = MediaItem::find($data["id"]);
			if (empty($mediaItem)) {
				header("HTTP/1.0 500 Bad Request");
				exit("Media Item not found");
			}
	
			$mediaItem = $this->_checkEventProps($data, $mediaItem);
			$mediaItem->save();
			echo json_encode("Event updated");
			return;
		}
	
		echo json_encode("No id given");
		return;
	}

	public function getImagePaths (){
		$directory = '../assets/events';
		$filenames = [];
		
		if (is_dir($directory)) {
			if ($handle = opendir($directory)) {
				while (($file = readdir($handle)) !== false) {
					if ($file !== '.' && $file !== '..' && pathinfo($file, PATHINFO_EXTENSION) === 'jpg') {
						$filenames[] = $file;
					}
				}
				closedir($handle);
			}
		}
		
		echo json_encode($filenames);
	}

	public function deleteMediaItem() {
		// Handle CORS preflight checks
		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: DELETE');
			header('Access-Control-Allow-Headers: Content-Type');
			header('Access-Control-Max-Age: 86400'); // 24 hours
			http_response_code(200);
			return;
		}
	
		if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
			header("HTTP/1.0 405 Method Not Allowed");
			exit("DEL method is required for this endpoint.");
		} else if (empty($_SESSION["admin"])) {
			header("HTTP/1.0 401 Unauthorized");
			exit("Not authorized to perform this action.");
		}
	
		// Check if an 'id' parameter is provided in the URL
		if (!empty($_GET["id"])) {
			$event = Event::find($_GET["id"]);
			if (empty($event)) {
				echo json_encode("No event found");
				return;
			}
			$event->delete();
			echo json_encode("Event deleted");
			return;
		}
		echo json_encode("No id given");
		return;
	}

	

	private static function _checkEventProps($data, $mediaItem){
		if (!empty($data["name"])) {
			$mediaItem->name = $data["name"];
		}
		if (!empty($data["fileName"])) {
			$mediaItem->fileName = $data["fileName"];
		}
		if (!empty($data["date"])) {
			$mediaItem->date = $data["date"];
		}
		if (!empty($data["active"])) {
			$mediaItem->active = $data["active"];
		} else {
			$mediaItem->active = 0;
		}
		return $mediaItem;
	}
}

