/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/naming-convention */
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  addDoc, doc, collection, getFirestore, updateDoc, deleteDoc,
} from 'firebase/firestore';
import {
  getdocs, getdocs2, getdoc, getdoc2, getAlldocs,
} from './user';
import * as variables from './Variables';
// eslint-disable-next-line import/prefer-default-export
const firebaseConfig = {
  apiKey: 'AIzaSyAlcZTX9MbSBk9Mbh5Baq8-zRUIPzk--IA',
  authDomain: 'mylo-48315.firebaseapp.com',
  projectId: 'mylo-48315',
  storageBucket: 'mylo-48315.appspot.com',
  messagingSenderId: '949548352024',
  appId: '1:949548352024:web:fc1fc222eb7f07caeb396d',
};

const app = initializeApp(firebaseConfig) as FirebaseApp;
const db = getFirestore();

export function loginPageTOregisterPage() {
  variables.loginPage?.classList.add('hidden');
  variables.registerPage?.classList.remove('hidden');
}

export function registerPageTOloginPage() {
  variables.registerPage?.classList.add('hidden');
  variables.loginPage?.classList.remove('hidden');
}

export function loginPageTOprojectPage() {
  variables.loginPage?.classList.add('hidden');
  variables.projectPage?.classList.remove('hidden');
}

export function registerPageTOprojectPage() {
  variables.registerPage?.classList.add('hidden');
  variables.projectPage?.classList.remove('hidden');
}

export function projectPageTOdetailprojectPage() {
  variables.contentPageProject?.classList.add('hidden');
  variables.contentPageProjectDetail?.classList.remove('hidden');
}

export function projectPageTOtasksPage() {
  variables.contentPageProject?.classList.add('hidden');
  variables.contentPageProjectDetail?.classList.add('hidden');
  variables.contentPageTasks?.classList.remove('hidden');
}

export function registerORloginPageTOprojectPage() {
  if (!variables.registerPage.classList.contains('hidden')) {
    variables.registerPage?.classList.add('hidden');
  }
  if (!variables.loginPage.classList.contains('hidden')) {
    variables.loginPage?.classList.add('hidden');
  }
  variables.projectPage?.classList.remove('hidden');
}

export function showAddProjectPage() {
  variables.addProjectPage?.classList.remove('hidden');
}

export function hiddenAddProjectPage() {
  variables.addProjectPage?.classList.add('hidden');
}

