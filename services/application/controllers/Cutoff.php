<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/controllers/CosRestController.php';

class Cutoff extends CosRestController
{

  public function parsePolyData( $data, $query ) {
      $seattype = array();
      $gender = array();
      $category = array();

      $key = "";
      $val = "";

      foreach ($data as &$value) {
          // SEATTYPE
          if(strpos( $value->seatInfo, 'APA')){
          } else if(strpos( $value->seatInfo, 'APM')){
          } else if(strpos( $value->seatInfo, 'DEF' )){
            array_push($seattype, 'NDEF');
          } else if(strpos( $value->seatInfo, 'PH' )) {
            array_push($seattype, 'PH');
          } else {

            array_push($seattype, $value->seatInfo[0]);
          }

          // Gender
          if(strpos( $value->seatInfo, 'APA' )){
          } else if(strpos( $value->seatInfo, 'APM')){
          } else if(strpos( $value->seatInfo, 'DEF' )){
          } else if(strpos( $value->seatInfo, 'PH' )) {
          } else {
            array_push($gender, $value->seatInfo[1]);
          }

          // Category

          if(strpos( $value->seatInfo, 'APA' )){
          } else if(strpos( $value->seatInfo, 'APM')){
          } else if(strpos( $value->seatInfo, 'DEF' )){
          } else if(strpos( $value->seatInfo, 'PH' )) {
          } else {
            array_push($category, substr($value->seatInfo, 2, strlen($value->seatInfo)-3));
          }
        }
      $seattype = array_values(array_unique($seattype));
      $newSeatType = array();
      foreach ($seattype as &$d) {
        $val = "";
        $label = "";
        if( $d == "N" ) {
          $val = "N";
          $label = "Non Technical";
        }
        if( $d == "T" ) {
          $val = "T";
          $label = "Technical";
        }
        if( $d == "NDEF" ) {
          $val = "NDEF";
          $label = "Defence";
        }
        if( $d == "PH" ) {
          $val = "PH";
          $label = "Physically Handicapped";
        }
        if( $d == "M" ) {
          $val = "M";
          $label = "Minority";
        }
        $obj = (object) array('val' => $val, 'label'=>$label);
        array_push($newSeatType, $obj);
      }

      $gender = array_values(array_unique($gender));

      $newGender = array();
      foreach ($gender as &$d) {
        $val = "";
        $label = "";
        if( $d == "G" ) {
          $val = "G";
          $label = "Male";
        }
        if( $d == "L" ) {
          $val = "L";
          $label = "Female";
        }
        $obj = (object) array('val' => $val, 'label'=>$label);
        array_push($newGender, $obj);
      }

      $category = array_values(array_unique($category));

      $newCategories = array();
      foreach ($category as &$d) {
        $val = "";
        $label = "";

        if( $d == "C" ) {
          $val = "C";
          $label = "C";
        } else if( $d == "P" ) {
          $val = "P";
          $label = "Parasi";
        } else if( $d == "M" ) {
          $val = "M";
          $label = "Muslim";
        } else if( $d == "S" ) {
          $val = "S";
          $label = "Sikh";
        } else if( $d == "B" ) {
          $val = "B";
          $label = "Buddha";
        } else if( $d == "J" ) {
          $val = "J";
          $label = "Jain";
        } else {
          $val = $d;
          $label = $d;
        }
        $obj = (object) array('val' => $val, 'label'=>$label);
        array_push($newCategories, $obj);
      }

      $this->response(array("data"=>array("seatType" => $newSeatType,
                              "gender" => $newGender,
                              "category" => $newCategories,
                              "query" => $query)));
  }

