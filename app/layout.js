import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kidstime daycare | مركز وقت الطفل لضيافة الأطفال | حضانة و روضة طفل, رياض الأطفال, رعاية أطفال | الرياض",
  description:
    "الموقع الرسمي لمركز وقت الطفل لضيافة الأطفال الأهلية | تمكين الأطفال ليصبحوا مواطنين منتجين في كافة نواحي الحياة. | Empowering children to become productive citizens in all aspects of life.",
  keywords: ` ضيافة الأطفال رياض الأطفال روضة الأطفال رعاية الأطفال حضانة الأطفال حضانة، روضة، مدرسة، مركز، رياض أطفال، حضانة بالقرب من جامعة الملك سعود، حضانة بالقرب من وزارة الاستثمار، حضانة بالقرب من المدينة الرقمية،
   حضانة طريق تركي الأول، حضانة حي النخيل، حضانة حي المحمدية، حضانة طريق التخصصي، حضانة وقت الطفل، مركز وقت الطفل، روضة وقت الطفل
    ، تسجيل وقت الطفل، أفضل روضة بالرياض، حضانة شمال الرياض، حضانة المحمدية، حضانة طريق التخصصي، حضانة وقت الطفل، مركز وقت الطفل،...`,
  icons: {
    icon: '/favicon2.webp',
    apple: '/favicon2.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {children}
      </body>
    </html>
  );
}
