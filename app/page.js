"use client"

import { ExportedImage } from './components/ExportedImage'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import Link from 'next/link';

const riyadhDistricts = [
  "حي المحمدية","حي الرحمانية","حي النخيل","حي المعذر الجنوبي","حي المصفى","حي الورود","حي الغدير","حي العليا",
  "حي الملك فهد","حي المروج","حي الصحافة","حي الربيع","حي النرجس","حي الياسمين","حي العقيق","حي حطين","حي الملقا",
  "حي العارض","حي لبن","حي السويدي","حي الشفا","حي العزيزية","حي الروابي","حي النسيم","حي الخليج","حي النهضة",
  "حي الروضة","حي السلي","حي المنار","حي الربوة","حي الفيحاء","حي الجزيرة","حي الحمراء","حي قرطبة","حي اشبيلية",
  "حي الرمال","حي المونسية","حي طويق","حي ظهرة لبن","حي الدار البيضاء","حي بدر","حي الشفاء","حي سلطانة",
  "حي ظهرة نمار","حي نمار","حي المهدية","حي القيروان"
];

const validationSchema = Yup.object({
  firstName: Yup.string().required("الاسم مطلوب"),
  email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
  district: Yup.string().required("اسم الحي مطلوب"),
  contact1: Yup.string().required("رقم الجوال مطلوب"),
  nationality: Yup.string().required("الجنسية مطلوبة"),
  password: Yup.string().required("كلمة المرور مطلوبة").min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف"),
  confirmPassword: Yup.string().required("تأكيد كلمة المرور مطلوب").oneOf([Yup.ref("password")], "كلمتا المرور غير متطابقتين"),
  isQurrahEligible: Yup.boolean(),
});

