<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/controllers/CosRestController.php';

class Colleges extends CosRestController
{
  public function search_get($id=0)
  {
    $this->load->database();

    if($id) {
      $this->db->select('cosColleges.name as collegeName');
      $this->db->select('cosColleges.id as collegeId');
      $this->db->select('cosColleges.address as address');
      $this->db->select('cosColleges.website as website');
      $this->db->select('cosColleges.email as email');
      $this->db->select('cosColleges.establish_year as esta_year');
      $this->db->select('cosColleges.facilities as facilities');
      $this->db->select('cosColleges.hostelBoysTotal as boysHostel');
      $this->db->select('cosColleges.hostelGirlsTotal as girlsHostel');
      $this->db->select('cosColleges.status1 as status1');
      $this->db->select('cosColleges.status2 as status2');
      $this->db->select('cosColleges.status3 as status3');
      $this->db->select('cosColleges.collegeinfo as collegeInfo');
      $this->db->select('cosColleges.district as district');


      // $this->db->select('CONCAT(cosColleges.taluka, '-', cosColleges.principalOfficePhone) as officePhone', false);
      $this->db->select('concat("0",cosColleges.std_code, "-", cosColleges.principalOfficePhone) as officePhone', false);

      $this->db->from('cosColleges');
      $this->db->where('id', $id);

      $collegequery = $this->db->get();

      $this->db->select('cosCourses.name as courseName');
      $this->db->select('cosCourses.id as choiceCode');
      $this->db->select('cosCourses.startYear as startyear');
      $this->db->select('cosCourses.intake as courseIntek');
      $this->db->from('cosCourses');
      $this->db->where('collegeId', $id);
      $coursequery = $this->db->get();

      $data = array("collegeResult"=> $collegequery->result(),"courseResult"=> $coursequery->result());

      $message = 'COS2016|College Detail Page|';
      $message .= 'id:' . $id;
      log_message('error', $message);
      $this->response(array("data" => $data, 'query'=>$this->db->last_query(), "id"=> $id));

    } else {
      $this->db->select('cosColleges.name as collegeName');
      $this->db->distinct('cosColleges.name');
      $this->db->select('cosColleges.id as collegeId');
      $this->db->select('cosColleges.address as address');
      $this->db->select('cosColleges.website as website');
      $this->db->select('cosColleges.email as email');
      $this->db->from('cosColleges');
      $this->db->join('cosCourses', 'cosCourses.collegeId = cosColleges.id', 'inner');
      $this->db->where('stream', $this->get('stream'));
      $this->db->where('cosColleges.district', $this->get('district'));
      $this->db->where('branch', $this->get('course'));

      $query = $this->db->get();

      $message = 'COS2016|College Search List Page|';
      $message .= 'stream:' . $this->get('stream');
      $message .= '|district:' . $this->get('district');
      $message .= '|course:' . $this->get('course');

      log_message('error', $message);
      $this->response(array("data" => $query->result(),
        "count" => 1000, 'query'=>$this->db->last_query()));

    }
  }

  public function cutoff_get($id=0)
  {
    $this->load->database();
    $tableName = "";

    if($this->get('stream') === "MCA" ){
      $tableName = "cosCutoff_2015_mca";
    } else if($this->get('stream') === "Management" ){
      $tableName = "cosCutoff_2015_mba";
    } else if($this->get('stream') === "Hotel Management" ){
      $tableName = "cosCutoff_2015_hotel_mgmt";
    } else if($this->get('stream') === "Polytechnic" ){
      $tableName = "cosCutoff_2015_poly";
    } else if($this->get('stream') === "Engineering" ){
      $tableName = "cosCutoff_2015_eng";
    }

    if($this->get('criteria') == 'PH' || $this->get('criteria') == 'PO'){
      $this->db->select("CONCAT(cosCourses.name, ' - ', seatType)  as courseName");
    } else {
      $this->db->select('cosCourses.name as courseName');
    }
    $this->db->select('cosCourses.type as courseType');



    if( $this->get('criteria') === "AI" && $this->get('stream') === "Engineering") {
      $this->db->select('"N/A" as percentage');
      $this->db->select('CONCAT(meritNo, " (", indiaRank, ")") as merit');
    } else {
      $this->db->select('percentage');
      $this->db->select('meritNo as merit');
    }

    $this->db->select('courseId as code');
    $this->db->select('round');
    $this->db->from('cosColleges');
    $this->db->join('cosCourses', 'cosCourses.collegeId = cosColleges.id', 'inner');
    $this->db->join($tableName, 'cosCourses.id = courseId', 'inner');
    // $this->db->where('cosColleges.district', 'Jalgaon');
    // $this->db->where('cosColleges.id', 5008);
    // $this->db->where('seatType', 'NLSCO');

    $this->db->where('cosColleges.district', $this->get('district'));
    $this->db->where('cosColleges.id', $this->get('collegeId'));
    if($this->get('criteria') == 'PH'){
      $this->db->like('seatType', 'PH', 'after');
      $this->db->like('seatType', 'H', 'before');
    } else if($this->get('criteria') == 'PO'){
      $this->db->like('seatType', 'PH', 'after');
      $this->db->like('seatType', 'O', 'before');
    } else {
      $this->db->where('seatType', $this->get('criteria'));
    }

    $query = $this->db->get();

    $this->response(array("data" => $query->result(), 'query'=>$this->db->last_query()));

  }

  public function dsecutoff_get($id=0) {
    
    $this->load->database();
    $tableName = "cosCutoff_2015_dse";

    if($this->get('criteria') == 'P' || $this->get('criteria') == 'D' || $this->get('criteria') == 'C'){
      $this->db->select("CONCAT(cosCourses.name, ' - ', seatType)  as courseName");
    } else {
      $this->db->select('cosCourses.name as courseName');
    }
    $this->db->select('cosCourses.type as courseType');
    $this->db->select('seatType');
    $this->db->select('percentage');
    $this->db->select('meritNo as merit');


    $this->db->select('courseId as code');
    $this->db->select('round');
    $this->db->select('groupName');

    $this->db->from('cosColleges');
    $this->db->join('cosCourses', 'cosCourses.collegeId = cosColleges.id', 'inner');
    $this->db->join($tableName, 'cosCourses.id = courseId', 'inner');

    $this->db->where('cosColleges.district', $this->get('district'));
    $this->db->where('cosColleges.id', $this->get('collegeId'));
    if($this->get('criteria') == 'P' || $this->get('criteria') == 'D' || $this->get('criteria') == 'C'){
      $this->db->like('seatType', $this->get('criteria'), 'after');
    } else {
      $this->db->where('seatType', $this->get('criteria'));
    }
    $query = $this->db->get();
    $this->response(array("data" => $query->result(), 'query'=>$this->db->last_query()));

  }
}
?>
