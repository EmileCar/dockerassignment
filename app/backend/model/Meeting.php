<?php

use \Illuminate\Database\Eloquent\Model;

class Meeting extends Model {
  public $timestamps = false;

  public function activity(){
    return $this->hasMany(Activity::class);
  }
}
