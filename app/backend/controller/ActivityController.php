<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../model/Group.php';
require_once __DIR__ . '/../model/Event.php';
use Carbon\Carbon;

class ActivityController extends Controller {
	
	public function getActivities() {
		$events = Event::query();
		$events->whereDate("timestamp", '>' , Carbon::now());
		$events->orderBy("bigEvent", "desc");
		$events->orderBy("timestamp", "asc");
		$events->limit(3);
		$events = $events->get();

		echo json_encode($events);
	}
	
	public function index(){
	    echo "KSA Oosterzele API index";
	    return;
	}

	public function addActivity(){
		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: POST');
			header('Access-Control-Allow-Headers: Content-Type');
			header('Access-Control-Max-Age: 86400'); // 24 hours
			http_response_code(200);
			return;
		}

		if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
			header("HTTP/1.0 405 Method Not Allowed");
			exit("POST method is required for this endpoint.");
		} else if (empty($_SESSION["admin"])){
			header("HTTP/1.0 401 Unauthorized");
			exit("Not authorized to perform this action.");
		}
	
		$event = new Event();
		$data = json_decode(file_get_contents('php://input'), true);
		$event = $this->_checkEventProps($data, $event);
		$event->save();
		
		echo json_encode("Event added");
		return;
	}	

	public function updateActivity() {
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
		}  else if (empty($_SESSION["admin"])){
			header("HTTP/1.0 401 Unauthorized");
			exit("Not authorized to perform this action.");
		}

		$data = json_decode(file_get_contents('php://input'), true);
	
		if (!empty($data["id"])) {
			$event = Event::find($data["id"]);
			if (empty($event)) {
				header("HTTP/1.0 500 Bad Request");
				exit("Activity not found");
			}
	
			$event = $this->_checkEventProps($data, $event);
	
			$event->save();
			echo json_encode("Event updated");
			return;
		}
	
		echo json_encode("No id given");
		return;
	}
	

	public function getActivity(){
		$data["errors"] = [];
		if(!empty($_GET["id"])){
			$event = Event::find($_GET["id"]);
			if(empty($event)){
				$data["errors"] = "No event found";
				echo json_encode($data);
				return;
			}
			$data["event"] = $event;
		} else {
			$data["errors"] = "No id given";
		}
		echo json_encode($data);
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

	public function deleteActivity() {
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

	

	private static function _checkEventProps($data, $event){
		if (!empty($data["name"])) {
			$event->name = $data["name"];
		}
		if (!empty($data["date"])) {
			$event->date = $data["date"];
		}
		if (!empty($data["time"])) {
			$event->time = $data["time"];
		}
		if (!empty($data["location"])) {
			$event->location = $data["location"];
		}
		if (!empty($data["description"])) {
			$event->description = $data["description"];
		}
		if (!empty($data["timestamp"])) {
			$event->timestamp = $data["timestamp"];
		}
		if (!empty($data["bigEvent"])) {
			$event->bigEvent = $data["bigEvent"];
		}
		if (!empty($data["imgpath"])) {
			$event->imgpath = $data["imgpath"];
		}
		if (!empty($data["url"])) {
			$event->url = $data["url"];
		}
		return $event;
	}
}