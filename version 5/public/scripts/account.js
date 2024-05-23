function confirmDelete(id) {
    if (confirm('Are you sure you want to delete your accoun?')) {
        deleteItem(id);
        logoutUser() ;
    }
  }
  
  //send id (100) to delete
  function deleteItem(id) {
    fetch(`/account/delete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:id })
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  }


  function logoutUser() {
    fetch('/logout', {
      method: 'POST',
    })      

    .then((response) => response.json())
      .then((data) => {
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  }