<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../model/Admin.php';
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller {
	
  public function checkIsAdmin() {
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
			http_response_code(405);
			exit("POST method is required for this endpoint.");
		}

    // Assuming you are receiving JSON data in the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // You should implement the logic to validate the login in your Admin class
    // For the sake of this example, I'm assuming a method called "login" in Admin class
    $data = Admin::login($data["username"], $data["password"]);
    if (!empty($data["errors"])) {
        $data["success"] = false;
        echo json_encode($data);
        return;
    } else if (!empty($data["admin"])) {
        $data["success"] = true;
        $_SESSION["admin"] = $data["admin"];
        echo json_encode($data);
        return;
    }

    echo json_encode("Invalid credentials");
}

  public function adminSession() {
    if (!empty($_SESSION["admin"])) {
      $admin = Admin::where('id', $_SESSION["admin"])->first();
      $data["username"] = $admin->username;
      $data["success"] = true;
      echo json_encode($data);
      return;
    }
    echo json_encode("No session");
  }
  

  public function removeSession() {
    if(!empty($_SESSION["admin"])){
      unset($_SESSION["admin"]);
      echo json_encode("Session removed");
      return;
    }
    echo json_encode("No session");
  }
}