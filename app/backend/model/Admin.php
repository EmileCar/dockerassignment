<?php

use \Illuminate\Database\Eloquent\Model;

class Admin extends Model {
  public $timestamps = false;

  public static function login($username, $password) {
    $data = [];

    if (empty($username)) {
        $data['errors']['username'] = 'A username is required';
    }

    if (empty($password)) {
        $data['errors']['password'] = 'A password is required';
    }

    if (!empty($data['errors'])) {
        return $data;
    }

    $admin = Admin::where('username', $username)->where('password', $password)->first();

    if (empty($admin)) {
        $data['errors']['admin'] = 'Invalid credentials';
        return $data;
    }

    $data['admin'] = $admin->id;

    return $data;
  }

}
