const newCommentField = document.getElementById("text-area");
const commentsField = document.getElementById("comments");
const userNameField = document.getElementById("userName");
const avatarField = document.getElementById("userPic");
const saveUserDataCheckbox = document.getElementById("saveUserData");

const USER_NAME_ITEM="st.userName";
const USER_AVATAR_ITEM="st.userAvatarLink";


document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem(USER_NAME_ITEM)){
        userNameField.value=localStorage.getItem(USER_NAME_ITEM);
    }
    if(localStorage.getItem(USER_AVATAR_ITEM)){
        avatarField.value=localStorage.getItem(USER_AVATAR_ITEM);
    }
  });


function saveUserDataIfNeeded(save, userName, avatarLink){
    if(save){
        if(userNameField.value!=''){
            saveItemInLocalStorage(USER_NAME_ITEM, userName);
        }
        if(avatarField.value!=''){
            saveItemInLocalStorage(USER_AVATAR_ITEM, avatarLink);
        }
    } else {
        localStorage.removeItem(USER_NAME_ITEM);
        localStorage.removeItem(USER_AVATAR_ITEM);
    }
}

function addComment(){
    const text = newCommentField.value;
    const userName = userNameField.value;
    const avatarLink = avatarField.value;
    const saveUserdata = saveUserDataCheckbox.checked;

    if( validate(text)==true){
        saveUserDataIfNeeded(saveUserdata, userName, avatarLink)
        addCommentWithUserInfo(text, userName, avatarLink);
    }
    clearInput();
}

function validate(text){
    if(removeNewLines(text).length==0){
        alert("Комментарий должен содержать текст");
        return false;
    }

    return true;
}

function addHtmlNewLines(text){
    return text.replaceAll(/(?:\r\n|\r|\n)/g, '<br>');
}

function removeNewLines(text){
    return text.replaceAll(/(?:\r\n|\r|\n)/g, "");
}

function clearInput(){
    newCommentField.value="";
}

function maskSpam(text){
    return text.replaceAll("viagra", "***").replaceAll("XXX", "***");
}

function addCommentWithUserInfo(text, userNameValue, avatarLink){
    let userContainer = document.createElement('div');
    userContainer.setAttribute('style', 'display:flex; align-items:center');

    let userPic = document.createElement('img');
    userPic.setAttribute('width', '32');
    userPic.setAttribute('height', '32');
    userPic.setAttribute('src', avatarLink===''?'/anon.jpg':avatarLink);

    let userName = document.createElement('p');
    userName.setAttribute('style', 'margin-left:15px');
    userName.innerHTML=userNameValue===''?'Anonymous':userNameValue;

    userContainer.appendChild(userPic);
    userContainer.appendChild(userName);

    let newComment = document.createElement('p');
    
    newComment.innerHTML=maskSpam(addHtmlNewLines(text));
    
    newComment.classList.add("border-bottom");
    newComment.classList.add("border-warning");

    commentsField.appendChild(userContainer);
    commentsField.appendChild(newComment);
}

function saveItemInLocalStorage(itemName, itemValue){
    if(localStorage.getItem(itemName)!=null&&localStorage.getItem(itemName)!=itemValue){
        localStorage.removeItem(itemName);
    } 
    if(localStorage.getItem(itemName)!=itemValue){
        localStorage.setItem(itemName, itemValue);
    }
}