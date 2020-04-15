import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          "View Tutorial": "View Tutorial",
          "Watch a short video on how to use Help Flare":
            "Watch a short video on how to use Help Flare",
          "Add to home screen": "Add to home screen",
          "You can add the app to your home screen from the chrome menu for easy access":
            "You can add the app to your home screen from the chrome menu for easy access",
          Report: "Report",
          "Report an area by selecting points on screen":
            "Report an area by selecting points on screen",
          Help: "Help",
          "NGOs and social service groups can view the help required":
            "NGOs and social service groups can view the help required",
          "Upload a photo": "Upload a photo",
          "NGOs and groups upload a photo of the help provided for verification":
            "NGOs and groups upload a photo of the help provided for verification",
          "Report an area that needs help": "Report an area that needs help",
          "Register as a helper": "Register as a helper",
          FAQ: "FAQ",
          "About us and frequently asked questions":
            "About us and frequently asked questions",
          "For updates and problems contact us at":
            "For updates and problems contact us at",
          "Add markers": "Add markers",
          "Zoom in and drop three markers to make an area. You can drop a marker by pressing the map":
            "Zoom in and drop three markers to make an area. You can drop a marker by pressing the map",
          "Remove marker": "Remove marker",
          "You can remove a marker by clicking it again":
            "You can remove a marker by clicking it again",
          "Enter details": "Enter details",
          "Enter details about the needs here":
            "Enter details about the needs here",
          "We will send OTP on your phone": "We will send OTP on your phone",
          "Groups or NGOs might contact you if required":
            "Groups or NGOs might contact you if required",
          "Registration for NGOs or groups interested in helping":
            "Registration for NGOs or groups interested in helping",
          Name: "Name",
          "Enter phone": "Enter phone",
          "Your phone number might be used to contact you if required.":
            "Your phone number might be used to contact you if required.",
          Organisation: "Organisation",
          Phone: "Phone",
          Password: "Password",
          Vicinity: "Vicinity",
          "Select all that you can provide": "Select all that you can provide",
          Food: "Food",
          Water: "Water",
          Sanitation: "Sanitation",
          "eg. About 100 people living here need rice and other uncooked food items":
            "eg. About 100 people living here need rice and other uncooked food items",
          "By registering you agree to the terms of service and the privacy policy":
            "By registering you agree to the terms of service and the privacy policy",
          Register: "Register",
          Login: "Login",
          "Login for helper groups": "Login for helper groups",
          "Help required(select multiple)": "Help required(select multiple)",
          "Help required": "Help required",
          "Reported by": "Reported by",
          Contact: "Contact",
          "Enter Password": "Enter Password",
          "Enter Organisation name": "Enter Organisation name",
          Place: "Place",
          "More information": "More information",
          Cancel: "Cancel",
          "I will help": "I will help",
          "Helper is already assigned for this area":
            "Helper is already assigned for this area",
          "Verify your current claim before claiming this area":
            "Verify your current claim before claiming this area",
          "You can do this by pressing verify on the home screen":
            "You can do this by pressing verify on the home screen",
          "Are you sure?": "Are you sure?",
          "You must click a picture of the help provided and upload it after you are done. You will not be able to claim any other sites till that time":
            "You must click a picture of the help provided and upload it after you are done. You will not be able to claim any other sites till that time",
          'Please provide the help in under 24 hours of pressing "Agree"':
            'Please provide the help in under 24 hours of pressing "Agree"',
          "We will contact you in case of any problems":
            "We will contact you in case of any problems",
          Agree: "Agree",
          Disagree: "Disagree",
          "Upload a picture of the help you provided":
            "Upload a picture of the help you provided",
          "This picture will be displayed publicly on your profile.":
            "This picture will be displayed publicly on your profile.",
          "This step is for verification purposes.":
            "This step is for verification purposes.",
          "You will not be able to make any other claims if you do not do this step":
            "You will not be able to make any other claims if you do not do this step",
          Verify: "Verify",
          "Select image": "Select image",
          "Upload photo": "Upload photo",
          "Who are you?": "Who are you?",

          "We are a group of students from Mumbai":
            "We are a group of students from Mumbai",

          "What is the purpose of this project?":
            "What is the purpose of this project?",

          "There are many social groups and NGOs out there helping people by providing food and other necessities but there is a disconnect between the people who are helping and those who need help. This project is aimed at removing that disconnect":
            "There are many social groups and NGOs out there helping people by providing food and other necessities but there is a disconnect between the people who are helping and those who need help. This project is aimed at removing that disconnect",

          "Is this project affiliated with the government?":
            "Is this project affiliated with the government?",

          "No. But if you are someone who can help or spread the word, contact us on the Instagram page on the home screen":
            "No. But if you are someone who can help or spread the word, contact us on the Instagram page on the home screen",

          "How can I help?": "How can I help?",

          "If you are someone who can prepare food packets and distribute them at the reported areas, register and claim an area. You can also help by reporting areas so that other people can see them":
            "If you are someone who can prepare food packets and distribute them at the reported areas, register and claim an area. You can also help by reporting areas so that other people can see them",

          "Why do I have to upload an image of the help I am providing?":
            "Why do I have to upload an image of the help I am providing?",

          "We do not want to entertain any kind of mischief or be held responsible for it":
            "We do not want to entertain any kind of mischief or be held responsible for it",

          "Why do I have to provide my phone number?":
            "Why do I have to provide my phone number?",

          "Your phone number is required to contact you should any need arise":
            "Your phone number is required to contact you should any need arise",

          "I am facing an issue with the app. What should I do?":
            "I am facing an issue with the app. What should I do?",

          "You can contact us on the details mentioned in the footer of the home screen":
            "You can contact us on the details mentioned in the footer of the home screen",
        },
      },
      hi: {
        translations: {
          "View Tutorial": "डेमो देखें",
          "Watch a short video on how to use Help Flare":
            "Help Flare का उपयोग करने के तरीके पर एक छोटा वीडियो देखें",
          "Add to home screen": "होम स्क्रीन में शामिल करें",
          "You can add the app to your home screen from the chrome menu for easy access":
            "आप क्रोम मेनू से ऐप को अपने होम स्क्रीन पर जोड़ सकते हैं",
          Report: "रिपोर्ट",
          "Report an area by selecting points on screen":
            "स्क्रीन पर अंक का चयन करके एक क्षेत्र की रिपोर्ट करें",
          Help: "सहायता",
          "NGOs and social service groups can view the help required":
            "सामाजिक सेवा समूह पंजीकरण करके और फिर सहायता पर जाकर आवश्यक सहायता दे सकते हैं",
          "Upload a photo": "फोटो अपलोड करें",
          "NGOs and groups upload a photo of the help provided for verification":
            "सामाजिक सेवा समूह प्रमाणन के लिए दी गई मदद की एक तस्वीर अपलोड करते हैं",
          "Report an area that needs help":
            "ऐसे क्षेत्र की रिपोर्ट करें, जिसे मदद की आवश्यकता है",
          "Register as a helper": "सहायक के रूप में रजिस्टर करें",
          FAQ: "सामान्य प्रश्न",
          "About us and frequently asked questions":
            "हमारे बारे में और अक्सर पूछे जाने वाले प्रश्न",
          "For updates and problems contact us at": "संपर्क करें",
          "Add markers": "मार्कर रखें",
          "Zoom in and drop three markers to make an area. You can drop a marker by pressing the map":
            "एक क्षेत्र बनाने के लिए तीन मार्करों को ज़ूम इन और ड्रॉप करें। आप मानचित्र दबाकर एक मार्कर छोड़ सकते हैं",
          "Remove marker": "मार्करों को हटाने के लिए",
          "You can remove a marker by clicking it again":
            "आप किसी मार्कर को फिर से क्लिक करके हटा सकते हैं",
          "Enter details": "विवरण दर्ज करें",
          "Enter Password": "पास वर्ड दर्ज करें",
          "Enter Organisation name": "संगठन का नाम दर्ज करें",
          "Enter details about the needs here":
            "यहां जरूरतों के बारे में विवरण दर्ज करें",
          "We will send OTP on your phone": "हम आपके फ़ोन पर OTP भेजेंगे",
          "Groups or NGOs might contact you if required":
            "यदि आवश्यक हो तो समूह या गैर सरकारी संगठन आपसे संपर्क कर सकते हैं",
          "Registration for NGOs or groups interested in helping":
            "मदद के लिए इच्छुक गैर-सरकारी संगठनों या समूहों के लिए पंजीकरण",
          Name: "नाम",
          "Enter phone": "फ़ोन नंबर दर्ज करें",
          "Your phone number might be used to contact you if required.":
            "आवश्यकता होने पर आपसे संपर्क करने के लिए आपके फ़ोन नंबर का उपयोग किया जा सकता है।",
          Organisation: "संगठन",
          Phone: "फ़ोन",
          Password: "पासवर्ड",
          Vicinity: "आसपास का क्षेत्र",
          "Select all that you can provide":
            "वह सब चुनें जो आप प्रदान कर सकते हैं",
          Food: "भोजन",
          Water: "पानी",
          Sanitation: "स्वच्छता",
          "eg. About 100 people living here need rice and other uncooked food items":
            "जैसे। यहां रहने वाले लगभग 100 लोगों को चावल और अन्य पदार्थों की आवश्यकता होती है",
          "By registering you agree to the terms of service and the privacy policy":
            "पंजीकरण करके आप सेवा की शर्तों और गोपनीयता नीति से सहमत होते हैं",
          Register: "रजिस्टर",
          Login: "लॉग इन",
          "Login for helper groups": "सहायक समूहों के लिए लॉग इन करें",
          "Help required(select multiple)": "सहायता की आवश्यकता",
          "Help required": "सहायता की आवश्यकता",
          "Reported by": "रिपोर्ट द्वारा",
          Contact: "संपर्क",
          Place: "स्थान",
          "More information": "अधिक जानकारी",
          Cancel: "रद्द करें",
          "I will help": "मैं सहायता करूँगा",
          "Helper is already assigned for this area":
            "Helper is already assigned for this area",
          "Verify your current claim before claiming this area":
            "इस क्षेत्र का दावा करने से पहले अपने वर्तमान दावे को साबित  करें",
          "You can do this by pressing verify on the home screen":
            "होम स्क्रीन पर वेरिफिकेशन दबाकर आप ऐसा कर सकते हैं",
          "Are you sure?": "क्या आपको यकीन है ?",
          "You must click a picture of the help provided and upload it after you are done. You will not be able to claim any other sites till that time":
            "आपको दी गई मदद की एक तस्वीर पर क्लिक करना होगा और मदद पुरीहोने के बाद उसे अपलोड करना होगा। आप उस समय तक किसी अन्य सहायता का दावा नहीं कर पाएंगे",
          'Please provide the help in under 24 hours of pressing "Agree"':
            'कृपया "सहमत" दबाने के 24 घंटे के भीतर सहायता प्रदान करें',
          "We will contact you in case of any problems":
            "हम किसी भी समस्या के मामले में आपसे संपर्क करेंगे",
          Agree: "सहमत",
          Disagree: "असहमत",
          "Upload a picture of the help you provided":
            "आपके द्वारा प्रदान की गई सहायता की एक तस्वीर अपलोड करें",
          "This picture will be displayed publicly on your profile.":
            "यह चित्र आपके प्रोफ़ाइल पर सार्वजनिक रूप से प्रदर्शित किया जाएगा।",
          "This step is for verification purposes.":
            "यदि आप यह कदम नहीं उठाते हैं तो आप कोई अन्य दावा नहीं कर पाएंगे",
          "You will not be able to make any other claims if you do not do this step":
            "यदि आप यह कदम नहीं उठाते हैं तो आप कोई अन्य दावा नहीं कर पाएंगे",
          Verify: "साबित करें",
          "Select image": "इमेज चुने",
          "Upload photo": "फोटो अपलोड करें",
          "Who are you?": "तुम कौन हो?",

          "We are a group of students from Mumbai":
            "हम मुंबई के छात्रों का एक समूह हैं",

          "What is the purpose of this project?":
            "इस परियोजना का उद्देश्य क्या है?",

          "There are many social groups and NGOs out there helping people by providing food and other necessities but there is a disconnect between the people who are helping and those who need help. This project is aimed at removing that disconnect":
            "वहाँ कई सामाजिक समूह और गैर सरकारी संगठन हैं जो लोगों को भोजन और अन्य आवश्यकताएं प्रदान करके मदद करते हैं लेकिन उन लोगों के बीच एक डिस्कनेक्ट है जो मदद कर रहे हैं और जिन्हें मदद की आवश्यकता है। यह परियोजना उस डिस्कनेक्ट को हटाने के उद्देश्य से है",

          "Is this project affiliated with the government?":
            "क्या यह परियोजना सरकार से संबद्ध है?",

          "No. But if you are someone who can help or spread the word, contact us on the Instagram page on the home screen":
            "नहीं, लेकिन यदि आप कोई ऐसा व्यक्ति हैं जो इस शब्द की मदद या प्रसार कर सकता है, तो हमसे होम स्क्रीन पर इंस्टाग्राम पेज पर संपर्क करें",

          "How can I help?": "मैं आपकी कैसे मदद कर सकता हूँ?",

          "If you are someone who can prepare food packets and distribute them at the reported areas, register and claim an area. You can also help by reporting areas so that other people can see them":
            "यदि आप कोई हैं जो भोजन के पैकेट तैयार कर सकते हैं और उन्हें रिपोर्ट किए गए क्षेत्रों में वितरित कर सकते हैं, तो एक क्षेत्र को पंजीकृत करें और दावा करें। आप क्षेत्रों की रिपोर्टिंग करके भी मदद कर सकते हैं ताकि अन्य लोग उन्हें देख सकें",

          "Why do I have to upload an image of the help I am providing?":
            "मुझे जो सहायता प्रदान की जा रही है, उसकी एक छवि मुझे क्यों अपलोड करनी है?",

          "We do not want to entertain any kind of mischief or be held responsible for it":
            "हम किसी भी तरह की शरारत नहीं करना चाहते हैं या इसके लिए जिम्मेदार नहीं हैं",

          "Why do I have to provide my phone number?":
            "मुझे अपना फ़ोन नंबर क्यों देना है?",

          "Your phone number is required to contact you should any need arise":
            "आपका फ़ोन नंबर संपर्क करने के लिए ज़रूरी है कि आपको किसी भी तरह की ज़रूरत हो",

          "I am facing an issue with the app. What should I do?":
            "मैं ऐप के साथ एक समस्या का सामना कर रहा हूं। मुझे क्या करना चाहिए?",

          "You can contact us on the details mentioned in the footer of the home screen":
            "होम स्क्रीन के पाद लेख में बताए गए विवरण पर आप हमसे संपर्क कर सकते हैं",
        },
      },
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
