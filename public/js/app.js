console.log('client side javascript');

// fetch('http://localhost:3000/weather?address=bangalore').then(
//   async response => {
//     let jsonRes = await response.json();
//     console.log(jsonRes);
//   }
// );

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;

  console.log(location);
  

  fetch('http://localhost:3000/weather?address=' + location).then(response => {
    response.json().then(data => {
      if(data.error){
        console.log('err',data);
      }
      else{
        console.log('err',data);
      
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forcast;
      }
     
    });
  });
});
