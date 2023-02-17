createButton = document.querySelector("#create-button");
postButton = document.querySelector("#postButton");
crossButton = document.querySelector("#crossButton");

myModal = document.querySelector("dialog.modal");
// console.log(myModal);

createButton.addEventListener("click", () => {
  myModal.showModal();
});

postButton.addEventListener("click", () => {
  myModal.close();
});
window.onclick = function (event) {
  console.log(event.target);
  if (event.target == myModal) {
    myModal.close();
  }
};

crossButton.addEventListener("click", () => {
  myModal.close();
});
