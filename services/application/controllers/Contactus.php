<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/controllers/CosRestController.php';

class Contactus extends CosRestController
{

	public function index_post()
	{
    $data = array(
      'first_name' => $this->post('firstname'),
      'last_name' => $this->post('lastname'),
      'company_name' => $this->post('companyname'),
      'email_address' => $this->post('emailaddress'),
      'message' => $this->post('msg')
    );
    $this->sendemail($data);

    $this->load->database();
    $this->load->helper('array');

    //TODO : Add the contact_us table then enable this line
    //$this->db->insert('contact_us', $data);

    $this->response(array("data" => array(
      "message" => "Your feedback sent succefully. Thanks."
    )));
  }

	public function request_post()
	{
		$data = array(
			'name' => $this->post('name'),
			'mobile' => $this->post('mobile'),
			'email' => $this->post('email'),
			'collegeName' => $this->post('collegeName'),
			'collegeId' => $this->post('collegeId'),
			'collegeEmail' => $this->post('collegeEmail')
		);

		$this->load->library('email');
		$config = array(
			'charset' => 'utf-8',
			'wordwrap' => TRUE,
		);

		$this->email->initialize($config);
		$this->email->from('support@cutoffsearch.com', 'Cutoff Support');
		$this->email->set_mailtype('html');
		$this->email->to('ajitnetwork@gmail.com');
		$this->email->cc('vishnutekale13@gmail.com');
		$this->email->subject('Cutoff - College Inquiry');
		$html_email = $this->load->view('mail/request', $data, true);
		$this->email->message($html_email);
		$this->email->send();
	}

	public function sendemail($data)
	{
		$this->load->library('email');
		$config = array(
			'charset' => 'utf-8',
			'wordwrap' => TRUE,
			'mailtype' => 'html'
		);

		$mailData = "Thank you for your feedback. We will get back to you soon.";
		$this->email->initialize($config);
		$this->email->from('support@cutoffsearch.com', 'Cutoff Support');
		$this->email->to($data['email_address']);
		$this->email->bcc('vishnutekale13@gmail.com');
		$this->email->subject('Thank You...!!!');
		$this->email->message($mailData);
		$this->email->send();

		$mailData = "User registered : " . $data['email_address'];
		$mailData .= "\nFeedback : " . $data['message'];
		$this->email->initialize($config);
		$this->email->from('support@cutoffsearch.com', 'Cutoff Support');
		$this->email->to('ajitnetwork@gmail.com');
		$this->email->cc('vishnutekale13@gmail.com');
		$this->email->subject('Cutoff - Contact us');
		$this->email->message($mailData);
		$this->email->send();
  }

	public function emailtest_get()
	{
		$this->load->library('email');
		$config = array(
			'wordwrap' => TRUE,
			'mailpath' => "/usr/bin/sendmail",
			'userAgent' => 'CodeIgniter',
			'protocol' => 'smtp',
			'smtp_host' => 'ssl://smtp.googlemail.com',
			'smtp_port' => 465,
			'smtp_user' => 'cutoffsearch76@gmail.com',
			'smtp_pass' => 'cos$$1290',
			'mailtype' => 'html',
			'charset' => 'utf-8'
		);


		$mailData = "Hello User,<br>User registered : abc@gmail.com";
		$mailData .= "<br>Feedback : This is a sample reply";
		$this->email->initialize($config);
		$this->email->set_newline("\r\n");
		$this->email->from('cutoffsearch76@gmail.com', 'cutoffsearch support');
		$this->email->reply_to('cutoffsearch76@gmail.com');
		$this->email->to('vishnutekale13@gmail.com');
		
		$this->email->subject('Cutoff - Contact us');
		$html_email = $this->load->view('mail/requestmail', $mailData, true);
		$this->email->message($html_email);
		$this->email->send();

		$this->response(array("data" => array(
			"message" => $this->email->print_debugger()
		)));
		
		// $this->email->send();
	}

}
?>