export default function SignupPage() {
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      contact1: "",
      district: "",
      nationality: "",
      password: "",
      confirmPassword: "",
      isQurrahEligible: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://backend.kidstime.com.sa/api/gardianregister", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "تم التسجيل بنجاح!",
            text: "تم تسجيل حسابك بنجاح. سيتم إعادة توجيهك إلى صفحة تسجيل الدخول.",
            confirmButtonText: "حسنًا",
          }).then(() => {
            formik.resetForm();
            router.push('/login');
          });
        } else {
          Swal.fire({ icon: "error", title: "حدث خطأ", text: data.message || "حدث خطأ أثناء التسجيل", confirmButtonText: "إغلاق" });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({ icon: "error", title: "حدث خطأ", text: "حدث خطأ في الاتصال بالخادم", confirmButtonText: "إغلاق" });
      }
    },
  });



  const passwordStyles = {
    wrapper: { position: 'relative', width: '100%' },
    eye: {
      position: 'absolute', left: '10px', top: '35%',
      transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none', fontSize: '20px'
    },
    input: { paddingLeft: '35px', width: '100%' }
  };

  return (
    <section className="flex min-h-screen items-stretch justify-center px-0 mt-10 sm:mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl w-full">

        {/* 📷 Left Side Image */}
        <div className="bg-gray-50 hidden md:flex items-center justify-center p-4 md:p-6">
          <ExportedImage
            src="/Websitediscountbanner-01.png"
            alt="Registration Illustration"
            width={500}
            height={500}
            className="object-contain w-full max-w-xs md:max-w-md lg:max-w-lg h-auto"
          />
        </div>

        {/* 📝 Right Side */}
        <div className="p-4 md:p-6 space-y-3 flex flex-col justify-center">
          {/* Single H1 for the whole page */}
          <h1 className="text-center text-lg sm:text-xl md:text-1xl font-extrabold text-gray-900 leading-snug">
            مرحبًا بكم في مركز كيدستيم لرعاية الأطفال – الشريك الموثوق لرعاية الأطفال في الرياض، حي المحمدية
          </h1>

          {/* Logo + sub-heading */}
          <div className="text-center mb-2">
            <ExportedImage src="/logo.png" alt="Logo" width={40} height={40} className="mx-auto" />
            <h2 className="text-orange-500 font-bold mt-2 text-sm sm:text-base">مركز وقت الطفل لضيافة الأطفال</h2>
            <p className="sm:text-base font-bold text-gray-800 mt-1">إنشاء حساب</p>
          </div>

{/* 🔖 PROMO CODE BANNER inside green border */}
<div className="mt-1 relative" dir="rtl" aria-label="Promo Code">
  {/* Outer green gradient border */}
  <div className="p-[2px] rounded-2xl bg-gradient-to-l from-lime-500 via-emerald-500 to-lime-500 shadow-md relative">
    
    {/* Inner card */}
    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 
                    rounded-2xl bg-white/90 backdrop-blur px-4 py-5">
      
      {/* OFFER badge (top-right corner inside card) */}
      <div className="absolute -top-4 -right-4">
        <span className="flex items-center gap-1 px-3 py-1 rounded-xl border border-emerald-500 
                         bg-gradient-to-r from-lime-100 to-emerald-100 
                         text-emerald-700 font-bold text-xs shadow-md">
          🎁 عرض خاص
        </span>
      </div>

     
   {/* Label */}
<div className="flex items-center gap-1">
  <span className="text-xs sm:text-sm text-gray-800 font-semibold whitespace-nowrap">
    استخدمي هذا الرمز للحصول على الخصم عند الاشتراك في الخطة
  </span>
</div>


      {/* Promo code chip */}
      <span
        className="inline-flex items-center justify-center rounded-xl border border-lime-400
                   bg-gradient-to-r from-lime-50 to-emerald-50 px-2 py-2 shadow-sm
                   font-extrabold text-md sm:text-lg text-gray-900" // removed tracking-[0.35em]
      >
        newstart13
      </span>
    </div>
  </div>
</div>


          {/* FORM */}
          <form onSubmit={formik.handleSubmit} className="space-y-2" dir="rtl">
            <input type="text" placeholder="الوصي/الاسم الكامل" name="firstName"
              value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}
              className="form-input text-right" />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-xs">{formik.errors.firstName}</div>
            )}

            <input type="email" placeholder="البريد الإلكتروني" name="email"
              value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
              className="form-input text-right" />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            )}

            <input type="text" placeholder="رقم الجوال" name="contact1"
              value={formik.values.contact1} onChange={formik.handleChange} onBlur={formik.handleBlur}
              className="form-input text-right" />
            {formik.touched.contact1 && formik.errors.contact1 && (
              <div className="text-red-500 text-xs">{formik.errors.contact1}</div>
            )}

            {/* District Autocomplete */}
            <Autocomplete
              freeSolo
              options={riyadhDistricts}
              value={formik.values.district}
              onChange={(_, value) => formik.setFieldValue('district', value || '')}
              onInputChange={(_, value) => formik.setFieldValue('district', value)}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="district"
                  placeholder="اسم الحي:"
                  className="input-field"
                  required
                  onBlur={formik.handleBlur}
                  error={formik.touched.district && Boolean(formik.errors.district)}
                  helperText={formik.touched.district && formik.errors.district}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <span style={{ marginLeft: 15, color: "#888", position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", fontSize: "12px" }}>
                        ▼
                      </span>
                    ),
                    style: {
                      paddingTop: '6px', paddingBottom: '6px', height: '38px', margin: 0,
                      marginBottom: '10px', color: '#000', background: 'white', fontSize: '0.75rem',
                    }
                  }}
                  inputProps={{ ...params.inputProps, style: { direction: 'rtl' } }}
                />
              )}
            />

            <input type="text" placeholder="الجنسية" name="nationality"
              value={formik.values.nationality} onChange={formik.handleChange} onBlur={formik.handleBlur}
              className="form-input text-right" />
            {formik.touched.nationality && formik.errors.nationality && (
              <div className="text-red-500 text-xs">{formik.errors.nationality}</div>
            )}

            <div style={passwordStyles.wrapper}>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="كلمة المرور"
                style={passwordStyles.input} className="form-input text-right"
                value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <span style={passwordStyles.eye} onClick={() => setShowPassword(!showPassword)} role="button" aria-label="إظهار/إخفاء كلمة المرور">
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs">{formik.errors.password}</div>
            )}

            <div style={passwordStyles.wrapper}>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="تأكيد كلمة المرور"
                style={passwordStyles.input} value={formik.values.confirmPassword}
                onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-input text-right" />
              <span style={passwordStyles.eye} onClick={() => setShowConfirmPassword(!showConfirmPassword)} role="button" aria-label="إظهار/إخفاء تأكيد كلمة المرور">
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-xs">{formik.errors.confirmPassword}</div>
            )}

            <div className="flex items-center gap-2 justify-start">
              <label htmlFor='isQurrahEligible' className="text-sm">هل أنت مؤهلة لبرنامج قرة؟</label>
              <input type="checkbox" id='isQurrahEligible' name='isQurrahEligible'
                checked={formik.values.isQurrahEligible} onChange={formik.handleChange}
                style={{ width: "18px", height: "18px" }} />
            </div>
            {formik.touched.isQurrahEligible && formik.errors.isQurrahEligible && (
              <div className="text-red-500 text-xs">{formik.errors.isQurrahEligible}</div>
            )}

            {emailError && <div className="error">{emailError}</div>}

            <div className="text-xs text-gray-500">
              اختاري هالخيار بس إذا إنتِ أم سعودية عاملة ومؤهّلة لدعم برنامج قُرّة
            </div>

            <button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm cursor-pointer mt-4">
              تسجيل
            </button>

            <p className="text-sm text-center">
              لديك حساب بالفعل؟ <Link href="/login" className="text-blue-600 p-1">تسجيل الدخول</Link>
            </p>
          </form>

          {/* Optional marketing text */}
          <div className="text-sm text-gray-700 leading-6" dir="rtl">
            تبحث عن أفضل حضانة في الرياض يمكن للآباء الوثوق بها؟ قم بزيارة موقعنا للتسجيل والتحقق من خطط وأسعار الحضانة اليوم! في مركز كيدزتايم لرعاية الأطفال بالرياض، نقدم خدمات آمنة، ميسورة التكلفة، وعالية الجودة من خلال أنشطة منظمة ولعب ورعاية. ندعم الأمهات العاملات عبر برنامج قرة، ومع خطة تمارا يمكن إدارة الرسوم بسهولة. سواءً كنتِ تبحثين عن روضة موثوقة أو حضانة بأسعار معقولة في الرياض—نحن هنا لمساعدتك. 📍 زورونا في الرياض حيث تلتقي الرعاية بالتعلم.
          </div>
        </div>
      </div>
    </section>
  )
}