export function dateFormat(timestamp: any): string {
  let day: string = timestamp.getDate();
  const options = { month: 'long' };
  const month: string = new Intl.DateTimeFormat('de-DE', options).format(timestamp);
  const year: string = timestamp.getFullYear();
  let hours: string = timestamp.getHours();
  let minutes: string = timestamp.getMinutes();

  if (parseInt(day) < 10) day = `0${day}`;
  if (parseInt(hours) < 10) hours = `0${hours}`;
  if (parseInt(minutes) < 10) minutes = `0${minutes}`;

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export function dateFormat2(timestamp: any): string {
  let day: string = timestamp.getDate();
  let month: string = timestamp.getMonth() + 1;
  const year: string = timestamp.getFullYear();
  let hours: string = timestamp.getHours();
  let minutes: string = timestamp.getMinutes();

  if (parseInt(day) < 10) day = `0${day}`;
  if (parseInt(month) < 10) month = `0${month}`;
  if (parseInt(hours) < 10) hours = `0${hours}`;
  if (parseInt(minutes) < 10) minutes = `0${minutes}`;

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function dynamicHeader() {
  const userInfoString = localStorage.getItem('Users') as string;
  const userInfo = JSON.parse(userInfoString);
  const userName = `${userInfo[0].firstname} ${userInfo[0].lastname}` as string;
  variables.userName.innerText = userName;
}

export function checkUserLoggedIn() {
  const onAuthState = localStorage.getItem('onAuthState') as string;
  const user_UID = localStorage.getItem('user_UID') as string;
  if (onAuthState === 'true') {
    registerORloginPageTOprojectPage();
    getdocs('Users', 'UserUID', user_UID);
    dynamicHeader();
  } else {
    // localStorage.removeItem('username');
    localStorage.removeItem('user_UID');
  }
}

export const passwordEye = ():void => {
  let input;
  let iconEye;
  // const iconEye = document.getElementById('iconEye') as HTMLElement;
  if (variables.loginPage.classList.contains('hidden')) {
    input = document.getElementById('regPasswInp') as HTMLElement;
    iconEye = document.getElementById('regIconEye') as HTMLElement;
  } else {
    input = document.getElementById('inlogPasswInp') as HTMLElement;
    iconEye = document.getElementById('loginIconEye') as HTMLElement;
  }

  if (iconEye.classList.contains('fa-eye')) {
    iconEye.classList.remove('fa-eye');
    iconEye.classList.add('fa-eye-slash');
  } else {
    iconEye.classList.add('fa-eye');
    iconEye.classList.remove('fa-eye-slash');
  }
  const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
  input.setAttribute('type', type);
};

export function viewAll() {
  window.location.pathname = '/projectsOverview/all';
}

export function viewMy() {
  window.location.pathname = '/projectsOverview/my';
}

export function checkStatus(status) {
  if (status === 'Not started') {
    return 3;
  }
  if (status === 'Completed') {
    return 2;
  }
  if (status === 'Overdue') {
    return 1;
  }
  if (status === 'Not defined') {
    return 4;
  }
}

function changeProject() {
  const changeProjectTitleInp = document.getElementById('changeProjectTitleInp') as HTMLInputElement;
  const changeProjectDeadlineInp = document.getElementById('changeProjectDeadlineInp') as HTMLInputElement;
  console.log(changeProjectDeadlineInp.value);
  const changeProjectDescrInp = document.getElementById('changeProjectDescrInp') as HTMLInputElement;
  const changeProjectStatusInp = document.getElementById('changeProjectStatusInp') as HTMLSelectElement;
  const project_UID = localStorage.getItem('project_UID') as string;
  const docRef = doc(db, 'Projects', project_UID);
  updateDoc(docRef, {
    deadline_date: new Date(changeProjectDeadlineInp.value),
    description: changeProjectDescrInp.value,
    status: changeProjectStatusInp.options[changeProjectStatusInp.selectedIndex].text,
    title: changeProjectTitleInp.value,
  })
    .then(() => {
      window.location.pathname = `project/${changeProjectTitleInp.value}`;
    });
}

function deleteProject(project_UID: string) {
  const docRef = doc(db, 'projects', project_UID);
  deleteDoc(docRef)
    .then(() => {
      window.location.pathname = 'projectsOverview/all';
    });
}

export function showDetailProject(project) {
  console.log(project.deadline_date);
  variables.projectDetailContent.innerHTML = '';
  variables.contentHeaderTitle.innerText = project.title;
  variables.contentHeaderUnderTitle.innerHTML = `#${localStorage.getItem('project_UID')}`;
  variables.contentHeaderUnderTitle.classList.remove('hidden');
  const projectCard = document.createElement('div') as HTMLDivElement;
  projectCard.classList.add('content__content');
  const deadline_date = dateFormat2(new Date(project.deadline_date.seconds * 1000));
  const createdOn_date = dateFormat2(new Date(project.created_on.seconds * 1000));
  projectCard.innerHTML = `
    <div class="content__content-title">
    <h1 id="projectDetailTitle" class="text-xl font-serif text-darkbrown pb-4">Project info</h1>
    <p class="uppercase text-brown2">Created on: ${createdOn_date}</p>
    </div>
    <div>
      <div class="formpage__flex">
        <label class="formpage__label" for="">Title</label>
        <input id="changeProjectTitleInp" class="block formpage__input" type="text" placeholder="Title" value="${project.title}">
      </div>
      <div class="formpage__flex">
        <label class="formpage__label" for="">Description</label>
        <input id="changeProjectDescrInp" class="block formpage__input" type="text" placeholder="Description" value="${project.description}">
      </div>
      <div class="formpage__flex">
        <label class="formpage__label" for="">Status</label>
        <select class="formpage__input" name="" id="changeProjectStatusInp">
          <option value="" selected disabled hidden>${project.status}</option>
          <option value="1">Not defined</option>
          <option value="2">Not started</option>
          <option value="3">Completed</option>
          <option value="4">Overdue</option>
        </select>
      </div>
      <div class="formpage__flex">
        <label class="formpage__label" for="">Deadline</label>
        <input id="changeProjectDeadlineInp" class="block formpage__input" type="datetime-local" value="${deadline_date}">
      </div>
      <div class="flex justify-between pt-4">
      <button id="deleteDetailProjectBtn" class="block add__content-button cancel__button hidden">Delete project</button>
      <button id="saveDetailProjectBtn" class="block add__content-button add__button">Save changes</button>
    </div>
  `;
  variables.projectDetailContent?.appendChild(projectCard);
  if (project.admin_id === localStorage.getItem('user_UID')) {
    const deleteDetailProjectBtn = document.getElementById('deleteDetailProjectBtn') as HTMLElement;
    deleteDetailProjectBtn.classList.remove('hidden');
    deleteDetailProjectBtn.addEventListener('click', () => {
      const project_UID = localStorage.getItem('project_UID') as string;
      deleteProject(project_UID);
    });
  }
  const saveDetailProjectBtn = document.getElementById('saveDetailProjectBtn') as HTMLElement;
  saveDetailProjectBtn.addEventListener('click', () => {
    changeProject();
  });
}

function getProjectName(project_UID: string) {
  localStorage.removeItem('taskproject');
  getdoc2('Projects', 'taskproject', project_UID);
  const projectString = localStorage.getItem('taskproject') as string;
  const project = JSON.parse(projectString);
  console.log(project);
  if (project === null) {
    console.log('null');
    return null;
  }
  return project.title;
}

export function showProjects(projects, projectsUID, list) {
  if (list === 'tasks') {
    variables.tasklist.innerHTML = '';
  } else if (list === 'projects') {
    variables.projectlist.innerHTML = '';
  }
  let count = 0;
  projects.forEach((project) => {
    const projectUID = projectsUID[count]._key.path.segments[6] as string;
    count++;
    console.log(project.project_id);
    const projectName = getProjectName(project.project_id);
    let title = '';
    if (projectName == null) {
      title = project.title;
    } else {
      title = `${project.title} - ${projectName}`;
    }
    const projectCard = document.createElement('div') as HTMLDivElement;
    projectCard.classList.add('card');
    const deadline_date = dateFormat(new Date(project.created_on.seconds * 1000));
    const status = checkStatus(project.status);
    projectCard.innerHTML = `
      <div class="flex justify-between">
      <div class="card__users">
        <div class="usercircle"></div>
        <div class="usercircle"></div>
        <div class="usercircle"></div>  
      </div>
      <div>
        <div class="card__status status${status}"><p>${project.status}</p></div>
      </div>
    </div>
    <p class="card__title">${title}</p>
    <div class="flex justify-between">
      <p class="card__info">${deadline_date}</p>
      <button>
      <div class="showDetailProjectBtn"><i class="fa-solid fa-arrow-right text-xl"></i>
      <p class="hidden">${projectUID}</p>
      <p class="hidden">${project.title}</p>
      </div>
      </button>
    </div>
    `;
    if (list === 'tasks') {
      variables.tasklist.appendChild(projectCard);
    } else if (list === 'projects') {
      variables.projectlist.appendChild(projectCard);
    }
  });
  const showDetailProjectBtn = document.querySelectorAll('.showDetailProjectBtn') as NodeListOf<Element>;
  showDetailProjectBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const projectId = button.children[1].textContent as string;
      const projectName = button.children[2].textContent as string;
      localStorage.setItem('project_UID', projectId);
      window.location.pathname = `project/${projectName}`;
    });
  });
}

