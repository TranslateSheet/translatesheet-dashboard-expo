export type Language = "en" | "es" | "zh" | "ru" | "de";

export type Translation = {
  id: number;
  namespace: string;
  key: string;
  createdAt: Date;
  lastUpdatedAt: Date | null;
  language: Language;
  value: string;
  confidenceScore: number;
};

export type ColumnsKey =
  | "namespace"
  | "key"
  | "createdAt"
  | "lastUpdatedAt"
  | "language"
  | "value"
  | "confidenceScore"
  | "actions";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "namespace",
  "key",
  "createdAt",
  "lastUpdatedAt",
  "language",
  "value",
  "confidenceScore",
  "actions",
];

export const columns = [
  { name: "Namespace", uid: "namespace", sortable: true },
  { name: "Key", uid: "key", sortable: true },
  { name: "Created At", uid: "createdAt", sortable: true },
  { name: "Last Updated", uid: "lastUpdatedAt", sortable: true },
  { name: "Language", uid: "language", sortable: true },
  { name: "Value", uid: "value", sortable: true },
  { name: "Confidence Score", uid: "confidenceScore", sortable: true },
  { name: "Actions", uid: "actions" },
];

// Define translation content by component/namespace
const translationContent = {
  "sign-in": {
    title: "Sign in",
    emailLabel: "Email",
    passwordLabel: "Password",
    phoneNumberLabel: "Phone number",
    sendCodeButton: "Send code: {{code}}",
    authToastTitle: "Authentication needed",
    authToastMessage: "Please log in to continue",
    orSignInWith: "Or sign in with",
    toastErrorTitle: "Error",
    enterCountryCodeMessage: "Please enter a country code",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
  },
  profile: {
    title: "Profile",
    edit: "Edit",
    signOut: "Sign out",
    reportABug: "Report a bug",
    bugReportTitle: "PlaySpot Bug Report",
    uploadPhoto: "Upload photo",
    username: "Username",
    name: "Name",
    update: "Update",
    deleteAccount: "Delete Account",
  },
};

// Language-specific translations
const languageTranslations: Record<
  Language,
  Record<string, Record<string, string>>
