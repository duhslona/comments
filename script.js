const newCommentField = document.getElementById("text-area");
const commentsField = document.getElementById("comments");

function addComment(){
    const text = newCommentField.value;

    if( validate(text)==true){
        addCommentWithText(text);
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

function addCommentWithText(text){
    let newComment = document.createElement('p');
    
    newComment.innerHTML=maskSpam(addHtmlNewLines(text));
    
    newComment.classList.add("border-bottom");
    newComment.classList.add("border-warning");

    commentsField.appendChild(newComment);
}