export function getAllProjectsData() {
  const user_UID = localStorage.getItem('user_UID') as string;
  getdocs('Projects', 'admin_id', user_UID);
  const projectsString = localStorage.getItem('Projects') as string;
  const projectsUIDString = localStorage.getItem('ProjectsUID') as string;
  const projects = JSON.parse(projectsString);
  const projectsUID = JSON.parse(projectsUIDString);

  showProjects(projects, projectsUID, 'projects');
}

export function getAllTasksData() {
  getdocs2('Projects', 'project_id', '0');
  const projectsString = localStorage.getItem('Projects') as string;
  const projectsUIDString = localStorage.getItem('ProjectsUID') as string;
  const projects = JSON.parse(projectsString);
  const projectsUID = JSON.parse(projectsUIDString);
  showProjects(projects, projectsUID, 'tasks');
}

export function getMyProjectsData() {
  getAlldocs('Projects');
  const projectsString = localStorage.getItem('Projects') as string;
  const projectsUIDString = localStorage.getItem('ProjectsUID') as string;
  const projects = JSON.parse(projectsString);
  const projectsUID = JSON.parse(projectsUIDString);
  showProjects(projects, projectsUID, 'projects');
}

export function getDetailProjectsData() {
  const project_UID = localStorage.getItem('project_UID') as string;
  getdoc('Projects', project_UID);
  const projectString = localStorage.getItem('Projects') as string;
  const project = JSON.parse(projectString);
  showDetailProject(project);
}

export function addProject() {
  const status = variables.addProjectStatusInp;
  const colRef = collection(db, 'Projects');
  addDoc(colRef, {
    admin_id: localStorage.getItem('user_UID'),
    created_on: new Date(),
    deadline_date: new Date(variables.addProjectDeadlineInp.value),
    description: variables.addProjectDescrInp.value,
    status: status.options[status.selectedIndex].text,
    title: variables.addProjectTitleInp.value,
    project_id: 0,
  });
  if (window.location.pathname.includes('projectsOverview/my')) {
    window.location.pathname = 'projectsOverview/my';
  } else {
    window.location.pathname = 'projectsOverview/all';
  }
}
