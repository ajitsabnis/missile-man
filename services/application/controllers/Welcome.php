<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->library('email');
		echo "hello";
		$config = array(
			'wordwrap' => TRUE,
			'protocol' => 'smtp',
			'smtp_host' => 'ssl://linux72.securednameservers.com',
			'smtp_port' => 465,
			'smtp_user' => 'support@cutoffsearch.com',
			'smtp_pass' => 'support@cos',
			'mailtype' => 'html',
			'charset' => 'utf-8'
		);

		$mailData = "Hello User,<br>User registered : abc@gmail.com";
		$mailData .= "<br>Feedback : This is a sample reply";
		$this->email->initialize($config);
		$this->email->from('support@cutoffsearch.com');
		$this->email->reply_to('support@cutoffsearch.com');
		$this->email->to('vishnutekale13@gmail.com');
		$this->email->cc('scriptofer@gmail.com');
		$this->email->subject('Cutoff');
		$this->email->message($mailData);
		$this->email->send();
	}
}
