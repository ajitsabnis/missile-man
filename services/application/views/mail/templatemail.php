<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Cutoff Search</title>
</head>
<body>
<div style="border: 5px solid indigo; min-height: 200px; border-radius: 5px;">
  <div style="padding: 20px; font-family: verdana;">
    <p>Thanks for signing up!</p>
   
    <p>Your account has been created, you can login with your mobile number after you activate your account.</p>
   
    <p>Mobile: <?php echo $phone;?> <br>OTP: <?php echo $otp;?></p>
   
    <p>Please click below link to activate your account: <a href=<?php echo '"'.$urlLink.'"';?> target="_blank"><?php echo $urlLink;?></a></p>
   
    <p>Regards,<br>Cutoffsearch Admin</p>
   
   
  </div>
</div>
</body>
</html>