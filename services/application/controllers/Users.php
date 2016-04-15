<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/controllers/CosRestController.php';

class Users extends CosRestController
{
  public function index_get()
  {
    $this->load->database();
    $this->db->select('csId AS id');
    $this->db->select('csFirstName AS firstName');
    $this->db->select('csLastName AS lastName');
    $this->db->select('csPhone AS phone');
    $this->db->select('csGender AS gender');
    $this->db->select('csDistrict AS district');
    $this->db->select('csAboutMe AS aboutMe');
    $this->response(array("data" => $this->db->get('cosUsers')->result()));
  }

  public function index_post()
  {
    try {
      // $fName = $this->input->post("firstName");
      // $fName = $_POST["firstName"];
      // $this->load->library('encrypt');

      $tempOtp = rand(pow(10, 3), pow(10, 4)-1);
      $user = array(
        'csFirstName' => $this->post('firstName'),
        'csLastName' => $this->post('lastName'),
        'csPhone' => $this->post('phone'),
        'csGender' => $this->post('gender'),
        'csDistrict' => $this->post('district'),
        'csAboutMe' => $this->post('aboutMe'),
        'csEmail' => $this->post('email'),
        'isBlock' => 0, //Disabling OTP
        'csOtp'=> $tempOtp,
        'csPassword' => MD5($this->post('password')),
        'ipAddress' => $this->input->ip_address(),
        'createdDateTime' => date("Y-m-d H:i:s")
      );

      $this->load->database();
      $this->load->helper('array');

      $this->db->where('csPhone',element( 'csPhone', $user ));
      $this->db->or_where('csEmail', element( 'csEmail', $user ));

      $query = $this->db->get('cosUsers');

      $count = $query->num_rows();
      if( $count === 0 ) {
        $this->db->insert('cosUsers', $user);

        $this->load->library('email');
        $config = array(
          'charset' => 'utf-8',
          'wordwrap' => TRUE,
        );

	$urlLink = 'http://www.cutoffsearch.com/services/index.php/users/verify?mobile='.element( 'csPhone', $user ).'&otp='.$tempOtp.'&hash='.md5(rand(100,500));

        $userFullName = $this->post('firstName') . ' ' . $this->post('lastName');
        $mailData = array(
          'phone' => element( 'csPhone', $user ),
          'otp' => $tempOtp,
          'urlLink' => $urlLink,
          'name' => $userFullName
        );
        $this->email->initialize($config);
        $this->email->from('support@cutoffsearch.com', 'Cutoff Support');
        $this->email->set_mailtype('html');
        $this->email->to($this->post('email'));
        $this->email->bcc('vishnutekale13@gmail.com');
        $this->email->subject('Cutoffsearch Signup');
        $html_email = $this->load->view('mail/templatewithoutotpmail', $mailData, true);
        $this->email->message($html_email);
        $this->email->send();

        $this->response(array("data" => array(
          "status" => 201,
          "id" => element( 'csPhone', $user ),
          "message" => "User added succefully."
        )));
      } else {
        $this->response(array("data" => array(
          "status" => 301,
          "message" => "Mobile number Or email allready exists.",
          "query" => $this->db->last_query()
        )));
      }
    } catch(Exception $e) {
      $this->response(array("data" => array(
        "status" => 501,
        "message" => "Some error occured. Please contact admin.",
        "query" => $this->db->last_query()
      )));
    }
  }

  public function authorise($phone, $otp, $isByLink)
  {
    $this->load->database();
    $this->load->helper('array');
    $this->load->helper('url');

    $this->db->where('csPhone',$phone );
    $this->db->where('csOtp', $otp );
    $this->db->where('isBlock', 1 );

    $query = $this->db->get('cosUsers');

    $count = $query->num_rows();

    if($count === 1 ) {
      $data = array(
        'isBlock' => 0
      );

      $this->db->where('csPhone',$phone );
      $this->db->where('csOtp', $otp );
      $this->db->update('cosUsers', $data);

      if($isByLink) {
        redirect('http://www.cutoffsearch.com/#/login/'.$phone, 'refresh');
      } else {
        $this->response(array("data" => array(
          "status" => 201,
          "message" => "Congratulations. You are verified. Please login and start searching.",
          "otp" => $otp,
          "query" => $this->db->last_query()
        )));

      }
    } else {
      $this->response(array("data" => array(
        "status" => 301,
        "message" => "You entered incorrect OTP. Please try agin.",
        "otp" => $otp,
        "query" => $this->db->last_query()
      )));
    }
  }

  public function verify_get() {
    $mobile = $this->get('mobile');
    $otp = $this->get('otp');
    $this->authorise($mobile, $otp, true);
  }

  public function authorise_post() {
    $phone = $this->post('phone');
    $otp = $this->post('otp');

    $this->authorise($phone, $otp, false);
  }



  public function login_post()
  {
    $phone = $this->post('phone');
    $password = MD5($this->post('password'));

    $this->load->database();
    $this->load->helper('array');

    $this->db->where('csPhone',$phone );
    $this->db->where('csPassword', $password );
    $this->db->where('isBlock', 0 );

    $query = $this->db->get('cosUsers');

    $count = $query->num_rows();

    if($count === 1 ) {
      $this->response(array("data" => array(
        "status" => 201,
        "message" => "Login successful.",
        "query" => $this->db->last_query()
      )));
    } else {
      $this->response(array("data" => array(
        "status" => 301,
        "message" => "User not authorised. Please try agin.",
        "query" => $this->db->last_query()
      )));
    }
  }

  public function demo_post() {
    $this->response(array("data" => array(
      "status" => 301,
      "message" => $this->post('firstName'),
      "query" => md5('demo'),
      "query1" => md5('demo'),
      "query2" => md5('demo')
    )));
  }
}
?>