<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/controllers/CosRestController.php';

class Courses extends CosRestController
{
  public function index_get()
  {
    // $this->load->database();
    // $this->response( $this->db->get('district')->result() );

    // $data = array('returned: '. $this->get('id'));
    // $this->response($data);

    $this->load->database();
    // $this->db->select('districtID, districtName');
    // $sql = $this->db->get_compiled_select( 'districts' );
    // $this->response( $sql );

    $this->db->select('branch AS name, branch AS value');
    $this->db->select('stream');
    $this->db->distinct();
    $this->db->order_by("branch", "asc");
    $this->db->where_not_in('branch', 'N/A');
    $this->response(array("data" => $this->db->get('cosCourses')->result()));
  }
  public function streams_get($stream, $district)
  {
    // $this->load->database();
    // $this->response( $this->db->get('district')->result() );

    // $data = array('returned: '. $this->get('id'));
    // $this->response($data);

    $this->load->database();
    $stream = urldecode($stream);
    $district = urldecode($district);
    // $this->db->select('districtID, districtName');
    // $sql = $this->db->get_compiled_select( 'districts' );
    // $this->response( $sql );

    $this->db->select('branch AS name, branch AS value');
    $this->db->select('stream');
    $this->db->distinct();
    $this->db->order_by("branch", "asc");
    $this->db->where("stream", $stream);
    $this->db->where("district", $district);
    $this->db->where_not_in('branch', 'N/A');
    $this->response(array("data" => $this->db->get('cosCourses')->result(), "stream" => $stream));
  }

}
?>
