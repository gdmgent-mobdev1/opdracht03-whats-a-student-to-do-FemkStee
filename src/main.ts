import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged, Auth, User,
} from 'firebase/auth';
import { googleLogin } from './lib/googleLogin';

import { login } from './lib/login';
import { register } from './lib/register';
import * as variables from './lib/Variables';
import * as functions from './lib/Functions';
import { getdocs } from './lib/user';

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAlcZTX9MbSBk9Mbh5Baq8-zRUIPzk--IA',
  authDomain: 'mylo-48315.firebaseapp.com',
  projectId: 'mylo-48315',
  storageBucket: 'mylo-48315.appspot.com',
  messagingSenderId: '949548352024',
  appId: '1:949548352024:web:fc1fc222eb7f07caeb396d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig) as FirebaseApp;
const auth = getAuth(app) as Auth;
const user = auth.currentUser as User;

// check user is logged in
window.addEventListener('load', () => {
  console.log(window.location.pathname);
  const locationPathname = window.location.pathname;
  functions.checkUserLoggedIn();

  if (locationPathname === '/') {
    window.location.pathname = '/projectsOverview/all';
  }

  if (locationPathname.includes('dashboard')) {
    variables.dashboard.classList.add('siderbar__navigation-active');
  }

  if (locationPathname.includes('projects')) {
    variables.projects.classList.add('siderbar__navigation-active');
  } else

  if (window.location.pathname.includes('settings')) {
    variables.settings.classList.add('siderbar__navigation-active');
  }

  if (window.location.pathname.includes('projectsOverview')) {
    if (window.location.pathname.includes('/projectsOverview/all')) {
      variables.viewAll.classList.add('font-bold');
      if (variables.viewMy.classList.contains('font-bold')) {
        variables.viewMy.classList.remove('font-bold');
      }
      variables.viewTitle.innerText = 'All projects';
      variables.contentPageProject.classList.remove('hidden');
      functions.getAllProjectsData();
    } else if (window.location.pathname.includes('projectsOverview/my')) {
      variables.viewMy.classList.add('font-bold');
      if (variables.viewAll.classList.contains('font-bold')) {
        variables.viewAll.classList.remove('font-bold');
      }
      variables.viewTitle.innerText = 'My projects';
      variables.contentPageProject.classList.remove('hidden');
      functions.getMyProjectsData();
    }
  } else if (window.location.pathname.includes('projectsChat')) {
    variables.projectsChat.classList.add('content__header-active');
  }

  if (locationPathname.includes('projectsMembers')) {
    variables.projectsMembers.forEach((button: Element) => {
      button.classList.add('content__header-active');
    });
  }

  if (window.location.pathname.includes('/project/')) {
    functions.projectPageTOdetailprojectPage();
    functions.getDetailProjectsData();
  }

  if (window.location.pathname.includes('/projectsTasks')) {
    variables.contentPageTasks.classList.remove('hidden');
    variables.sidebarLinks.forEach((button: Element) => {
      button.classList.remove('siderbar__navigation-active');
    });
    variables.tasks.classList.add('siderbar__navigation-active');
    functions.getAllTasksData();
  }
});

//  Log in
variables.loginBtn.addEventListener('click', () => {
  login();
  onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user);
    let userState:string;
    if (user != null) {
      userState = 'true';
    } else {
      userState = 'false';
    }
    localStorage.setItem('onAuthState', userState);
  });
});

// Google Log in

variables.googleLoginBtn.addEventListener('click', () => {
  googleLogin();
  onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user);
    let userState:string;
    if (user != null) {
      userState = 'true' as string;
    } else {
      userState = 'false' as string;
    }
    localStorage.setItem('onAuthState', userState);
  });
});

// Register
variables.regBtn.addEventListener('click', () => {
  register();
  onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user);
    let userState:string;
    if (user != null) {
      userState = 'true' as string;
    } else {
      userState = 'false' as string;
    }
    localStorage.setItem('onAuthState', userState);
  });
});

// Links
variables.regLinkBtn.addEventListener('click', () => {
  functions.loginPageTOregisterPage();
});

variables.loginLinkBtn.addEventListener('click', () => {
  functions.registerPageTOloginPage();
});

variables.addProjectBtn.addEventListener('click', () => {
  functions.showAddProjectPage();
});

variables.cancelAddProjectBtn.addEventListener('click', () => {
  functions.hiddenAddProjectPage();
});

variables.submitAddProjectBtn.addEventListener('click', () => {
  functions.addProject();
});

// Eye Button
variables.passwEye.forEach((button) => {
  button.addEventListener('click', () => {
    functions.passwordEye();
  });
});

// change view
variables.viewAll.addEventListener('click', () => {
  functions.viewAll();
});

variables.viewMy.addEventListener('click', () => {
  functions.viewMy();
});

// copie to clipboard
variables.contentHeaderUnderTitle.addEventListener('click', () => {
  navigator.clipboard.writeText(variables.contentHeaderUnderTitle.innerText);
});

// sidebar
variables.projectsOverview.forEach((button: Element) => {
  button.addEventListener('click', () => {
    window.location.pathname = 'projectsOverview/all';
    window.location.reload();
  });
});

variables.projectsChat.forEach((button: Element) => {
  button.addEventListener('click', () => {
    window.location.pathname = 'projectsChat';
    // window.location.reload();
  });
});

variables.projectsTasks.forEach((button: Element) => {
  button.addEventListener('click', () => {
    window.location.pathname = 'projectsTasks';
    window.location.reload();
  });
});

variables.projectsMembers.forEach((button: Element) => {
  button.addEventListener('click', () => {
    window.location.pathname = 'projectsMembers';
  });
});

variables.dashboard.addEventListener('click', () => {
  window.location.pathname = 'dashboard';
});

variables.projects.addEventListener('click', () => {
  window.location.pathname = 'projectsOverview/all';
});

variables.tasks.addEventListener('click', () => {
  window.location.pathname = 'projectsTasks';
});

variables.settings.addEventListener('click', () => {
  window.location.pathname = 'settings';
});