> = {
  en: translationContent,
  es: {
    "sign-in": {
      title: "Iniciar sesión",
      emailLabel: "Correo electrónico",
      passwordLabel: "Contraseña",
      phoneNumberLabel: "Número de teléfono",
      sendCodeButton: "Enviar código: {{code}}",
      authToastTitle: "Autenticación necesaria",
      authToastMessage: "Por favor inicie sesión para continuar",
      orSignInWith: "O iniciar sesión con",
      toastErrorTitle: "Error",
      enterCountryCodeMessage: "Por favor ingrese el código de país",
      rememberMe: "Recordarme",
      forgotPassword: "¿Olvidó su contraseña?",
    },
    profile: {
      title: "Perfil",
      edit: "Editar",
      signOut: "Cerrar sesión",
      reportABug: "Informar un error",
      bugReportTitle: "Informe de error de PlaySpot",
      uploadPhoto: "Subir foto",
      username: "Nombre de usuario",
      name: "Nombre",
      update: "Actualizar",
      deleteAccount: "Eliminar cuenta",
    },
  },
  zh: {
    "sign-in": {
      title: "登录",
      emailLabel: "电子邮件",
      passwordLabel: "密码",
      phoneNumberLabel: "电话号码",
      sendCodeButton: "发送验证码：{{code}}",
      authToastTitle: "需要认证",
      authToastMessage: "请登录后继续",
      orSignInWith: "或通过以下方式登录",
      toastErrorTitle: "错误",
      enterCountryCodeMessage: "请输入国家代码",
      rememberMe: "记住我",
      forgotPassword: "忘记密码？",
    },
    profile: {
      title: "个人资料",
      edit: "编辑",
      signOut: "登出",
      reportABug: "报告问题",
      bugReportTitle: "PlaySpot错误报告",
      uploadPhoto: "上传照片",
      username: "用户名",
      name: "姓名",
      update: "更新",
      deleteAccount: "删除帐户",
    },
  },
  ru: {
    "sign-in": {
      title: "Вход",
      emailLabel: "Электронная почта",
      passwordLabel: "Пароль",
      phoneNumberLabel: "Номер телефона",
      sendCodeButton: "Отправить код: {{code}}",
      authToastTitle: "Требуется аутентификация",
      authToastMessage: "Пожалуйста, войдите чтобы продолжить",
      orSignInWith: "Или войти через",
      toastErrorTitle: "Ошибка",
      enterCountryCodeMessage: "Пожалуйста, введите код страны",
      rememberMe: "Запомнить меня",
      forgotPassword: "Забыли пароль?",
    },
    profile: {
      title: "Профиль",
      edit: "Редактировать",
      signOut: "Выйти",
      reportABug: "Сообщить об ошибке",
      bugReportTitle: "Отчет об ошибке PlaySpot",
      uploadPhoto: "Загрузить фото",
      username: "Имя пользователя",
      name: "Имя",
      update: "Обновить",
      deleteAccount: "Удалить учетную запись",
    },
  },
  de: {
    "sign-in": {
      title: "Anmelden",
      emailLabel: "E-Mail",
      passwordLabel: "Passwort",
      phoneNumberLabel: "Telefonnummer",
      sendCodeButton: "Code senden: {{code}}",
      authToastTitle: "Authentifizierung erforderlich",
      authToastMessage: "Bitte melden Sie sich an, um fortzufahren",
      orSignInWith: "Oder anmelden mit",
      toastErrorTitle: "Fehler",
      enterCountryCodeMessage: "Bitte Ländercode eingeben",
      rememberMe: "Angemeldet bleiben",
      forgotPassword: "Passwort vergessen?",
    },
    profile: {
      title: "Profil",
      edit: "Bearbeiten",
      signOut: "Abmelden",
      reportABug: "Fehler melden",
      bugReportTitle: "PlaySpot Fehlerbericht",
      uploadPhoto: "Foto hochladen",
      username: "Benutzername",
      name: "Name",
      update: "Aktualisieren",
      deleteAccount: "Konto löschen",
    },
  },
};

const generateMockTranslations = (): Translation[] => {
  const mockData: Translation[] = [];
  const languages: Language[] = ["en", "es", "zh", "ru", "de"];
  const now = new Date();
  let id = 1;

  // Helper function to generate a random date within the last 30 days
  const randomDate = () =>
    new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);

  // Helper function to generate a realistic confidence score
  const generateConfidenceScore = (language: Language): number => {
    if (language === "en") return 10;
    // Other languages get a realistic score between 7 and 9.8
    // More common languages (es, de) get slightly higher scores
    switch (language) {
      case "es":
      case "de":
        return 8.5 + Math.random() * 1.3;
      case "zh":
      case "ru":
        return 7.5 + Math.random() * 1.8;
      default:
        return 7 + Math.random() * 2.8;
    }
  };

  // Create entries for each namespace and key in each language
  Object.entries(translationContent).forEach(([namespace, keys]) => {
    Object.entries(keys).forEach(([key, englishValue]) => {
      languages.forEach((lang) => {
        const createdAt = randomDate();
        const lastUpdatedAt = Math.random() > 0.7 ? randomDate() : null;

        // For non-English languages, use the translation if available, otherwise use English
        const value =
          lang === "en"
            ? englishValue
            : languageTranslations[lang]?.[namespace]?.[key] || englishValue;

        mockData.push({
          id: id++,
          namespace,
          key,
          createdAt,
          lastUpdatedAt,
          language: lang,
          value,
          confidenceScore: generateConfidenceScore(lang),
        });
      });
    });
  });

  return mockData;
};

export const translations: Translation[] = generateMockTranslations();
