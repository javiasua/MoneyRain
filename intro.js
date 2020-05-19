window.name = '';
window.localStorage.setItem('Name',window.name)
function processFormData(){   
    window.name = document.getElementById('txt_name').value;
    window.localStorage.setItem('Name',window.name);
}
  