  public function index_get($id=0)
  {
    $this->load->database();
    // $this->db->select('seattype AS seatInfo');
    // $this->db->distinct();
    // $this->db->from('cosColleges');
    // $this->db->join('cosCourses', 'cosCourses.collegeId = cosColleges.id', 'inner');
    // $this->db->join('cosCutoff_2015_poly', 'cosCourses.id = cosCutoff_2015_poly.courseId', 'inner');

    // $this->db->where('cosCourses.stream', $this->get('stream'));
    // $this->db->where('cosColleges.district', $this->get('district'));
    // $this->db->where('branch', $this->get('course'));
    // $this->db->where('cosColleges.id', $this->get('id'));

    // $this->db->where('cosCourses.stream', 'Polytechnic');
    // $this->db->where('cosColleges.district', 'Jalgaon');
    // $this->db->where('branch', 'Post S.S.C. Diploma in Engineering (Polytechnics)');
    // $this->db->where('cosColleges.id', 5008);

    // $query = $this->db->get();
    // $this->parsePolyData( $query->result(), $this->db->last_query() );

    if($this->get('stream') === "MCA" ){
      $tableName = "cosCutoff_2015_mca";
    } else if($this->get('stream') === "Management" ){
      $tableName = "cosCutoff_2015_mba";
    } else if($this->get('stream') === "Hotel Management" ){
      $tableName = "cosCutoff_2015_hotel_mgmt";
    } else if($this->get('stream') === "Engineering" ){
      $tableName = "cosCutoff_2015_eng";
    } else if($this->get('stream') === "Polytechnic" ){
      $tableName = "cosCutoff_2015_poly";
    }

    $query= "SELECT distinct seatType as csSeatType, CASE LEFT(seatType , 1)
                when 'N' THEN 'Non Technical'
                when 'T' THEN 'Technical'
                when 'M' THEN 'Minority'
                when 'P' THEN 'Physically Handicaped'
                when 'D' THEN 'Defence'
                when 'G' THEN 'General'
                when 'L' THEN 'Ladies'
                when 'O' THEN 'OMS'
                when 'A' THEN 'AI'
                when 'C' THEN 'Minority'
              else 'ZZZ'
              end As 'Label'";

    if($this->get('stream') === "MCA" || $this->get('stream') === "Management" || $this->get('stream') === "Hotel Management" || $this->get('stream') === "Engineering" ){
      $query.= ", CONCAT(LEFT(seatType , 1), '@', SUBSTRING(seatType , 2)) as 'csSeatType' ";
    }

    $query.="FROM cosColleges INNER JOIN cosCourses
      ON cosCourses.collegeId = cosColleges.id
      INNER JOIN $tableName
      ON cosCourses.id = courseId ";

    $query .= "WHERE cosCourses.stream='".$this->get('stream')."' ";
    $query .= "AND cosColleges.district='".$this->get('district')."' ";
    $query .= "AND branch='".$this->get('course')."' ";
    if($this->get('id')) {
        $query .= "AND cosColleges.id = ".$this->get('id');    
    }
    $res = $this->db->query($query);

    $this->response(array("data"=> $res->result(),
      "query" => $query));
  }

  public function dse_get($id=0)
  {
    $this->load->database();
    $tableName = 'cosCutoff_2015_dse';

    $query= "SELECT distinct seatType as csSeatType, CASE LEFT(seatType , 1)
                    when 'P' THEN 'Physically Handicaped'
                    when 'D' THEN 'Defence'
                    when 'G' THEN 'General'
                    when 'L' THEN 'Ladies'
                    when 'C' THEN 'Minority'
                  else 'ZZZ'
                  end As 'Label'";
    $query.="FROM cosColleges INNER JOIN cosCourses
      ON cosCourses.collegeId = cosColleges.id
      INNER JOIN $tableName
      ON cosCourses.id = courseId ";

    $query .= "WHERE cosCourses.stream='".$this->get('stream')."' ";
    $query .= "AND cosColleges.district='".$this->get('district')."' ";
    $query .= "AND branch='".$this->get('course')."' ";
    $query .= "AND cosColleges.id = ".$this->get('id');

    $res = $this->db->query($query);

    $this->response(array("data"=> $res->result(),
      "query" => $query));
  }
  
  
  public function percentage_get($percentage=0)
  {
    $percentage = $this->get('percent');
    $lowerPercentage = $percentage - 5;
    $upperPercentage = $percentage + 5;
    $result = $this->fetchPercentageResult($lowerPercentage, $upperPercentage);
    if($result) {
        $this->response(array("data" => $result, 'query'=>$this->db->last_query()));    
    } else {
        $lowerPercentage = $percentage - 10;
        $upperPercentage = $percentage + 10;
        $result = $this->fetchPercentageResult($lowerPercentage, $upperPercentage);
        
            if($result) {
                $this->response(array("data" => $result, 'query'=>$this->db->last_query(), 'msg'=> 'We didn\'t find result in +5 and -5 range. Below is the result for +10 and -10'));    
            } else {
                $lowerPercentage = $percentage - 15;
                $upperPercentage = $percentage + 15;
                $result = $this->fetchPercentageResult($lowerPercentage, $upperPercentage);
                if($result) {
                    $this->response(array("data" => $result, 'query'=>$this->db->last_query(), 'msg'=> 'We didn\'t find result in +5/-5 or +10/-10 range. Below is the result for +15 and -15'));    
                } else {
                    $this->response(array("data" => $result, 'query'=>$this->db->last_query(), 'msg'=> 'We didn\'t find result in +5/-5 or +10/-10, +15/-15 range. Please try again with some different percentage'));
                }
                
            } 

    }
    
  }
  
  public function fetchPercentageResult($lowerPercentage, $upperPercentage) {
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
    $this->db->select('cosColleges.name as collegeName');



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
    $this->db->where('percentage > ', $lowerPercentage);
    $this->db->where('percentage < ', $upperPercentage);
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
    
    return $query->result();
    // $this->response(array("data" => $query->result(), 'query'=>$this->db->last_query()));
  }
}
?>
