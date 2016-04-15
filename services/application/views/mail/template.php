<?php

echo "Thanks for signing up!\n\nYour account has been created, you can login with your mobile number after you activate your account.\n\n----------------------------\nMobile: $phone\n
OTP: $otp\n----------------------------\n\nPlease click below link to activate your account:\nhttp://www.cutoffsearch.com/services/index.php/users/verify?mobile=$phone&otp=$otp&hash=md5(rand(100,500))";
