<?php

use \Illuminate\Database\Eloquent\Model;

class Group extends Model {
  public $timestamps = false;

  public function activity(){
    return $this->belongsTo(Activity::class);
  }
 
}
