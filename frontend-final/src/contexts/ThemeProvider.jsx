import React, {createContext, useEffect, useState} from 'react';

// إنشاء سياق ThemeContext ليتم مشاركته بين المكونات
const ThemeContext = createContext();

function ThemeProvider( {children} ) {
  // حالة theme: تخزن الوضع الحالي (dark أو light)
  // نحاول أولًا الحصول على القيمة من localStorage
  // إذا لم تكن موجودة، نستخدم تفضيل النظام (النظام داكن أم لا)
  const [ theme, setTheme ] = useState( () => {
    const stored = localStorage.getItem( 'theme' );
    if ( stored ) return stored; // إذا كانت محفوظة في localStorage، نستخدمها
    const prefersDark = window.matchMedia( '(prefers-color-scheme: light)' ).matches;
    return prefersDark ? 'light' : 'dark'; // خلاف ذلك نستخدم تفضيل النظام
  } );

  // دالة لتبديل الثيم بين "dark" و "light"
  function changeTheme() {
    setTheme( prev => ( prev === 'dark' ? 'light' : 'dark' ) );
  }

  // تأثير جانبي: عند تغيير الثيم نقوم بتحديث الـ HTML attribute و localStorage
  useEffect( () => {
    document.documentElement.setAttribute( 'data-theme', theme ); // تعيين attribute في عنصر html
    localStorage.setItem( 'theme', theme ); // حفظ الثيم في localStorage ليبقى محفوظًا بعد التحديث
  }, [ theme ] );

  // توفير القيم (theme، changeTheme) لجميع المكونات الأبناء
  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
export {ThemeContext};